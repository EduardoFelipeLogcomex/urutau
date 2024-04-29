import { v4 as uuid } from 'uuid'
import EventDispatcherInterface from './event-dispatcher.interface'
import EventInterface, { EventUnsubscribe } from './event.interface';
import EventHandlerInterface from './event-handler.interface'

class EventDispatcher implements EventDispatcherInterface {
  // eslint-disable-next-line
  private static _instance: EventDispatcher

  private _handlers: { [eventName: string]: EventHandlerInterface[] } = {}

  public static getInstance(): EventDispatcher {
    if (!EventDispatcher._instance) EventDispatcher._instance = new EventDispatcher()
    return EventDispatcher._instance
  }

  public next<V>(event: EventInterface<V>): void {
    try {
			if (this._handlers[event.name as string]) {
				this._handlers[event.name as string]
					.forEach((eventHandler) => eventHandler.handle(event.payload as V))
			}
		} catch (e) {
			// component not initialized
		}
  }

  public nextSafe<V>(event: EventInterface<V>, onErrorCallback: Function, steps = 0): void {
    try {
			if (this._handlers[event.name as string]) {
				this._handlers[event.name as string]
					.forEach((eventHandler) => eventHandler.handle(event.payload as V))
			} else {
				setTimeout(() => {
					if (steps <= 20) {
						// eslint-disable-next-line
						this.nextSafe(event, onErrorCallback, steps++)
					} else {
						onErrorCallback()
					}
				}, 50)
			}
		} catch (e) {
			this._handlers = {}
			this.nextSafe<V>(event, onErrorCallback, steps++)
		}
  }

  public subscribe<V = undefined>(eventName: string, fn: (payload?: V) => Function | void): EventUnsubscribe {
    const id = uuid()

		if (!this._handlers)
			this._handlers = {}

    if (!this._handlers[eventName])
			this._handlers[eventName] = []

    this._handlers[eventName].push({
      id,
      handle: fn
    })

    return new EventUnsubscribe(eventName, id)
  }

  public unsubscribe(unsubscribe: EventUnsubscribe): void {
    if (this._handlers[unsubscribe.name]) {
      this._handlers[unsubscribe.name] = this._handlers[unsubscribe.name]
        .filter((eventHandler) => eventHandler.id !== unsubscribe.id)
    }
  }

  public unsubscribeAll(): void {
    this._handlers = {}
  }
}

export default EventDispatcher.getInstance()
