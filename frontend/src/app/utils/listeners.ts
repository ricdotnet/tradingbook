interface EventListener {
  [key: string]: any
}

export class Listeners {

  useDOMEvent(events: EventListener) {
    window.addEventListener(events.event, events.func, false)
  }

}