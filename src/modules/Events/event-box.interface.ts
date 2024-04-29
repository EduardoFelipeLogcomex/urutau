import { EventUnsubscribe } from './event.interface.ts'

export default interface EventBoxInterface {
  register (unsubscribe: EventUnsubscribe): void
  destroy (): void
}
