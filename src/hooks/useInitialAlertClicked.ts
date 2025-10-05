import { useState, useCallback, useEffect } from 'react';

export function useInitialAlertClicked() {
  const [isClicked, setIsClicked] = useState(false);
  const [shouldShowAlert, setShouldShowAlert] = useState(true); // Always show alert initially

  useEffect(() => {
    // Always show alert on first visit
    setShouldShowAlert(true);
  }, []);

  const markAsClicked = useCallback(() => {
    setIsClicked(true);
  }, []);

  return {
    isClicked,
    shouldShowAlert,
    markAsClicked,
  };
}