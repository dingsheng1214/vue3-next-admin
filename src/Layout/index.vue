<template>
  <div class="app-wrapper" :class="isCollapse ? 'hideSidebar' : ''">
    <!-- 左侧 SideBar -->
    <SideBar class="sidebar-container" id="guide-sidebar" />
    <div class="main-container">
      <!-- 顶部 NavBar -->
      <NavBar />
      <!-- TagViews -->
      <TagViews id="guide-tags" />
      <!-- 主内容 AppMain -->
      <AppMain />
    </div>
  </div>
</template>
<script setup lang="ts">
  import { computed } from 'vue'
  import { useUiStore } from '@/store'
  import AppMain from './components/AppMain.vue'
  import NavBar from './components/NavBar.vue'
  import TagViews from '@/components/TagViews/index.vue'
  import SideBar from './components/SideBar/index.vue'

  const uiStore = useUiStore()
  const isCollapse = computed(() => uiStore.sideBarCollapse)
</script>
<style lang="scss" scoped></style>
