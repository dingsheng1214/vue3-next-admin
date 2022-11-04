<template>
  <UploadExcel :onSuccess="onSuccess" />
</template>
<script setup lang="ts">
  import { onActivated } from 'vue'
  import UploadExcel from '@/components/UploadExcel/index.vue'

  onActivated(() => {
    console.log('onActived')
  })
  const onSuccess = (data: any) => {
    console.log(data)
  }
</script>
<style lang="scss" scoped></style>
