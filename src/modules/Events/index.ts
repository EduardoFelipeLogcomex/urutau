import EventDispatcher from './event-dispatcher'
import EventBox from './event-box'

export namespace Events {
	export function makeEventBox(): EventBox {
		return new EventBox()
	}

	export const subscribe = EventDispatcher.subscribe
	export const next = EventDispatcher.next
	export const nextSafe = EventDispatcher.nextSafe
	export const unsubscribe = EventDispatcher.unsubscribe
	export const unsubscribeAll = EventDispatcher.unsubscribeAll
}
