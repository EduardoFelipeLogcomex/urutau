import { UrtMenuAPI } from '@/components/pure/urt-menu/urt-menu.ts'

export class UrtProductNavigator {
	private menuComponentKey: string = ''

	constructor() {}

	public setMenuComponentKey(value: string): void {
		this.menuComponentKey = value

		UrtMenuAPI.setMarginLeft(this.menuComponentKey, 10)
		UrtMenuAPI.setMarginTop(this.menuComponentKey, 50)
	}

	public openMenu(): void {
		UrtMenuAPI.open(this.menuComponentKey)
	}
}
