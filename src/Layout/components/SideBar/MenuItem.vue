<template>
  <!-- element icon -->
  <i v-if="icon.startsWith('el-icon')" class="sub-el-icon" :class="icon" />
  <!-- 自定义svg icon -->
  <SvgIcon v-else :icon="icon" />

  <!-- title -->
  <span>{{ generateTitle(title) }}</span>
</template>
<script setup lang="ts">
  import SvgIcon from '@/components/SvgIcon/index.vue'
  import { generateTitle } from '@/assets/js/utils/i18n'

  interface Props {
    path: string
    title: string
    icon: string
  }
  defineProps<Props>()
</script>
<style lang="scss" scoped></style>
