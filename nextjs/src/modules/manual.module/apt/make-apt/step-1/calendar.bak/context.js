import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback
} from "react";

const OurContext = createContext();

export function OurContextProvider(props) {
  const [jumpDate, setJumpDate] = useState("");
  const [firstDate, setFirstDate] = useState(new Date())

  const updateJumpDate = useCallback(value => setJumpDate(value), [setJumpDate])
  const updateFirstDate = useCallback(value => {
    setFirstDate(value)
  }, [setFirstDate])

  const value = useMemo(() => ({ jumpDate, updateJumpDate, firstDate, updateFirstDate }),
    [jumpDate, updateJumpDate, firstDate, updateFirstDate]);

  return <OurContext.Provider value={value} {...props} />;
}

export default function useJumpDate() {
  return useContext(OurContext);
}
