import { useEffect, useState } from "react";
enum WindowWidths {
    MOBILE = 768,
    TABLET = 1024
}
export default function useWindow() {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : undefined
  );
  const [isMobile, setIsMobile] = useState<boolean>(
    width ? width <= WindowWidths.MOBILE : false
  );
  const [isTablet, setIsTablet] = useState<boolean>(
    width ? width <= WindowWidths.TABLET : false
  );

  function handleWindowSizeChange() {
    const newWidth = window.innerWidth;
    setWidth(newWidth);
    setIsMobile(newWidth <= WindowWidths.MOBILE);
    setIsTablet(newWidth >= WindowWidths.MOBILE && newWidth <= WindowWidths.TABLET);
  }

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  return {
    isMobile,
    isTablet,
    width
  };
}
