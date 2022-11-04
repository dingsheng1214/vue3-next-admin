<template>
  <div id="guide-full" class="fullscreen-wrapper" @click="onToggle">
    <svg-icon :icon="isFullscreen ? 'exit-fullscreen' : 'fullscreen'" className="fullscreen-icon" />
  </div>
</template>
<script setup lang="ts">
  import { onMounted, onUnmounted, ref } from 'vue'
  import screenfull from 'screenfull'

  const isFullscreen = ref(false)

  const onToggle = () => {
    screenfull.toggle()
  }

  const change = () => {
    isFullscreen.value = screenfull.isFullscreen
  }

  // on: 绑定监听
  onMounted(() => {
    screenfull.on('change', change)
  })

  // off: 取消监听
  onUnmounted(() => {
    screenfull.off('change', change)
  })
</script>
<style lang="scss" scoped>
  :global(.fullscreen-icon) {
    width: 25px !important;
    height: 25px !important;
  }
  .fullscreen-wrapper {
    cursor: pointer;
  }
</style>
