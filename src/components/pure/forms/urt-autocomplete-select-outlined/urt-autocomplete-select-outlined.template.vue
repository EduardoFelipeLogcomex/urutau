<template>
		<div :id="self.componentID.value" class="urtAtcSelectOut">
			<input
				:id="`${self.componentID.value}-input`"
				v-model="self.value.value"
				placeholder=" "
				type="text"
				@keyup="self.searchValue()"
				@focus="self.openMenuWithFocus()"
			/>

			<div class="urtAtcSelectOut__icon" @click="self.openMenu()">
				<i class="material-symbols-outlined">expand_more</i>
			</div>

			<label :class="{ labelFixed: self.value.value.length }">
				{{ placeholder }}
			</label>
		</div>

		<urt-menu
			:target="self.componentID.value"
			@component-key="(k: string) => self.setMenuComponentApiKey(k)"
		>
			<div class="urtAtcSelectOut__options">
				<div
					v-if="self.showOptions.value.length"
					class="urtAtcSelectOut__options__container"
					@scrollend="self.loadMoreOptions()"
				>
					<div
						v-for="option in self.showOptions.value"
						:key="option.value"
						class="urtAtcSelectOut__options__item"
						@click="self.changeValue(option)"
					>
						{{ option.label }}
					</div>
				</div>

				<div v-else class="urtAtcSelectOut__options__empty">
					<span>Nenhuma opção disponível.</span>
				</div>
			</div>
		</urt-menu>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { Option, UrtAutocompleteSelectOutlined } from './urt-autocomplete-select-outlined.template.ts'
import UrtMenu from '../../urt-menu/urt-menu.template.vue'

const props = defineProps<{
	placeholder: string
	options: Option[]
}>()

const self = new UrtAutocompleteSelectOutlined()
const emits = defineEmits(['change-value'])

onMounted(() => {
	// eslint-disable-next-line
	self.bindEmitsHandler((name: any, ...args: any) => emits(name, ...args))
	self.setOptions(props.options)
})
</script>

<style lang="scss">
@import "urt-autocomplete-select-outlined.scss";
</style>
