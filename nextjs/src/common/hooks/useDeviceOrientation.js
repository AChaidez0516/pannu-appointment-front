import { useState, useEffect } from 'react'

export default function useDeviceOrientation() {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (window.DeviceMotionEvent) {
      window.addEventListener('deviceorientation', deviceOrientationHandler, false);
      return () => {
        window.removeEventListener('deviceorientation', deviceOrientationHandler, false);
      }
    }
  }, []);
  
  const deviceOrientationHandler = (evt) => {
    console.log(evt);
    setData(evt);
  }

  return data;
}
