import { useEffect, useState } from 'react';

export default function useIsTop() {
  const [isTop, setIsTop] = useState(true);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsTop(false);
      } else {
        setIsTop(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isTop]);

  return isTop;
}
