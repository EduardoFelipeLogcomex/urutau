<template>
  <div class="playground">
    <urt-product-navigator api-v3-infra-key="" />
  </div>
</template>

<script setup lang="ts">
import UrtProductNavigator from "./components/product/urt-product-navigator/urt-product-navigator.template.vue"
</script>

<style scoped>
.playground {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #FFF;
}
</style>
