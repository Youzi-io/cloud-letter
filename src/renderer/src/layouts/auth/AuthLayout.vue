<template>
  <div class="window">
    <!-- 顶部 -->
    <div class="top">
      <div class="top_title">云涵</div>
      <div class="top_operation">
        <!-- 最小化按钮 -->
        <div class="remove">
          <MSIcon name="Remove" size="20" />
        </div>
        <!-- 退出按钮 -->
        <div class="close-bold" @click="closeWindow">
          <MSIcon name="Close" size="20" />
        </div>
      </div>
    </div>
    <!-- 内容区 -->
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import MSIcon from '@renderer/components/MSIcon/index.vue'
const { ipcRenderer } = window.electron

// 关闭窗口
const closeWindow = (): void => {
  ipcRenderer.send('quit:application')
}
</script>

<style lang="scss" scoped>
// 窗口大小
.window {
  width: 400px;
  height: 600px;
  overflow: hidden;
}

// 顶部
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 26px;
  user-select: none;

  &_title {
    flex: 1;
    width: 100%;
    height: 100%;
    line-height: 26px;
    -webkit-app-region: drag;
    color: rgb(121, 121, 121);
    font-size: 14px;
    padding-left: 10px;
  }

  &_operation {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    > div {
      width: 34px;

      flex-grow: 1;
      cursor: pointer;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgb(121, 121, 121);
      font-size: 14px;
      transition: all 0.3s;

      &.remove:hover {
        background-color: #e8e8e8;
      }
      &.close-bold:hover {
        background-color: #fb7373;
        color: #fff;
      }
    }
  }
}

// 内容区
.content {
  width: 100%;
  height: 100%;
}
</style>
