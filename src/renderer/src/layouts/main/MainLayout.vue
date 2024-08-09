<template>
  <div class="main">
    <div class="side">
      <el-avatar shape="square" :size="38" :src="squareUrl" />
      <!-- 功能菜单 -->
      <div class="menu">
        <!-- 菜单 -->
        <div
          v-for="(item, index) in menuList"
          :key="index"
          class="menu-item menu-item--hover"
          @click="menuClick(item.path)"
        >
          <el-tooltip
            :content="item.title"
            placement="right"
            effect="light"
            :show-arrow="false"
            :show-after="1000"
          >
            <MSIcon
              :name="item.icon"
              :size="item.size"
              :class="{ 'menu-item-icon--active': Route.path == item.path }"
            />
          </el-tooltip>
        </div>
      </div>
      <!-- 设置 -->
      <div class="submenu">
        <div class="submenu-item submenu-item--hover">
          <MSIcon name="Menu" size="20" />
        </div>
      </div>
    </div>
    <div class="content">
      <div class="top">
        <div class="top-operation">
          <!-- 最小化按钮 -->
          <div class="base" @click="minimizeWindow">
            <MSIcon name="Remove" size="20" />
          </div>
          <!-- 最大化按钮 -->
          <div class="base" @click="maximizeWindow">
            <MSIcon name="Rectangle" size="20" />
          </div>
          <!-- 隐藏窗口按钮 -->
          <div class="close-bold" @click="hideWindow">
            <MSIcon name="Close" size="20" />
          </div>
        </div>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import MSIcon from '@renderer/components/MSIcon/index.vue'
import { useRoute, useRouter } from 'vue-router'
import { WindowType } from '@main/window/modules/window-type'

const { IMinimizeWindow, IMaximizeWindow, IHideWindow } = window.api

const squareUrl = ref('http://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png')

const Route = useRoute()
const Router = useRouter()

const menuList = ref([
  {
    title: '会话',
    icon: 'Chat_Bubble',
    path: '/session',
    size: 20
  },
  {
    title: '联系人',
    icon: 'Person',
    path: '/contact',
    size: 26
  }
])

// 最小化
const minimizeWindow = (): void => {
  IMinimizeWindow(WindowType.Main)
}

// 最大化
const maximizeWindow = (): void => {
  IMaximizeWindow(WindowType.Main)
}

// 隐藏窗口
const hideWindow = (): void => {
  IHideWindow(WindowType.Main)
}

const menuClick = (path: string): void => {
  Router.push(path)
}

onMounted(() => {})
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  height: 100%;
  -webkit-app-region: drag;
}

.side {
  width: 54px;
  height: 100%;
  background-color: #409eff;
  display: flex;
  flex-direction: column;
  align-items: center;

  .el-avatar {
    user-select: none;
    -webkit-app-region: no-drag;
    margin: 38px 0 0;
  }

  .menu {
    flex: 1;
    margin: 30px 0 0;
  }
  .submenu {
    margin: 0 0 20px;
  }

  .menu,
  .submenu {
    width: 38px;
    display: flex;
    flex-direction: column;
    user-select: none;

    &-item {
      width: 100%;
      height: 38px;
      display: flex;
      justify-content: center;
      align-items: center;
      -webkit-app-region: no-drag;
      transition: all 0.3s;
      cursor: pointer;
      margin: 5px 0;
      border-radius: 5px;

      .m-s-icon {
        color: #fff;
      }

      &--hover {
        &:hover {
          background-color: rgba($color: #c4c4c4, $alpha: 0.3);
        }
      }

      &-icon--active {
        font-variation-settings:
          'FILL' 1,
          'wght' 400,
          'GRAD' 0,
          'opsz' 20;
      }
    }
  }
}

// 内容
.content {
  flex: 1;
  position: relative;
}

// 顶部
.top {
  position: absolute;
  right: 0;
  top: 0;
  z-index: 9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 26px;
  user-select: none;
  -webkit-app-region: no-drag;

  &-title {
    flex: 1;
    width: 100%;
    height: 100%;
    line-height: 26px;
    -webkit-app-region: drag;
    color: rgb(121, 121, 121);
    font-size: 14px;
    padding-left: 10px;
  }

  &-operation {
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

      &.base:hover {
        background-color: #e8e8e8;
      }
      &.close-bold:hover {
        background-color: #fb7373;
        color: #fff;
      }
    }
  }
}
</style>
