<template>
  <div class="tags-view-container">
    <div
      v-for="(tag, idx) in tagViews"
      :key="tag.path"
      class="tag-item"
      :class="{ active: isActiveTag(tag.path) }"
      @click="go(tag.path)"
      @contextmenu.prevent="(e: MouseEvent) => openContextMenu(e, idx)"
    >
      {{ tag.title }}
      <el-icon class="close-icon" @click.stop="removeTag(idx, tag)"><Close /></el-icon>
    </div>
    <div class="context-menu" :style="contextMenuStyle" v-if="contextMenuShow">
      <span @click="refresh">刷新</span>
      <span @click="closeRight">关闭右侧</span>
      <span @click="closeOther">关闭其它</span>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { Close } from '@element-plus/icons-vue'
  import { computed, ref, unref, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useAppStore } from '@/store'
  import { TagView } from '#/sys'

  const appStore = useAppStore()
  const route = useRoute()
  const router = useRouter()
  const tagViews = computed(() => appStore.tagViews)
  const isActiveTag = (path: string) => path === route.path

  const afterRemoveTag = () => {
    if (tagViews.value.length) {
      router.push(tagViews.value[tagViews.value.length - 1].path)
    } else {
      router.push('/')
    }
  }
  const removeTag = (idx: number, tag: TagView) => {
    appStore.removeTagView(idx)
    if (tag.path === route.path) {
      afterRemoveTag()
    }
  }

  const go = (path: string) => {
    router.push(path)
  }

  /**
   * 右键相关
   */
  const contextMenuStyle = ref({ left: '0px' })
  const contextMenuShow = ref(false)
  const currentClickTag = ref(0)
  const openContextMenu = (e: MouseEvent, index: number) => {
    contextMenuShow.value = true
    currentClickTag.value = index
    const div = e.target as HTMLDivElement
    const offsetLeft = div.offsetLeft || 0
    const clientWidth = div.clientWidth || 0
    contextMenuStyle.value = {
      left: `${offsetLeft + clientWidth / 2}px`,
    }
  }
  const reset = () => {
    currentClickTag.value = 0
    contextMenuShow.value = false
  }
  const refresh = () => {
    router.go(0)
    reset()
  }
  const closeOther = () => {
    appStore.removeTagView(unref(currentClickTag), 'other')
    reset()
    afterRemoveTag()
  }
  const closeRight = () => {
    appStore.removeTagView(unref(currentClickTag), 'right')
    reset()
    afterRemoveTag()
  }

  watch(contextMenuShow, (val) => {
    if (val) {
      document.body.addEventListener('click', reset)
    } else {
      document.body.removeEventListener('click', reset)
    }
  })
</script>
<style lang="scss" scoped>
  .tags-view-container {
    display: flex;
    align-items: center;
    height: $tagViewsHeight;
    box-sizing: border-box;
    border-bottom: 1px solid #d8dce5;
    position: relative;
    .tag-item {
      height: 26px;
      font-size: 12px;
      border: 1px solid #d8dce5;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 5px;
      margin-left: 5px;
      cursor: pointer;
      .close-icon {
        margin-left: 4px;
        &:hover {
          background-color: #d8dce5;
          border-radius: 50%;
        }
      }
    }
    .context-menu {
      margin: 0;
      background: #fff;
      z-index: 3000;
      position: absolute;
      list-style-type: none;
      padding: 5px 0;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 400;
      color: #333;
      box-shadow: 2px 2px 3px 0 rgb(0 0 0 / 30%);
      display: flex;
      flex-direction: column;
      top: 17px;
      span {
        margin: 0;
        padding: 7px 16px;
        cursor: pointer;
        &:hover {
          background: #eee;
        }
      }
    }
    .active {
      background-color: #42b983;
      color: #fff;
      border-color: #42b983;
    }
  }
</style>
