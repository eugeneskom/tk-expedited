import { useEffect, useState } from 'react';

function useScrollToTop() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      if (path !== window.location.pathname) {
        setPath(window.location.pathname);
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('popstate', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, [path]);
}

export default useScrollToTop;