<template>
  <!-- 多级菜单 -->
  <el-sub-menu v-if="route.children?.length" :index="route.path">
    <template #title>
      <MenuItem
        :title="route?.meta?.title as string"
        :icon="route?.meta?.icon as string"
        :path="route.path"
      />
    </template>

    <!-- 递归 -->
    <SideBarItem v-for="item in route.children" :key="item.path" :route="item" />
  </el-sub-menu>

  <!-- 一级菜单 -->
  <el-menu-item v-else :index="route.path">
    <MenuItem
      :title="route?.meta?.title as string"
      :icon="route?.meta?.icon as string"
      :path="route.path"
    />
  </el-menu-item>
</template>
<script setup lang="ts">
  import { RouteRecordRaw } from 'vue-router'
  import MenuItem from './MenuItem.vue'

  interface Props {
    route: RouteRecordRaw
  }
  defineProps<Props>()
</script>
<style lang="scss" scoped></style>
