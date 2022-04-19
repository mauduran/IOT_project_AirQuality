import { useEffect, useRef } from "react"

export const useInterval = (callback, delay) => {
    const savedCallback = useRef();

    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      const action = () => {
        savedCallback.current();
      }

      if(delay !== null) {
          let id = setInterval(action, delay);
          return ()=> {
              clearInterval(id);
          }
      }
    }, [delay]);
}