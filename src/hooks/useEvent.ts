import { useCallback, useLayoutEffect, useRef } from 'react'

export function useEvent<T extends (...args: any[]) => any>(fn:T) {
  const fnRef = useRef(fn)

  useLayoutEffect(() => {
    fnRef.current = fn
  }, [fn])

  const eventCallback = useCallback(
    (...args: Parameters<T>) => fnRef.current.apply(null, args),
    [fnRef]
  )

  return eventCallback
}
