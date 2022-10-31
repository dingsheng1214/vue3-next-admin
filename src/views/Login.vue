<template>
  <div class="login-container">
    <el-form>
      <div class="title-container">
        <h3 class="title">用户登录</h3>
      </div>
      <el-form-item>
        <span class="svg-container">
          <el-icon>
            <Avatar />
          </el-icon>
        </span>
        <el-input placeholder="username" name="username" type="text"></el-input>
      </el-form-item>
      <el-form-item>
        <span class="svg-container">
          <el-icon>
            <Avatar />
          </el-icon>
        </span>
        <el-input placeholder="password" name="password"></el-input>
        <span class="show-pwd">
          <el-icon>
            <Avatar />
          </el-icon>
        </span>
      </el-form-item>

      <el-button type="primary">登录</el-button>
    </el-form>
  </div>
</template>

<script setup lang="ts">
  import { Avatar } from '@element-plus/icons-vue'
  import { useRouter } from 'vue-router'
  import { useUserStore } from '@/store'

  const userStore = useUserStore()
  const router = useRouter()
  const handleLogin = () => {
    userStore.setUserInfo({
      userId: '1',
      username: 'tony',
      realName: 'tony',
      avatar: 'avatar',
    })
    router.push({
      path: '/home',
    })
  }
</script>

<style lang="scss"></style>
