<template>
  <div class="search-wrapper" @click="handleOpen" id="guide-search">
    <svg-icon icon="search" className="search-icon" />
  </div>

  <el-dialog v-model="dialogVisible" width="30%" :show-close="false" :before-close="handleClose">
    <el-input v-model="query" @input="querySearch" clearable>
      <template #prepend>
        <el-button :icon="Search" />
      </template>
    </el-input>
    <el-scrollbar height="200px">
      <div class="option-wrapper" v-if="searchOptions.length">
        <div
          v-for="option in searchOptions"
          :key="option.refIndex"
          class="option"
          @click="go(option.item.path)"
        >
          <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item v-for="(item, index) in option.item.title" :key="index">
              {{ item }}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
      <div v-else>
        <el-empty description="暂无搜索结果">
          <template #image>
            <div></div>
          </template>
        </el-empty>
      </div>
    </el-scrollbar>
  </el-dialog>
</template>
<script setup lang="ts">
  import { Search, ArrowRight } from '@element-plus/icons-vue'
  import { useRouter } from 'vue-router'
  import { computed, ref } from 'vue'
  import Fuse from 'fuse.js'
  import { filterRoutes, generateMenus, generateSearchPool } from '@/assets/js/utils/route'
  import { SearchPoolItem } from '#/sys'

  const router = useRouter()
  const searchPool = computed(() => {
    return generateSearchPool(generateMenus(filterRoutes(router.getRoutes())))
  })

  /**
   * 搜索对话框相关
   */
  // 搜索结果
  const searchOptions = ref<Fuse.FuseResult<SearchPoolItem>[]>([])
  const dialogVisible = ref(false)
  const query = ref('')
  const handleOpen = () => {
    dialogVisible.value = true
  }
  const handleClose = () => {
    query.value = ''
    searchOptions.value = []
    dialogVisible.value = false
  }
  const go = (path: string) => {
    router.push(path)
    dialogVisible.value = false
  }
  /**
   * 搜索库相关
   */
  const fuse = new Fuse(searchPool.value, {
    // 是否按优先级进行排序
    shouldSort: true,
    // 匹配长度超过这个值的才会被认为是匹配的
    minMatchCharLength: 1,
    // 将被搜索的键列表。 这支持嵌套路径、加权搜索、在字符串和对象数组中搜索。
    // name：搜索的键
    // weight：对应的权重
    keys: [
      {
        name: 'title',
        weight: 0.7,
      },
      {
        name: 'path',
        weight: 0.3,
      },
    ],
  })
  // 搜索方法
  const querySearch = () => {
    if (query.value !== '') {
      searchOptions.value = fuse.search(query.value)
    } else {
      searchOptions.value = []
    }
    console.log('searchOptions', searchOptions)
  }
</script>
<style lang="scss" scoped>
  :global(.search-icon) {
    width: 25px !important;
    height: 25px !important;
  }
  .search-wrapper {
    cursor: pointer;
  }

  :deep(.el-dialog .el-dialog__header) {
    display: none;
  }
  .option-wrapper {
    .option {
      cursor: pointer;
      box-sizing: border-box;
      margin-top: 10px;
      padding: 10px;
      border-radius: 2px;
      border: 1px solid #c6e2ff;
      &:hover {
        background-color: #409eff;
      }
    }
  }
</style>
