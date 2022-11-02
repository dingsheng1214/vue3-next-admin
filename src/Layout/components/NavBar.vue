<template>
  <div class="navbar">
    <div class="left-menu">
      <!-- 侧边栏收缩按钮 -->
      <div class="collapse-wrapper" @click="triggerCollapse">
        <el-icon :size="20">
          <Expand v-if="isCollapse" />
          <Fold v-else />
        </el-icon>
      </div>

      <!-- 面包屑 -->
      <div>
        <Breadcrumb />
      </div>
    </div>

    <div class="right-menu">
      <!-- 国际化 -->
      <div class="language-container">
        <LangSelect />
      </div>
      <!-- 头像 -->
      <div class="avatar-container">
        <el-dropdown>
          <div class="avatar-wrapper">
            <el-avatar shape="square" :src="userInfo.avatar" />
            <el-icon><CaretBottom /></el-icon>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>{{ $t('msg.navBar.center') }}</el-dropdown-item>
              <el-dropdown-item>{{ $t('msg.navBar.home') }}</el-dropdown-item>
              <el-dropdown-item>{{ $t('msg.navBar.course') }}</el-dropdown-item>
              <el-dropdown-item divided @click="handleLogout">
                {{ $t('msg.navBar.logout') }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { CaretBottom, Expand, Fold } from '@element-plus/icons-vue'
  import { computed } from 'vue'
  import { useRouter } from 'vue-router'
  import Breadcrumb from '@/components/Breadcrumb/index.vue'
  import LangSelect from '@/components/LangSelect/index.vue'
  import { useUserStore, useUiStore } from '@/store'

  const router = useRouter()
  const userStore = useUserStore()
  const uiStore = useUiStore()

  const userInfo = computed(() => userStore.userInfo)
  const handleLogout = () => {
    userStore.logout()
    router.push('/login')
  }

  const isCollapse = computed(() => uiStore.sideBarCollapse)
  const triggerCollapse = uiStore.triggerSideBarCollapse
</script>
<style lang="scss" scoped>
  .navbar {
    height: $navbarHeight;
    background-color: $color-background;
    position: relative;
    box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
    overflow: hidden;
    .left-menu {
      height: 100%;
      float: left;
      display: flex;
      align-items: center;
      .collapse-wrapper {
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        &:hover {
          background: rgba(0, 0, 0, 0.1);
          cursor: pointer;
        }
      }
    }
    .right-menu {
      height: 100%;
      float: right;
      display: flex;
      align-items: center;
      margin-right: 20px;

      .language-container {
        margin-right: 10px;
      }
      .avatar-container {
        cursor: pointer;
      }
    }
  }
</style>
