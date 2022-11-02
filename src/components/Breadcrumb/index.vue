<template>
  <el-breadcrumb class="breadcrumb" :separator-icon="ArrowRight">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in matched" :key="item.path">
        <span
          class="redirect"
          v-if="index < matched.length - 1"
          @click="handleLinkClick(item.path)"
        >
          {{ item.meta.title }}
        </span>
        <span class="no-redirect" v-else>
          {{ item.meta.title }}
        </span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
  import { ArrowRight } from '@element-plus/icons-vue'
  import { computed } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  const route = useRoute()
  const router = useRouter()
  const matched = computed(() => route.matched.filter((item) => item.path !== '/'))

  const handleLinkClick = (path: string) => router.push(path)
</script>
<style lang="scss" scoped>
  .breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 8px;
    cursor: pointer;

    ::v-deep .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
</style>
