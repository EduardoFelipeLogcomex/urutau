enum Env {
	Production = 'fd89784e59c72499525556f80289b2c7',
	Homologation = '045ae85278360dec0b91df0713776a7a'
}

export namespace Environment {
	export function isProduction(): boolean {
		return getEnvironment() === Env.Production
	}

	export function isHomologation(): boolean {
		return getEnvironment() === Env.Homologation
	}

	export function setEnvironment(env: Env): void {
		document.cookie = `urt_env=${env}; path=/`
	}

	export function getEnvironment(): string | null {
		let cookies = document.cookie.split('; ')

		for(let i = 0; i < cookies.length; i++) {
			let cookie = cookies[i]
			let [cookieName, cookieValue] = cookie.split('=')

			if(cookieName === 'urt_env') {
				return cookieValue;
			}
		}

		return null
	}

	export const Production: Env = Env.Production
	export const Homologation: Env = Env.Homologation
}
