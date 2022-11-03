<template>
  <el-dropdown class="language-wrapper" @command="handleLanguageChange" trigger="click">
    <span class="el-dropdown-link">
      <el-tooltip :content="$t('msg.navBar.lang')">
        <div>
          <svg-icon id="guide-lang" icon="language" className="language-icon" />
        </div>
      </el-tooltip>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :disabled="language === 'zh'" command="zh">中文</el-dropdown-item>
        <el-dropdown-item :disabled="language === 'en'" command="en">English</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script setup lang="ts">
  import { computed } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useAppStore } from '@/store'

  const i18n = useI18n()
  const appStore = useAppStore()

  const language = computed(() => appStore.language)
  const handleLanguageChange = (command: string) => {
    i18n.locale.value = command
    appStore.selectLanguage(command)
  }
</script>
<style lang="scss" scoped>
  :global(.language-icon) {
    width: 25px !important;
    height: 25px !important;
  }
  .language-wrapper {
    cursor: pointer;
  }
</style>
