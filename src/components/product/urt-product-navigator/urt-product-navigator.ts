import { ref } from 'vue'
import { UrtMenuAPI } from '../../pure/urt-menu/urt-menu.ts'
import { MakeHTTP } from '../../../modules/Http/http.protocol.ts'
import { Option } from '../../pure/forms/urt-autocomplete-select-outlined/urt-autocomplete-select-outlined.template.ts'
import { Environment } from '../../../modules/Environment'
import { HexColor } from '../../../types.ts'
import { MakeColorHex } from '../../../modules/Color'
import { Permission, PERMISSIONS } from '../../../modules/Permission'
import LogcomexLogo from '../../../assets/img/logcomex-logo-full.png'

interface ChangeCompany {
	isOpen: boolean
	isLoading: boolean
	options: Option[]
	value: Option | null
}

interface NavigatorElements {
	logo: string
	bgColor: HexColor
	useLightFont: boolean
}

export class UrtProductNavigator {
	private menuComponentKey: string = ''
	private httpFactory: MakeHTTP
	private v3ApiInfraKey: string = ''

	public userName = ref<string>('')
	public userCompany = ref<string>('')
	public userAvatar = ref<string>('')
	public currentLanguage = ref<string>('')
	public company = ref<ChangeCompany>({
		isOpen: false,
		isLoading: true,
		options: [],
		value: null
	})

	public navigatorElements = ref<NavigatorElements>({
		logo: LogcomexLogo,
		bgColor: '',
		useLightFont: false
	})

	public permissions = ref({
		changeCompany: new Permission([], [PERMISSIONS.LOGMANAGER_VISUALIZATION]).check(),
		consumptionReport: new Permission([
			PERMISSIONS.ADMINISTRADOR,
			PERMISSIONS.IMPO_EXCEL_BRASIL,
			PERMISSIONS.EXPO_EXCEL_BRASIL,
			PERMISSIONS.MARITIMO_CABOTAGEM_EXCEL_BRASIL,
			PERMISSIONS.MARITIMO_IMPORTACAO_EXCEL_BRASIL,
			PERMISSIONS.MARITIMO_EXPORTACAO_EXCEL_BRASIL,
			PERMISSIONS.AEREO_IMPORTACAO_EXCEL_BRASIL,
			PERMISSIONS.LEADS_EXCEL,
			PERMISSIONS.MARITIMO_IMPORTACAO_EXCEL_ARGENTINA,
			PERMISSIONS.MARITIMO_IMPORTACAO_EXCEL_PARAGUAI,
			PERMISSIONS.MARITIMO_IMPORTACAO_EXCEL_URUGUAI,
			PERMISSIONS.MARITIMO_EXPORTACAO_EXCEL_ARGENTINA,
			PERMISSIONS.MARITIMO_EXPORTACAO_EXCEL_PARAGUAI,
			PERMISSIONS.MARITIMO_EXPORTACAO_EXCEL_URUGUAI,
			PERMISSIONS.MARITIMO_CAPTACAO_IMPORTACAO_EXCEL,
			PERMISSIONS.TRACKING_IMPORTACAO_EXCEL_BRASIL,
			PERMISSIONS.SEARCHX_EXCEL,
			PERMISSIONS.MARITIMO_IMPORTACAO_EXCEL_EUA,
			PERMISSIONS.SEARCH_EXCEL,
			PERMISSIONS.EXPORTACAO_EXCEL,
			PERMISSIONS.USUARIO
		], [PERMISSIONS.LOGMANAGER_VISUALIZATION]).check(),
	})

	constructor(httpFactory: MakeHTTP) {
		this.httpFactory = httpFactory

		this.loadUserCustomElements()
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
		const session = JSON.parse(localStorage.getItem('session') || '{}') as Record<string, any>

		if (session?.user?.name)
			this.userName.value = session.user.name

		if (session?.customer?.name)
			this.userCompany.value = session.customer.name

		if (session?.user?.language)
			this.currentLanguage.value = session.user.language

		if (session?.user?.avatar) {
			this.userAvatar.value = `https://logcomex-majestic.s3.sa-east-1.amazonaws.com/avatar/` + session.user.avatar
		} else {
			this.userAvatar.value = 'https://logcomex-majestic.s3.sa-east-1.amazonaws.com/avatar/avatar_default_2.png'
		}
	}

	public routeToV3(): void {
		let url = ''

		if (Environment.isProduction()) {
			url = 'https://sistema.logcomex.io/#/relatorio-consumo'
		} else {
			url = 'http://homol.logcomex.io/#/relatorio-consumo'
		}

		url = url + '?'

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

		if (Environment.isProduction()) {
			http.changeBaseUrl('https://apiauth.logcomex.io/api')
		} else {
			http.changeBaseUrl('http://api-auth.homol.logcomex.io/api')
		}

		const email = localStorage.getItem('email')

		http.request('GET', `/customer?userEmail=${email}`)
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

	public setV3ApiInfraKey(v: string): void {
		this.v3ApiInfraKey = v
	}

	public changeCompany(): void {
		if (!this.company.value) {
			this.closeCompanyModal()
			return
		}

		const http = this.httpFactory()
		http.useDefaultHeaders = false

		if (Environment.isProduction()) {
			http.changeBaseUrl('https://apiauth.logcomex.io/api')
		} else {
			http.changeBaseUrl('http://api-auth.homol.logcomex.io/api')
		}

		const userEmail = localStorage.getItem('email') || ''

		http.setHeaders({
			'Content-type': 'Application/json',
			'User-Email': userEmail,
			Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
			'x-infra-key': this.v3ApiInfraKey
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

	public redirectWithEnvironment(url: string): void {
		let targetURL = url.replace('{ENV}', Environment.isProduction() ? '' : '.homol')

		if (Environment.isHomologation() && targetURL.includes('https://')) {
			targetURL = targetURL.replace('https://', 'http://')
		}

		window.location = targetURL as any
	}

	private loadUserCustomElements(): void {
		const session = JSON.parse(localStorage.getItem('session') || '{}') as Record<string, any>
		const customer = session?.customer as Record<string, any>

		if (customer?.customization) {
			const c: { [key: string]: any } = customer.customization

			if (c.customLogo)
				this.navigatorElements.value.logo = c.customLogo

			if (c.customHexColor) {
				this.navigatorElements.value.bgColor = c.customHexColor
				const color = MakeColorHex(c.customHexColor)

				if (!color.isLight) {
					this.navigatorElements.value.useLightFont = true
				}
			}
		}
	}
}
