import { useEffect, useRef } from 'react';
import PageLayout from '../../../components/PageLayout'

function VideoStreaming() {
  const audioRef = useRef(null);
  const videoRef = useRef(null);
  const imageRef = useRef(null);
  const theStream = useRef(null);

  const getUserMedia = (options, successCallback, failureCallback) => {
    var api = navigator.getUserMedia || navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia || navigator.msGetUserMedia;
    if (api) {
      return api.bind(navigator)(options, successCallback, failureCallback);
    }
  }

  const getStream = () => {
    if (!navigator.getUserMedia && !navigator.webkitGetUserMedia &&
      !navigator.mozGetUserMedia && !navigator.msGetUserMedia) {
      alert('User Media API not supported.');
      return;
    }
    
    var constraints = {
      video: true
    };

    getUserMedia(constraints, function (stream) {
      if (!videoRef.current)
        return;

      var mediaControl = videoRef.current;
      if ('srcObject' in videoRef.current) {
        mediaControl.srcObject = stream;
      } else if (navigator.mozGetUserMedia) {
        mediaControl.mozSrcObject = stream;
      } else {
        mediaControl.src = (window.URL || window.webkitURL).createObjectURL(stream);
      }
      theStream.current = stream;
    }, function (err) {
      alert('Error: ' + err);
    });
  }

  const takePhoto = () => {
    if (!('ImageCapture' in window)) {
      alert('ImageCapture is not available');
      return;
    }
    
    if (!theStream.current) {
      alert('Grab the video stream first!');
      return;
    }
    
    var theImageCapturer = new ImageCapture(theStream.current.getVideoTracks()[0]);
  
    theImageCapturer.takePhoto()
      .then(blob => {
        var theImageTag = imageRef.current;
        theImageTag.src = URL.createObjectURL(blob);
      })
      .catch(err => alert('Error: ' + err));
  }

  useEffect(() => {
    getStream();
  }, []);

  return (
    <PageLayout>
      <div id="media" style={{ display: "block" }}>
        <audio id="audio" autoPlay ref={audioRef}></audio>
        <video id="video" autoPlay ref={videoRef} playsInline style={{ width: "640px", height: "480px", background: "lightgrey" }}></video>
      </div>
      <button onClick={takePhoto}>Take Photo</button>
      <img ref={imageRef} style={{ width: "320px", height: "240px" }} />
    </PageLayout>
  )
}

export default VideoStreaming;
