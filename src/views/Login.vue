<template>
  <div>
    <div>Login</div>
    <button @click="handleLogin">登录</button>
  </div>
</template>

<script setup lang="ts">
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
