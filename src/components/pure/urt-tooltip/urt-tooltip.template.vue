<template>
	<div :id="self.tooltipID.value" class="urt__tooltip" @mouseenter="self.openMenu()" @mouseleave="self.closeMenu()">
		<slot/>

		<urt-menu :target="self.tooltipID.value" @component-key="(k: string) => self.setMenuComponentKey(k)">
			<div class="urt__tooltip__text">
				<span>{{ tooltip }}</span>
			</div>
		</urt-menu>
	</div>
</template>

<script lang="ts" setup>
import { UrtTooltip } from './urt-tooltip.ts'
import UrtMenu from '../urt-menu/urt-menu.template.vue'

const props = defineProps<{
	tooltip: string
	top: number
	left: number
}>()

const self = new UrtTooltip(props.top, props.left)
</script>

<style lang="scss" scoped>
@import "./urt-tooltip.template.scss";
</style>
