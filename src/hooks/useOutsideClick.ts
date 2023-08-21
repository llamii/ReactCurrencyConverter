import React, { useEffect } from 'react'

import { useEvent } from './useEvent'

interface UseOutsideClickOptions {
  elementRef: React.RefObject<HTMLElement>;
  triggerRef?: React.RefObject<HTMLElement>;
  enabled?: boolean;
  onOutsideClick(e: MouseEvent | TouchEvent): void;
}

export function useOutsideClick({
  elementRef,
  triggerRef,
  enabled = true,
  onOutsideClick
}: UseOutsideClickOptions) {
  const handleOutsideClick = useEvent(onOutsideClick)

  useEffect(() => {
    if (!enabled) {
      return
    }

    const handleClick = (e: MouseEvent | TouchEvent) => {
      const { target } = e
      if (!(target instanceof Node)) {
        return
      }

      if (!elementRef.current) {
        return
      }

      const ignoreElements = [elementRef.current]

      if (triggerRef?.current) {
        ignoreElements.push(triggerRef.current)
      }

      if (!ignoreElements.some((element) => element.contains(target))) {
        handleOutsideClick(e)
      }
    }

    document.addEventListener('mousedown', handleClick, true)
    document.addEventListener('touchstart', handleClick, true)

    return () => {
      document.removeEventListener('mousedown', handleClick, true)
      document.removeEventListener('touchstart', handleClick, true)
    }
  }, [enabled, elementRef, triggerRef, handleOutsideClick])
}
