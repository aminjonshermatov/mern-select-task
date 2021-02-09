import { useState, useEffect, useRef } from "react";

const useComponentVisible = (initialIsVisible) => {
  const [isComponentVisible, setIsComponentVisible] = useState(
    initialIsVisible
  );
  const ref = useRef(null);
  const listRef = useRef(null);

  const handleHideDropdown = (event) => {
    if (event.key === "Escape") {
      setIsComponentVisible(false);
    }
  };

  const handleClickOutside = (event) => {
    if (
      ref.current &&
      (!ref.current.contains(event.target) ||
        listRef.current?.contains(event.target))
    ) {
      if (!listRef.current?.contains(event.target)) {
        setIsComponentVisible(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleHideDropdown, true);
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("keydown", handleHideDropdown, true);
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  return { ref, listRef, isComponentVisible, setIsComponentVisible };
};

export default useComponentVisible;
