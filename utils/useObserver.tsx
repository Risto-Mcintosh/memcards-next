import * as React from 'react';

type UseObserver = {
  ref: React.MutableRefObject<any>;
  callback: () => void;
  // hasMore: boolean;
};

export function useObserver({
  callback,
  ref,
  // hasMore,
  rootMargin = '0px',
  threshold = 1.0,
  root
}: UseObserver & IntersectionObserverInit) {
  React.useEffect(() => {
    const el = ref && ref.current;

    const observer = new IntersectionObserver(
      ([entry], ob) => {
        if (entry.isIntersecting) {
          callback();
          console.log('intersecting');
        }
        // console.log('intersecting');
      },
      { root, rootMargin, threshold }
    );

    if (!el) return;

    console.count('observer');

    observer.observe(el);
    return () => observer.unobserve(el);
  }, [ref.current]);
}