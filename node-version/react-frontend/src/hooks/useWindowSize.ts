import * as React from "react";
import { debounce } from "utils/common";

/**
 * DOCS:
 *
 * useWindowSize hook: https://usehooks.com/useWindowSize/
 * debounce example: https://www.pluralsight.com/guides/re-render-react-component-on-window-resize
 */
function useWindowSize() {
  const isClient = typeof window === "object";
  const [windowSize, setWindowSize] = React.useState(getSize);

  function getSize() {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined,
    };
  }

  React.useEffect(() => {
    if (!isClient) {
      return;
    }

    const setWindowSizeWithTimeout = debounce(() => {
      setWindowSize(getSize());
    }, 0);

    window.addEventListener("resize", setWindowSizeWithTimeout);
    return () => window.removeEventListener("resize", setWindowSizeWithTimeout);
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
}

export default useWindowSize;
