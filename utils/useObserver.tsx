import * as React from 'react';

type UseObserver = {
  onIntersect: () => void;
  canRun: boolean;
};

export function useObserver({
  onIntersect,
  canRun,
  rootMargin = '0px',
  threshold = 0,
  root = null
}: UseObserver & IntersectionObserverInit) {
  const observerEl = React.useRef();

  React.useEffect(() => {
    const el = observerEl && observerEl.current;

    const observer = new IntersectionObserver(
      ([entry], ob) => {
        if (entry.isIntersecting && canRun) {
          console.log('intersecting');
          onIntersect();
        }
      },
      { root, rootMargin, threshold }
    );

    if (!el) return;

    observer.observe(el);
    return () => observer.unobserve(el);
  }, [observerEl, onIntersect, canRun]);

  return { observerEl };
}
