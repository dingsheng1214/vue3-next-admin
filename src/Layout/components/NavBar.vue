<template>
  <div class="navbar">
    <div class="right-menu">
      <div class="avatar-container">
        <el-dropdown>
          <div class="avatar-wrapper">
            <el-avatar shape="square" :src="userInfo.avatar" />
            <el-icon><CaretBottom /></el-icon>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item>首页</el-dropdown-item>
              <el-dropdown-item>项目地址</el-dropdown-item>
              <el-dropdown-item divided @click="handleLogout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { CaretBottom } from '@element-plus/icons-vue'
  import { computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { useUserStore } from '@/store'

  const router = useRouter()
  const userStore = useUserStore()
  const userInfo = computed(() => userStore.userInfo)
  const handleLogout = () => {
    userStore.logout()
    router.push('/login')
  }
</script>
<style lang="scss" scoped>
  .navbar {
    height: $navbarHeight;
    background-color: $color-background;
    position: relative;
    box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
    overflow: hidden;
    padding: 0 20px;
    .right-menu {
      height: 100%;
      float: right;
      display: flex;
      align-items: center;
      .avatar-container {
        cursor: pointer;
      }
    }
  }
</style>
