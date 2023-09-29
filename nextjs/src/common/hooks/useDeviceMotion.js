import { useState, useEffect } from 'react'

export default function useDeviceMotion() {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (window.DeviceMotionEvent) {
      window.addEventListener('devicemotion', deviceMotionHandler);
      return () => {
        window.removeEventListener('devicemotion', deviceMotionHandler);
      }
    }
  }, []);
  
  const deviceMotionHandler = (evt) => {
    console.log(evt);
    setData(evt);
  }

  return data;
}
