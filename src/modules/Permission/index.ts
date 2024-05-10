class PermissionStorage {
	// O(1) - Constant time complexity
	private permissions = new Map<string, boolean>()

	private _instance: PermissionStorage | undefined = undefined

	public static getInstance(): PermissionStorage {
		if (!this._instance) {
			this._instance = new PermissionStorage()

			const session = JSON.parse(localStorage.getItem('session') || '{}') as Record<string, any>
			const user = session?.user || false

			if (user) {
				const permissions = user.permissions || []

				// nothing mapped full permission object
				permissions.forEach((permission: { id: number; name: string; slug: string }) => {
					this._instance!.permissions.set(permission.slug, true)
				})
			}
		}

		return this._instance
	}

	public hasPermission(permission: string): boolean {
		return this.permissions.has(permission)
	}
}

export class Permission {
	private readonly _allow: string[]
	private readonly _reject: string[]

	constructor(allow: string[], reject: string[]) {
		this._allow = allow
		this._reject = reject
	}

	public check(): boolean {
		if (!this._allow.length && !this._reject.length)
			return true

		const storage = PermissionStorage.getInstance()

		if (this._reject.length) {
			let hasReject = this._reject.some((reject) => storage.hasPermission(reject))
			if (hasReject) return false
		}

		if (this._allow.length) {
			return this._allow.some((allow) => storage.hasPermission(allow))
		}

		return true
	}
}

export const PERMISSIONS = {
	ADMINISTRADOR: 'administrador',
	CREDENCIAIS_ADICIONAR: 'credenciais-adicionar',
	CREDENCIAIS_EXCLUIR: 'credenciais-excluir',
	ACCESS_REPORT: 'relatorio-acesso',
	PRICE_CALCULATOR: 'precificador',
	USUARIO: 'usuario',
	IMPO_EXCEL_BRASIL: 'big-data-maritimo-importacao-brasil-excel',
	EXPO_EXCEL_BRASIL: 'big-data-maritimo-exportacao-brasil-excel',
	MARITIMO_CABOTAGEM_EXCEL_BRASIL:
		'big-data-maritimo-cabotagem-brasil-excel',
	MARITIMO_IMPORTACAO_EXCEL_BRASIL:
		'big-data-maritimo-importacao-latam-excel',
	MARITIMO_EXPORTACAO_EXCEL_BRASIL:
		'big-data-maritimo-exportacao-latam-excel',
	AEREO_IMPORTACAO_EXCEL_BRASIL:
		'big-data-aereo-importacao-brasil-excel',
	LEADS_EXCEL: 'leads-excel',
	MARITIMO_IMPORTACAO_EXCEL_ARGENTINA:
		'big-data-maritimo-importacao-argentina-excel',
	MARITIMO_IMPORTACAO_EXCEL_PARAGUAI:
		'big-data-maritimo-importacao-paraguai-excel',
	MARITIMO_IMPORTACAO_EXCEL_URUGUAI:
		'big-data-maritimo-importacao-uruguai-excel',
	MARITIMO_EXPORTACAO_EXCEL_ARGENTINA:
		'big-data-maritimo-exportacao-argentina-excel',
	MARITIMO_EXPORTACAO_EXCEL_PARAGUAI:
		'big-data-maritimo-exportacao-paraguai-excel',
	MARITIMO_EXPORTACAO_EXCEL_URUGUAI:
		'big-data-maritimo-exportacao-uruguai-excel',
	MARITIMO_CAPTACAO_IMPORTACAO_EXCEL:
		'big-data-maritimo-captacao-importacao-excel',
	TRACKING_IMPORTACAO_EXCEL_BRASIL:
		'tracking-importacao-brasil-excel',
	SEARCHX_EXCEL: 'commodities-excel',
	MARITIMO_IMPORTACAO_EXCEL_EUA:
		'big-data-maritimo-eua-importacao-excel',
	SEARCH_EXCEL: 'search-excel',
	EXPORTACAO_EXCEL: 'big-data-exportacao-excel',
	COMEX_ANALYTICS: 'siscomex-restituicao',
	LOGMANAGER_VISUALIZATION: 'logmanager-visualizacao',
	FINANCEIRO: 'financial-profile-permission',
	TRACKING: 'tracking-acesso-total'
}
