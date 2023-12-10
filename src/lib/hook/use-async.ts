import { DependencyList, useEffect, useRef, useState } from 'react';

type Loading<T> = {
  type: 'loading'
} | {
  type: 'ready'
  value: T
} | {
  type: 'error'
  error: Error
}

const Loading = {
  loading: <T>(): Loading<T> => ({type: 'loading'}),
  ready: <T>(value: T): Loading<T> => ({type: 'ready', value}),
  error: <T>(error: Error): Loading<T> => ({type: 'error', error}),
};

export function useAsync<T>(fn: () => Promise<T | void>, deps: DependencyList): Loading<T> {
  const [value, setValue] = useState<Loading<T>>(Loading.loading());
  const mod = useRef(1);
  useEffect(() => {
    mod.current += 1;
    const id = mod.current;
    fn()
      .then(e => {
        if (mod.current === id) {
          if (e === undefined) {
            setValue(Loading.loading());
          } else {
            setValue(Loading.ready(e));
          }
        }
      })
      .catch(e => {
        if (mod.current === id) {
          setValue(Loading.error(e));
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return value;
}