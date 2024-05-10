<template>
  <div
		v-if="self.isOpen.value"
		:id="key"
		class="urt__menu"
	>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { onUnmounted, ref } from 'vue'
import { v4 as uuid } from 'uuid'
import { UrtMenu } from './urt-menu.ts'

const props = defineProps<{
	target: string
}>()

const key = ref<string>(uuid())
const emits = defineEmits(['component-key'])
emits('component-key', key.value)

const self = new UrtMenu(String(key.value), props.target)

onUnmounted(() => {
	self.onUnmounted()
})
</script>

<style lang="sass" scoped>
@import "./urt-menu.scss"
</style>
