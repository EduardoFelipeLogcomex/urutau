import { ref } from 'vue'
import { UrtMenuAPI } from '../../pure/urt-menu/urt-menu.ts'
import { MakeHTTP } from '../../../modules/Http/http.protocol.ts'
import { Environment } from '../../../modules/Environment'

interface GuardianRequest {
	avatar_link: string
	email: string
	hubspot_meeting_url: string
	name: string
}

interface Guardian {
	name: string
	email: string
	avatarLink: string
	hubspotMeetingUrl: string
}

export class UrtGuardianMenu {
	private menuComponentKey: string = ''
	public guardian = ref<Guardian>({
		name: '',
		email: '',
		avatarLink: '',
		hubspotMeetingUrl: '',
	})

	public isLoading = ref<boolean>(true)
	public showGuardian = ref<boolean>(false)

	constructor(private httpFactory: MakeHTTP) {
		this.fetchGuardian().then((data) => {
			if (data) {
				this.guardian.value = {
					name: data.name,
					email: data.email,
					avatarLink: data.avatar_link,
					hubspotMeetingUrl: data.hubspot_meeting_url
				}

				this.isLoading.value = false
				this.showGuardian.value = true

				return
			}

			this.isLoading.value = false
			this.showGuardian.value = false
		}).catch(() => {
			this.isLoading.value = false
			this.showGuardian.value = false
		})
	}

	private fetchGuardian(): Promise<GuardianRequest | null> {
		return new Promise(async (resolve, reject) => {
			const http = this.httpFactory()

			Environment.isProduction() ? http.changeBaseUrl('https://apiauth.logcomex.io/api') :
				http.changeBaseUrl('http://api-auth.homol.logcomex.io/api')

			try {
				let response = await http.request<GuardianRequest | null>('GET', '/user/guardianInformation')
				resolve(response)
			} catch (error) {
				reject(new Error(error))
			}
		})
	}

	public setMenuComponentKey(key: string): void {
		this.menuComponentKey = key
	}

	public openMenu(): void {
		UrtMenuAPI.setMarginTop(this.menuComponentKey, 60)
		UrtMenuAPI.setMarginLeft(this.menuComponentKey, -60)
		UrtMenuAPI.open(this.menuComponentKey)
	}
}

