import { ref } from 'vue'
import {MakeHighResolution, Worker} from '../../../modules/Worker'
import { Events } from '../../../modules/Events'
import { Vector } from '../../../modules/Vector'

enum UrtMenuAction {
	SET_MARGIN_TOP,
	SET_MARGIN_LEFT,
	OPEN,
	CLOSE
}

interface UrtMenuData {
	action: UrtMenuAction,
	data: any
}

export namespace UrtMenuAPI {
	export function setMarginTop(componentKey: string, margin: number): void {
		Events.nextSafe<UrtMenuData>({
			name: `__URT__MENU__${componentKey}`,
			payload: {
				action: UrtMenuAction.SET_MARGIN_TOP,
				data: margin
			}
		}, () => {})
	}

	export function setMarginLeft(componentKey: string, margin: number): void {
		Events.nextSafe<UrtMenuData>({
			name: `__URT__MENU__${componentKey}`,
			payload: {
				action: UrtMenuAction.SET_MARGIN_LEFT,
				data: margin
			}
		}, () => {})
	}

	export function open(componentKey: string): void {
		Events.nextSafe<UrtMenuData>({
			name: `__URT__MENU__${componentKey}`,
			payload: {
				action: UrtMenuAction.OPEN,
				data: null
			}
		}, () => {})
	}

	export function close(componentKey: string): void {
		Events.nextSafe<UrtMenuData>({
			name: `__URT__MENU__${componentKey}`,
			payload: {
				action: UrtMenuAction.CLOSE,
				data: null
			}
		}, () => {})
	}
}

export class UrtMenu {
	private readonly target: string
	public readonly componentID: string

	private evtBox = Events.makeEventBox()
	private margins = Vector.MakeVec2()
	private position = Vector.MakeVec4()

	private openMenuListenerEvtIsOn = false

	private actions: { [UrtMenuAction: number]: Function } = {
		[UrtMenuAction.SET_MARGIN_LEFT]: (margin: number) => this.margins.x = margin,
		[UrtMenuAction.SET_MARGIN_TOP]: (margin: number) => this.margins.y = margin,
		[UrtMenuAction.OPEN]: () => this.openMenu(),
		[UrtMenuAction.CLOSE]: () => this.closeMenu()
	}

	public isOpen = ref<boolean>(false)

	constructor(key: string, target: string) {
		this.componentID = key
		this.target = target
		this.registerEvents()
	}

	private appendTargetPosition(): void {
		Worker.MakeHighResolution((worker: any) => {
			const htmlElement = document.getElementById(this.target)
			const menuElement = document.getElementById(this.componentID)

			if (htmlElement && menuElement) {
				Worker.Clear(worker)

				const rect = htmlElement.getBoundingClientRect()
				menuElement.style.left = `${rect.left + this.margins.x}px`
				menuElement.style.top = `${rect.top + this.margins.y}px`
				menuElement.style.display = 'block'

				const menuRect = menuElement.getBoundingClientRect()

				this.position.x = menuRect.left
				this.position.y = menuRect.top
				this.position.w = menuRect.right
				this.position.h = menuRect.bottom

				if (this.position.h < 0) {
					this.closeMenu()
				}
			}
		})
	}

	private registerEvents(): void {
		this.evtBox.register(
			Events.subscribe<UrtMenuData>(`__URT__MENU__${this.componentID}`, (payload) => {
				if (payload) {
					this.actions[payload.action](payload.data)
				}
			})
		)
	}

	public onUnmounted(): void {
		this.evtBox.destroy()
	}

	private openMenu(): void {
		this.isOpen.value = true
		this.appendTargetPosition()

		if (!this.openMenuListenerEvtIsOn) {
			setTimeout(() => {
				document.addEventListener('click', this.listenerPointsEvt)
				document.addEventListener('scroll', this.listenerScrollEvt)
			}, 100)

			this.openMenuListenerEvtIsOn = true
		}
	}

	private listenerPointsEvt = (evt: MouseEvent) => {
		this.checkPoint(evt, this.position)
	}

	private listenerScrollEvt = () => {
		this.appendTargetPosition()
	}

	private checkPoint(evt: MouseEvent, menuPos: Vector.Vec4): void {
		const pointer = Vector.MakeVec4()
		pointer.x = evt.x
		pointer.y = evt.y
		pointer.w = evt.x
		pointer.h = evt.y

		if (!Vector.Vec4Intersects(menuPos, pointer)) {
			this.closeMenu()
			evt.stopPropagation()
		}
	}

	public closeMenu(): void {
		this.isOpen.value = false
		document.removeEventListener('click', this.listenerPointsEvt)
		document.removeEventListener('scroll', this.listenerScrollEvt)
		this.openMenuListenerEvtIsOn = false
	}
}
