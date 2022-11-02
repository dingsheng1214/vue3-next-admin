<template>
  <el-menu :uniqueOpened="true" :default-active="currentPath" :collapse="isCollapse" router>
    <SideBarItem v-for="item in menus" :key="item.path" :route="item" />
  </el-menu>
</template>
<script setup lang="ts">
  import { useRouter, useRoute } from 'vue-router'
  import { computed } from 'vue'
  import { generateMenus, filterRoutes } from '@/assets/js/utils/route'
  import SideBarItem from './SideBarItem.vue'
  import { useUiStore } from '@/store'

  const router = useRouter()
  const menus = computed(() => generateMenus(filterRoutes(router.getRoutes())))

  // 控制 default-active 默认激活菜单
  const route = useRoute()
  const currentPath = computed(() => route.path)

  // 控制 collapse 侧边栏是否收缩
  const uiStore = useUiStore()
  const isCollapse = computed(() => uiStore.sideBarCollapse)
</script>
<style lang="scss" scoped></style>
