import React, { useEffect, useRef } from 'react';

export const useUpdateEffect = (
  fn: React.EffectCallback,
  deps: React.DependencyList,
) => {
  const mounted = useRef(false);
  return useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }

    return fn && fn();
  }, deps);
};
