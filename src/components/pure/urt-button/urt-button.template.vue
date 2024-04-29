<template>
	<button
		type="button"
		@click="emits('click')"
		:class="[type, size]"
	>
		<slot />
	</button>
</template>

<script lang="ts" setup>
defineProps({
	type: {
		type: String,
		default: 'primary',
	},
	size: {
		type: String,
		default: 'md',
	}
})

const emits = defineEmits(['click'])
</script>

<style lang="scss" scoped>
@import "./urt-button.scss";
</style>
