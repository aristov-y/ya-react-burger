import React, { useEffect, useRef } from 'react';

type Options = {
  passive?: boolean;
  once?: boolean;
  capture?: boolean;
};

/**
 * Хук для подписки на события дом элементов находящихся в <code>elementRef</code>
 *
 * @param eventName имя события
 * @param handler прослушиватель
 * @param elementRef ссылка на DOM-элемент, к которому надо добавить подписку на событие
 * @param options опции подписки
 */
function useEventListener
<Handler extends EventListener = EventListener,
  RefType extends HTMLElement = HTMLElement>
(
  eventName: string,
  handler: Handler,
  elementRef: React.RefObject<RefType>,
  options: Options = {}
) {
  // Так как eslint не видит глобальный EventListener
  // eslint-disable-next-line no-undef
  const savedHandler = useRef<EventListener>();
  const { capture, passive, once } = options;

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    if (elementRef != null && elementRef.current != null) {
      const { current } = elementRef;
      if (!current.addEventListener) {
        return () => {};
      }

      const eventListener = (event: Event) => savedHandler.current && savedHandler.current(event);
      const opts = { capture, once, passive };
      current.addEventListener(eventName, eventListener, opts);
      return () => {
        if (current) {
          current.removeEventListener(eventName, eventListener, opts);
        }
      };
    }
    return () => {};
  }, [eventName, elementRef, capture, passive, once]);
}

export default useEventListener;
