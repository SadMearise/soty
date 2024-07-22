import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SESSION_STORAGE_KEYS } from "../constants";

const useHistoryStack = () => {
  const initialHistoryStackString = sessionStorage.getItem(SESSION_STORAGE_KEYS.historyStack);
  const initialHistoryStack = initialHistoryStackString ? JSON.parse(initialHistoryStackString) : [];
  const [historyStack, setHistoryStack] = useState(initialHistoryStack);

  const location = useLocation();

  useEffect(() => {
    if (historyStack[historyStack.length - 1] !== location.pathname) {
      const newHistoryStack = [...historyStack, location.pathname];

      setHistoryStack(newHistoryStack);
      sessionStorage.setItem(SESSION_STORAGE_KEYS.historyStack, JSON.stringify(newHistoryStack));
    }
  }, [historyStack, location.pathname]);

  return historyStack;
};

export default useHistoryStack;
