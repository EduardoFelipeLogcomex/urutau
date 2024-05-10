import { ref } from 'vue'
import { v4 as uuid } from 'uuid'
import { UrtMenuAPI } from '../urt-menu/urt-menu.ts'

export class UrtTooltip {
	public tooltipID = ref<string>(uuid())
	private menuComponentKey: string = ''
	private tooltipIsOpen: boolean = false
	private readonly top: number
	private readonly left: number

	constructor(top: number, left: number) {
		this.top = top
		this.left = left
	}

	public setMenuComponentKey(key: string): void {
		this.menuComponentKey = key
	}

	public openMenu(): void {
		if (!this.tooltipIsOpen) {
			UrtMenuAPI.setMarginTop(this.menuComponentKey, this.top)
			UrtMenuAPI.setMarginLeft(this.menuComponentKey, this.left)
			UrtMenuAPI.open(this.menuComponentKey)
			this.tooltipIsOpen = true
		}
	}

	public closeMenu(): void {
		if (this.tooltipIsOpen) {
			UrtMenuAPI.close(this.menuComponentKey)
			this.tooltipIsOpen = false
		}
	}
}
