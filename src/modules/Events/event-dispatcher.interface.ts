import EventInterface, { EventUnsubscribe } from './event.interface';

export default interface EventDispatcherInterface {
  next<V>(event: EventInterface<V>): void
  nextSafe<V>(event: EventInterface<V>, onErrorCallback: Function, steps: number): void
  subscribe<V> (eventName: string, fn: (payload?: V) => Function): EventUnsubscribe
  unsubscribe(unsubscribe: EventUnsubscribe): void
  unsubscribeAll (): void
}
