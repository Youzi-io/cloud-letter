<template>
  <div class="base-container">
    <div class="aside" :style="{ minWidth: `${asideWidth}px` }">
      <slot name="aside"></slot>
      <div class="drag" @mousedown="mouseDown"></div>
    </div>
    <div class="main">
      <slot name="main"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const minWidth = ref(160)
const maxWidth = ref(340)
const asideWidth = ref(250)
const isResizing = ref(false)
const startX = ref(0)

const mouseDown = (e: MouseEvent) => {
  isResizing.value = true
  startX.value = e.clientX
  document.addEventListener('mousemove', mouseMove)
  document.addEventListener('mouseup', mouseUp)
}
const mouseMove = (e: MouseEvent) => {
  if (isResizing.value) {
    requestAnimationFrame(() => {
      const offsetX = e.clientX - startX.value
      const width = asideWidth.value + offsetX
      if (width < minWidth.value) {
        asideWidth.value = minWidth.value
      } else if (width > maxWidth.value) {
        asideWidth.value = maxWidth.value
      } else {
        asideWidth.value = width
      }
      startX.value = e.clientX
    })
  }
}

const mouseUp = () => {
  isResizing.value = false
  document.removeEventListener('mousemove', mouseMove)
  document.removeEventListener('mouseup', mouseUp)
}
</script>

<style lang="scss" scoped>
.base-container {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.aside {
  height: 100%;
  border-right: 1px solid rgba($color: #d6d6d6, $alpha: 0.5);
  box-sizing: border-box;
  position: relative;

  .drag {
    -webkit-app-region: no-drag;
    width: 3px;
    height: 100%;
    position: absolute;
    background-color: transparent;
    right: 0;
    cursor: ew-resize;
  }
}

.main {
  height: 100%;
  width: 100%;
}
</style>
