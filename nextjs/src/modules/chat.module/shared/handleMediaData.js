import io from 'socket.io-client'
import ss from 'socket.io-stream'
import RecordRTC, { StereoAudioRecorder } from 'recordrtc'

export const checkAudioDeviceStatus = async() => {
  /*navigator.getUserMedia =
     navigator.getUserMedia ||
     navigator.webkitGetUserMedia ||
     navigator.mozGetUserMedia

   if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
     toast.error('The audio recording is impossible.')
   }
   else {
     navigator.mediaDevices.enumerateDevices()
       .then (devices => {
         console.log('media devices', devices)

         //audiooutput, audioinput
         const audioDevices = devices.filter(v => v.kind === 'audioinput')

         if (audioDevices.length <= 0) {
           commitMessageEvent(MessageEventType.AUDIO_RECORD)
           toast.error('No audio device is usable.', ToastOptions)
           return
         }

         // const usableAudioDevices = audioDevices.filter(v => v.label != '')
         navigator.permissions.query({name: 'microphone'}).then(function(result) {
           console.log('device state: ', result)
           if (result.state === 'granted') {
             //permission has already been granted, no prompt is shown
             commitMessageEvent(MessageEventType.AUDIO_RECORD)
           } else if (result.state === 'prompt') {
             //there's no persistent permission registered, will be showing the prompt
             commitMessageEvent(MessageEventType.AUDIO_RECORD)
           } else if (result.state === 'denied') {
             //permission has been denied
             toast.error('Please allow to access for audio device.', ToastOptions)
           }
         })
       })
       .catch (e => {
         toast.error('No audio device is usable.', ToastOptions)
       })
   }*/

  navigator.getUserMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia

  if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
    return { status: false, message: 'The audio recording is impossible.' }
  }
  else {
    try {
      let devices = await navigator.mediaDevices.enumerateDevices()
      console.log('all devices: ', devices)
      if (!devices || devices.length == 0)
        return { status: false, message: 'No devices is usable.' }

      //audiooutput, audioinput
      const audioDevices = devices.filter(v => v.kind === 'audioinput')

      if (audioDevices.length <= 0) {
        return { status: false, message: 'No audio device is usable.' }
      }
    }
    catch (e) {
      return { status: false, message: 'No audio is usable.' }
    }

    try {
      const result = await navigator.permissions.query({name: 'microphone'})
      console.log(result)
      if (result.state === 'granted') {
        //permission has already been granted, no prompt is shown
        return { status: true, message: '' }
      } else if (result.state === 'prompt') {
        //there's no persistent permission registered, will be showing the prompt
        return { status: true, message: '' }
      } else if (result.state === 'denied') {
        //permission has been denied
        return { status: false, message: 'Please allow to access for audio device.' }
      }
    } catch (e) {
      return { status: false, message: 'No audio is usable.' }
    }
  }
}

export const speechToTextProc = async (serverUrl, socketCallback) => {
  const socketio = io(serverUrl, { transports : ['websocket'] });
  console.log('speech check 1 ', socketio.connected);
  const socket = socketio.on('connect', function(e) {
    console.log('speech check 2 ', socketio.connected);
  });

  let text = ''
  socketio.on('results', function (data) {
    if(data){
      text += ' ' + data.transcript;
      let commands = data.commands
      socketCallback(text, commands)
    }
  });

  let audioRecorder = null
  let microphone = null
  try {
    microphone = await navigator.mediaDevices.getUserMedia({
      audio: true
    })

    audioRecorder = RecordRTC(microphone, {
      type: 'audio',
      mimeType: 'audio/webm',
      sampleRate: 44100, // this sampleRate should be the same in your server code

      // MediaStreamRecorder, StereoAudioRecorder, WebAssemblyRecorder
      // CanvasRecorder, GifRecorder, WhammyRecorder
      recorderType: StereoAudioRecorder,

      // Dialogflow / STT requires mono audio
      numberOfAudioChannels: 1,

      // get intervals based blobs
      // value in milliseconds
      // as you might not want to make detect calls every seconds
      timeSlice: 4000,

      // only for audio track
      // audioBitsPerSecond: 128000,

      // used by StereoAudioRecorder
      // the range 22050 to 96000.
      // let us force 16khz recording:
      desiredSampRate: 16000,

      // as soon as the stream is available
      ondataavailable: function(blob) {
        // making use of socket.io-stream for bi-directional
        // streaming, create a stream
        let stream = ss.createStream();
        // stream directly to server
        // it will be temp. stored locally
        ss(socket).emit('stream-transcribe', stream, {
          name: 'stream.wav',
          size: blob.size,
          encoding: 'LINEAR16',
          sampleRateHertz: 16000,
          languageCode: 'en-US',
          barge: 'end',
          commands: ['send'],
        });
        // pipe the audio blob to the read stream
        ss.createBlobReadStream(blob).pipe(stream);
      }
    });

    audioRecorder.startRecording();
  }
  catch (e) {
    console.error('recorder error', JSON.stringify(e))
  }

  return { audioRecorder, microphone, socket }
}