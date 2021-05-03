//sources: https://codesandbox.io/s/outside-alerter-hooks-lmr2y?module=%2Fsrc%2FOutsideAlerter.js
//sources: https://www.caktusgroup.com/blog/2020/07/01/usekeypress-hook-react/

import { useEffect } from 'react';

export const useClickOutside = (ref, exceptionRef, closeFunction) => {
  useEffect(() => {
    /**
     * call function if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (exceptionRef.current && exceptionRef.current.contains(event.target)) {
        return;
      }
      if (ref.current && !ref.current.contains(event.target)) {
        closeFunction();
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
};
