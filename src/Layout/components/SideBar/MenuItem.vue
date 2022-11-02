<template>
  <!-- element icon -->
  <i v-if="icon.startsWith('el-icon')" class="sub-el-icon" :class="icon" />
  <!-- 自定义svg icon -->
  <SvgIcon v-else :icon="icon" />

  <!-- title -->
  <span>{{ title }}</span>
</template>
<script setup lang="ts">
  import SvgIcon from '@/components/SvgIcon/index.vue'

  interface Props {
    path: string
    title: string
    icon: string
  }
  defineProps<Props>()
</script>
<style lang="scss" scoped></style>
