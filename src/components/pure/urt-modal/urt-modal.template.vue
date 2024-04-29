<template>
	<div v-if="isOpen" class="urtModal__container">
		<div class="urtModal__overlay" @click="emits('close')" />

		<div class="urtModal" :style="{ 'align-self': translatePosition() }">
			<slot />
		</div>
	</div>
</template>

<script lang="ts" setup>
const props = defineProps<{
	isOpen: boolean,
	position: string
}>()

const emits = defineEmits(['close'])

function translatePosition() {
	switch (props.position) {
		case 'top':
			return 'flex-start'
		case 'center':
			return 'center'
		case 'bottom':
			return 'flex-end'
		default:
			return 'center'
	}
}
</script>

<style lang="scss" scoped>
@import "./urt-modal.scss";
</style>
