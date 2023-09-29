import { useEffect, useState, useRef } from 'react';
import {
  use_dataChannel,
  dataChannel,
  use_audio,
  audio_codec,
  use_video,
  video_resolution,
  video_transform,
  video_codec,
  use_STUN
} from './config'
import {
  sdpFilterCodec,
  escapeRegExp
} from './utils'
import PageLayout from '../../../src/components/PageLayout'

var pc = null;
var dc = null;
var dcInterval = null;

function VideoStreaming() {
  const audioRef = useRef(null);
  const videoRef = useRef(null);

  const createPeerConnection = () => {
    var config = {
        sdpSemantics: 'unified-plan'
    };

    if (use_STUN) {
        config.iceServers = [{urls: ['stun:stun.l.google.com:19302']}];
    }

    pc = new RTCPeerConnection(config);

    // register some listeners to help debugging
    pc.addEventListener('icegatheringstatechange', function() {
        // iceGatheringLog.textContent += ' -> ' + pc.iceGatheringState;
    }, false);
    // iceGatheringLog.textContent = pc.iceGatheringState;

    pc.addEventListener('iceconnectionstatechange', function() {
        // iceConnectionLog.textContent += ' -> ' + pc.iceConnectionState;
    }, false);
    // iceConnectionLog.textContent = pc.iceConnectionState;

    pc.addEventListener('signalingstatechange', function() {
        // signalingLog.textContent += ' -> ' + pc.signalingState;
    }, false);
    // signalingLog.textContent = pc.signalingState;

    // connect audio / video
    pc.addEventListener('track', function(evt) {
        if (evt.track.kind == 'video')
          videoRef.current.srcObject = evt.streams[0];
        else
          audioRef.current.srcObject = evt.streams[0];
    });

    return pc;
  }
  function negotiate() {
    return pc.createOffer().then(function(offer) {
      return pc.setLocalDescription(offer);
    }).then(function() {
      // wait for ICE gathering to complete
      return new Promise(function(resolve) {
        if (pc.iceGatheringState === 'complete') {
          resolve();
        } else {
          function checkState() {
            if (pc.iceGatheringState === 'complete') {
              pc.removeEventListener('icegatheringstatechange', checkState);
              resolve();
            }
          }
          pc.addEventListener('icegatheringstatechange', checkState);
        }
      });
    }).then(function() {
        var offer = pc.localDescription;
      var codec;

      codec = audio_codec;
      if (codec !== 'default') {
        offer.sdp = sdpFilterCodec('audio', codec, offer.sdp);
      }

      codec = video_codec;
      if (codec !== 'default') {
        offer.sdp = sdpFilterCodec('video', codec, offer.sdp);
      }

      console.log('Offer SDP', offer.sdp);
      return fetch('/offer', {
        body: JSON.stringify({
          sdp: offer.sdp,
          type: offer.type,
          video_transform: video_transform
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      });
    }).then(function(response) {
      return response.json();
    }).then(function(answer) {
      console.log('Answer SDP', answer.sdp)
      return pc.setRemoteDescription(answer);
    }).catch(function(e) {
      alert(e);
    });
  }

  const start = () => {
    // document.getElementById('start').style.display = 'none';

    pc = createPeerConnection();

    var time_start = null;

    function current_stamp() {
      if (time_start === null) {
        time_start = new Date().getTime();
        return 0;
      } else {
        return new Date().getTime() - time_start;
      }
    }

    if (use_dataChannel) {
      var parameters = dataChannel;

      dc = pc.createDataChannel('chat', parameters);
      dc.onclose = function() {
        clearInterval(dcInterval);
        // dataChannelLog.textContent += '- close\n';
      };
      dc.onopen = function() {
        // dataChannelLog.textContent += '- open\n';
        dcInterval = setInterval(function() {
            var message = 'ping ' + current_stamp();
            // dataChannelLog.textContent += '> ' + message + '\n';
            dc.send(message);
        }, 1000);
      };
      dc.onmessage = function(evt) {
        // dataChannelLog.textContent += '< ' + evt.data + '\n';

        if (evt.data.substring(0, 4) === 'pong') {
            var elapsed_ms = current_stamp() - parseInt(evt.data.substring(5), 10);
            // dataChannelLog.textContent += ' RTT ' + elapsed_ms + ' ms\n';
        }
      };
    }

    var constraints = {
      audio: use_audio,
      video: false
    };

    if (use_video) {
      var resolution = video_resolution;
      if (resolution) {
        resolution = resolution.split('x');
        constraints.video = {
          width: parseInt(resolution[0], 0),
          height: parseInt(resolution[1], 0)
        };
      } else {
        constraints.video = true;
      }
    }

    if (constraints.audio || constraints.video) {
      // if (constraints.video) {
      //     document.getElementById('media').style.display = 'block';
      // }
      navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
        stream.getTracks().forEach(function(track) {
          pc.addTrack(track, stream);
        });
        return negotiate();
      }, function(err) {
        alert('Could not acquire media: ' + err);
      });
    } else {
      negotiate();
    }

    // document.getElementById('stop').style.display = 'inline-block';
  }

  useEffect(() => {
    start();
  }, []);

  return (
    <PageLayout>
      <div id="media" style={{ display: "block" }}>
        <audio id="audio" autoPlay ref={audioRef}></audio>
        <video id="video" autoPlay ref={videoRef} playsInline style={{ width: "640px", height: "480px", background: "lightgrey" }}></video>
      </div>
    </PageLayout>
  )
}

export default VideoStreaming;
