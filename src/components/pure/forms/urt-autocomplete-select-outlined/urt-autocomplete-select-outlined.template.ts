import { ref } from 'vue'
import { v4 as uuid } from 'uuid'
import { UrtMenuAPI } from '../../urt-menu/urt-menu.ts'
import { Worker } from '../../../../modules/Worker'

export interface Option {
	value: string
	label: string
}

export class UrtAutocompleteSelectOutlined {
	public value = ref<string>('')
	public componentID = ref<string>(uuid())
	private menuComponentApiKey: string = ''
	private emitsHandler: Function = () => {}

	private options = ref<Option[]>([])
	public showOptions = ref<Option[]>([])

	private searchDispatcher: any
	private disableLoadMore: boolean = false

	setMenuComponentApiKey (apiKey: string): void {
		this.menuComponentApiKey = apiKey
	}

	openMenu(): void {
		UrtMenuAPI.setMarginTop(this.menuComponentApiKey, 55)
		UrtMenuAPI.open(this.menuComponentApiKey)

		Worker.Make((w) => {
			const element: HTMLDivElement | null = document.getElementById(`${this.componentID.value}-input`) as HTMLDivElement | null

			if (element) {
				Worker.Clear(w)
				element.focus()
			}
		})
	}

	openMenuWithFocus(): void {
		UrtMenuAPI.setMarginTop(this.menuComponentApiKey, 55)
		UrtMenuAPI.open(this.menuComponentApiKey)
	}

	bindEmitsHandler (handler: Function): void {
		this.emitsHandler = handler
	}

	changeValue(value: Option): void {
		this.value.value = value.label
		this.emitsHandler('change-value', value)
		UrtMenuAPI.close(this.menuComponentApiKey)
	}

	searchValue(): void {
		if (this.searchDispatcher) {
			clearTimeout(this.searchDispatcher)
		}

		this.searchDispatcher = setTimeout(() => {
			if (this.options.value.length === 0) {
				this.disableLoadMore = false
				this.showOptions.value = this.options.value.slice(0, 100)
				return
			}

			this.disableLoadMore = true
			this.showOptions.value = this.options.value
				.filter((option) => option.label.toLowerCase().includes(this.value.value.toLowerCase()))
		}, 700)
	}

	setOptions(value: Option[]): void {
		this.options.value = value
		this.showOptions.value = value.slice(0, 100)
	}

	loadMoreOptions(): void {
		if (!this.disableLoadMore) {
			if (this.showOptions.value.length < this.options.value.length) {
				this.showOptions.value.push(...this.options.value.slice(this.showOptions.value.length, this.showOptions.value.length + 100))
			}
		}
	}
}
