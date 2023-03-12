import React, { useEffect, useRef } from 'react';

function Loading() {
  const dotRef = useRef('.');

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (dotRef.current.innerHTML.length > 2) {
        dotRef.current.innerHTML = '';
      } else {
        dotRef.current.innerHTML += '.';
      }
    }, 300);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className='loading-cont'>
      <p>{'Loading'}</p>
      <p ref={dotRef}>{'.'}</p>
    </div>
  );
}

export default Loading;
