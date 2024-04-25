<template>
	<div v-if="isOpen" class="urtModal__overlay" @click="emits('close')" />
	<div v-if="isOpen" class="urtModal">
		<slot />
	</div>
</template>

<script lang="ts" setup>
defineProps<{ isOpen: boolean }>()
const emits = defineEmits(['close'])
</script>

<style lang="scss" scoped>
@import "./urt-modal.scss";
</style>
