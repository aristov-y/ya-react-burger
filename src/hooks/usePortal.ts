import { useEffect, useRef } from 'react';

function usePortal(id: string) {
  const rootElemRef = useRef<HTMLDivElement | null>(null);

  useEffect(function setupElement() {
    const parentElem = document.querySelector(`#${ id }`) as Element;

    if (rootElemRef.current) {
      parentElem.appendChild(rootElemRef.current);
    }

    return function removeElement() {
      if (rootElemRef.current) {
        rootElemRef.current.remove();
      }
    };
  }, [id]);

  function getRootElem() {
    if (!rootElemRef.current) {
      rootElemRef.current = document.createElement('div');
    }
    return rootElemRef.current;
  }

  return getRootElem();
}

export default usePortal;
