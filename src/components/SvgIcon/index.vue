<template>
  <!-- 外部图标 -->
  <div
    v-if="isExternal"
    :style="externalIconStyle"
    :class="className"
    class="svg-external-icon svg-icon"
  ></div>

  <!-- 内部图标 -->
  <svg v-else :class="className" class="svg-icon">
    <use :xlink:href="symbolId" />
  </svg>
</template>
<script setup lang="ts">
  import { computed } from 'vue'

  interface Props {
    icon: string // 外部资源或内部图标
    className?: string
  }
  const props = withDefaults(defineProps<Props>(), {
    icon: '',
    className: '',
  })

  const external = (path: string) => {
    return /^(https?:|mailto:|tel:)/.test(path)
  }
  // 判断是否为外部资源
  const isExternal = computed(() => external(props.icon))

  // 外部图标样式
  const externalIconStyle = computed(() => {
    return {
      mask: `url(${props.icon}) no-repeat 50% 50%`,
      '-webkit-mask': `url(${props.icon}) no-repeat 50% 50%`,
    }
  })

  // 内部图标use 引用的dom id
  const symbolId = computed(() => `#icon-${props.icon}`)
</script>
<style lang="scss" scoped>
  .svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }

  .svg-external-icon {
    background-color: currentColor;
    mask-size: cover !important;
    -webkit-mask-size: cover !important;
    display: inline-block;
  }
</style>
