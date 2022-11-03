<template>
  <div class="guide-wrapper" @click="onToggle" id="guide-start">
    <svg-icon icon="guide" className="guide-icon" />
  </div>
</template>
<script setup lang="ts">
  import Driver from 'driver.js'
  import 'driver.js/dist/driver.min.css'
  import { onMounted } from 'vue'
  import { useI18n } from 'vue-i18n'
  import steps from './step'

  const i18n = useI18n()

  let driver: Driver
  onMounted(() => {
    driver = new Driver({
      // 禁止点击蒙版关闭
      allowClose: false,
      closeBtnText: i18n.t('msg.guide.close'),
      nextBtnText: i18n.t('msg.guide.next'),
      prevBtnText: i18n.t('msg.guide.prev'),
    })
  })
  const onToggle = () => {
    driver.defineSteps(steps(i18n))
    driver.start()
  }
</script>
<style lang="scss" scoped>
  :global(.guide-icon) {
    width: 25px !important;
    height: 25px !important;
  }
  .guide-wrapper {
    cursor: pointer;
  }
</style>
