import { ref } from 'vue'
import { UrtMenuAPI } from '../../pure/urt-menu/urt-menu.ts'

export class UrtProductNavigator {
	private menuComponentKey: string = ''

	public userName = ref<string>('')
	public userCompany = ref<string>('')
	public currentLanguage = ref<string>('')

	public companyChangedIsOpen = ref<boolean>(false)

	constructor() {
		this.setUserData()
	}

	public setMenuComponentKey(value: string): void {
		this.menuComponentKey = value

		UrtMenuAPI.setMarginLeft(this.menuComponentKey, 10)
		UrtMenuAPI.setMarginTop(this.menuComponentKey, 50)
	}

	public openMenu(): void {
		UrtMenuAPI.open(this.menuComponentKey)
	}

	private setUserData(): void {
		const session = JSON.parse(localStorage.getItem('session') || '{}')

		if (session?.user?.name)
			this.userName.value = session.user.name

		if (session?.customer?.name)
			this.userCompany.value = session.customer.name

		if (session?.user?.language)
			this.currentLanguage.value = session.user.language
	}

	public routeSecureLink(path: string): void {
		let url = path + '?'

		const params = {
			token: localStorage.getItem('token') || '',
			email: localStorage.getItem('email') || '',
			cookiesHasBeenAccepted: localStorage.getItem('cookiesHasBeenAccepted') || 'false'
		}

		for (const [key, value] of Object.entries(params)) {
			url += `${key}=${value}&`
		}

		url = url.slice(0, url.length - 1)
		window.location = url as any
	}

	public openCompanyChange(): void {
		UrtMenuAPI.close(this.menuComponentKey)
		this.companyChangedIsOpen.value = true
	}

	public closeCompanyChange(): void {
		this.companyChangedIsOpen.value = false
	}
}
