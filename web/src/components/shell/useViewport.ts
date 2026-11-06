import { useEffect, useState } from 'react';

// Rerender al cambiar el tamaño de la ventana
export const useViewport = () => {
  const [, setTick] = useState(0);
  useEffect(() => {
    const onResize = () => setTick((t) => t + 1);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
};
