<template>
  <div class="app-main">
    <router-view v-slot="{ Component, route }">
      <transition name="fade" mode="out-in">
        <keep-alive>
          <component :is="Component" :key="route.path"></component>
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>
<script setup lang="ts">
  import { watch } from 'vue'
  import { RouteLocationNormalizedLoaded, useRoute } from 'vue-router'
  import { ROUTE_WHITE_LIST } from '@/assets/js/utils/constant'
  import { useAppStore } from '@/store'
  import { generateTitle } from '@/assets/js/utils/i18n'

  const route = useRoute()
  const appStore = useAppStore()

  const getTitle = (routeItem: RouteLocationNormalizedLoaded) => {
    let title = ''
    if (routeItem.meta) {
      title = generateTitle(routeItem.meta.title as string)
    } else {
      const pathArr = routeItem.path.split('/')
      title = pathArr[pathArr.length - 1]
    }
    return title
  }

  watch(
    route,
    (to) => {
      console.log('app-main watch')

      // 并不是所有的路由都需要保存
      if (ROUTE_WHITE_LIST.indexOf(to.path) === -1) {
        console.log(appStore.tagViews)

        appStore.setTagsView({ ...to, title: getTitle(to) })
      }
    },
    { immediate: true },
  )
</script>
<style lang="scss" scoped>
  .app-main {
    min-height: calc(100vh - $navbarHeight - $tagViewsHeight);
    width: 100%;
    position: relative;
    overflow: hidden;
    padding: 20px;
    box-sizing: border-box;
  }
</style>
