import { useState, useEffect } from "react";


function getStorageValue(key, defaultValue) {
  // getting stored value
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(key);
    try {
      const initial = saved !== null && saved !== 'undefined' && saved !== '' ? JSON.parse(saved) : defaultValue;
      return initial;
    }
    catch (e) {
      console.log(e)
      return defaultValue
    }
  }
}

export const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue)
  })

  useEffect(() => {
    // storing input name
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}