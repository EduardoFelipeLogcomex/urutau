import { ref } from 'vue'
import { UrtMenuAPI } from '../../pure/urt-menu/urt-menu.ts'
import { MakeHTTP } from '../../../modules/Http/http.protocol.ts'
import { Option } from '../../pure/forms/urt-autocomplete-select-outlined/urt-autocomplete-select-outlined.template.ts'

interface ChangeCompany {
	isOpen: boolean
	isLoading: boolean
	options: Option[]
	value: Option | null
}

export class UrtProductNavigator {
	private menuComponentKey: string = ''
	private httpFactory: MakeHTTP

	public userName = ref<string>('')
	public userCompany = ref<string>('')
	public currentLanguage = ref<string>('')

	public company = ref<ChangeCompany>({
		isOpen: false,
		isLoading: true,
		options: [],
		value: null
	})

	constructor(httpFactory: MakeHTTP) {
		this.httpFactory = httpFactory

		this.setUserData()
		this.fetchChangeCompanyData()
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

	public openCompanyModal(): void {
		UrtMenuAPI.close(this.menuComponentKey)
		this.company.value = { ...this.company.value, isOpen: true }
	}

	public closeCompanyModal(): void {
		this.company.value = { ...this.company.value, isOpen: false }
	}

	private fetchChangeCompanyData(): void {
		this.company.value = { ...this.company.value, isLoading: true }

		const http = this.httpFactory()
		http.changeBaseUrl('https://apiauth.logcomex.io/api')

		http.request('GET', '/customer?userEmail=eduardo.felipe%40logcomex.com')
			.then((response: any) => {
				this.company.value = {
					...this.company.value,
					options: response.map((company: { id: number; name: string; has_active_plan: number }) => ({
						value: company.id,
						label: company.has_active_plan ? `[P] ${company.name}` : company.name,
					})),
					isLoading: false
				}
			})
			.catch(() => {
				this.company.value = { ...this.company.value, options: [], isLoading: false }
			})
	}

	public closeCompanyChangeMenu(): void {
		this.company.value = { ...this.company.value, isOpen: false }
		UrtMenuAPI.close(this.menuComponentKey)
	}

	public setCompanyValue(v: Option): void {
		this.company.value = { ...this.company.value, value: v }
	}

	public changeCompany(): void {
		if (!this.company.value) {
			this.closeCompanyModal()
			return
		}

		const http = this.httpFactory()
		http.changeBaseUrl('https://apiauth.logcomex.io/api')
		http.useDefaultHeaders = false

		const v3InfraKey = '9dce6232-857c-4d2c-b5d5-216da1543a21'
		const userEmail = localStorage.getItem('email') || ''

		http.setHeaders({
			'Content-type': 'Application/json',
			'User-Email': userEmail,
			Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
			'x-infra-key': v3InfraKey
		})

		const payload = {
			customerId: (this.company.value.value as Option).value,
			userEmail: userEmail
		}

		http.request('POST', '/customer/change', payload)
			.then(() => {
				this.closeCompanyModal()
				window.location.reload()
			})
			.catch(() => this.closeCompanyModal())
	}

	public clearPreferences(): void {
		localStorage.clear()
		window.location.reload()
	}
}
