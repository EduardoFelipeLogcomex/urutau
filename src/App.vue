<template>
  <div class="playground">
    <urt-product-navigator api-v3-infra-key="">
			<template v-slot:end_append>
				<span>here</span>
			</template>
		</urt-product-navigator>
  </div>
</template>

<script setup lang="ts">
import UrtProductNavigator from "./components/product/urt-product-navigator/urt-product-navigator.template.vue"
import { Environment } from "./modules/Environment"

Environment.setEnvironment(Environment.Production)
</script>

<style scoped>
.playground {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #FFF;
}
</style>
