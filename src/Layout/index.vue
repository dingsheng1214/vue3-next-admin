<template>
  <div class="app-wrapper">
    <!-- 左侧 SideBar -->
    <SideBar class="sidebar-container" />
    <div class="main-container">
      <!-- 顶部 NavBar -->
      <NavBar />
      <!-- 主内容 AppMain -->
      <AppMain />
    </div>
  </div>
</template>
<script setup lang="ts">
  import AppMain from './components/AppMain.vue'
  import NavBar from './components/NavBar.vue'
  import SideBar from './components/SideBar/index.vue'
</script>
<style lang="scss" scoped></style>
