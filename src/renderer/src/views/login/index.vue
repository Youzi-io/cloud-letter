<template>
  <div>
    <span class="material-symbols-outlined"> Person </span>
    <button @click="switchWindow">切换窗口</button>
  </div>
</template>

<script setup lang="ts">
const { ipcRenderer } = window.electron

// 切换窗口
const switchWindow = () => {
  ipcRenderer.invoke('push:transfer:data', 'a11111111')
  ipcRenderer.send('switch:window', 'main')
}
</script>

<style lang="scss" scoped></style>
