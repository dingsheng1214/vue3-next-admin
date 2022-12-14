<template>
  <div class="login-container">
    <el-form class="login-form" ref="loginFormRef" :model="loginForm" :rules="loginRules">
      <div class="title-container">
        <h3 class="title">{{ $t('msg.login.title') }}</h3>
        <div class="lang-container">
          <LangSelect />
        </div>
      </div>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon="https://res.lgdsunday.club/user.svg" />
        </span>
        <el-input
          placeholder="username"
          name="username"
          type="text"
          v-model="loginForm.username"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon="password" />
        </span>
        <el-input
          placeholder="password"
          name="password"
          :type="showPwd ? 'text' : 'password'"
          v-model="loginForm.password"
        ></el-input>
        <span class="show-pwd" @click="showPwd = !showPwd">
          <svg-icon icon="eye-open" v-if="showPwd" />
          <svg-icon icon="eye" v-else />
        </span>
      </el-form-item>

      <el-button class="login-btn" type="primary" @click="handleLogin">{{
        $t('msg.login.loginBtn')
      }}</el-button>
    </el-form>
  </div>
</template>

<script setup lang="ts">
  import { FormInstance } from 'element-plus'
  import { computed, ref, unref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useI18n } from 'vue-i18n'
  import LangSelect from '@/components/LangSelect/index.vue'
  import { useUserStore } from '@/store'

  const userStore = useUserStore()
  const router = useRouter()
  const i18n = useI18n()

  const loginFormRef = ref<FormInstance>()
  const loginForm = ref({
    username: 'super-admin',
    password: '123456',
  })
  const loginRules = computed(() => ({
    username: [{ required: true, trigger: 'blur', message: i18n.t('msg.login.usernameRule') }],
    password: [{ required: true, trigger: 'blur', message: i18n.t('msg.login.passwordRule') }],
  }))
  const showPwd = ref(false)
  const loading = ref(false)

  const handleLogin = () => {
    loading.value = true
    unref(loginFormRef)?.validate(async (validate) => {
      if (validate) {
        try {
          await userStore.login({ ...unref(loginForm) })
          router.push('/')
        } catch (err) {
          console.log(err)
        } finally {
          loading.value = false
        }
      }
    })
  }
</script>

<style lang="scss" scoped>
  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #eee;
  $cursor: #fff;

  .login-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;

    .login-form {
      position: relative;
      width: 520px;
      max-width: 100%;
      padding: 160px 35px 0;
      margin: 0 auto;
      overflow: hidden;

      :deep(.el-form-item) {
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        color: #454545;
      }

      :deep(.el-input) {
        display: inline-block;
        height: 47px;
        width: 85%;

        .el-input__wrapper {
          width: 100%;
          background-color: transparent;
          box-shadow: 0 0 0 1px transparent;
        }
        input {
          background: transparent;
          border: 0px;
          border-radius: 0px;
          padding: 12px 5px 12px 15px;
          color: $light_gray;
          height: 47px;
          caret-color: $cursor;
        }
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      display: inline-block;
    }

    .title-container {
      position: relative;

      .title {
        font-size: 26px;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
      .lang-container {
        position: absolute;
        right: 0;
        top: 0;
        cursor: pointer;
      }
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }

    .login-btn {
      width: 100%;
    }
  }
</style>
