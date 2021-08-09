// export type KeyEvents = {
//   [key in keyof WindowEventMap]: EventListenerOrEventListenerObject
// }

export class Listeners {

  useDOMEvent(events: any) {
    window.addEventListener(events.event, events.func)
  }


}