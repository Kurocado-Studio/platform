import { RefObject, useEffect } from 'react';

function useClickOutside<T extends HTMLElement | undefined>(
  reference: RefObject<T>,
  handler: (event: MouseEvent | TouchEvent) => void,
): void {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        !reference ||
        !reference.current ||
        reference.current.contains(event.target as Node)
      ) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [reference, handler]);
}

export default useClickOutside;
