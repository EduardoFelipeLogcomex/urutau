import EventBoxInterface from './event-box.interface'
import { EventUnsubscribe } from './event.interface.ts'
import EventDispatcher from './event-dispatcher.ts'

export default class EventBox implements EventBoxInterface {
  private _unsubscribers: EventUnsubscribe[] = []

  register(unsubscribe: EventUnsubscribe): void {
    this._unsubscribers.push(unsubscribe)
  }

  destroy(): void {
    this._unsubscribers.forEach((unsubscribe) => {
      EventDispatcher.unsubscribe(unsubscribe)
    })
  }
}
