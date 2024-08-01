<template>
  <div class="login">
    <el-avatar shape="square" :size="100" :src="squareUrl" />
    <Password v-if="loginMethod === LoginMethodEnum.Password" />
    <Code v-if="loginMethod === LoginMethodEnum.Code" />

    <el-link
      v-show="loginMethod === LoginMethodEnum.Password"
      type="primary"
      @click="switchLoginMethod(LoginMethodEnum.Code)"
      >验证码登录</el-link
    >
    <el-link
      v-show="loginMethod === LoginMethodEnum.Code"
      type="primary"
      @click="switchLoginMethod(LoginMethodEnum.Password)"
      >密码登录</el-link
    >
    <el-link v-show="loginMethod === LoginMethodEnum.Password" type="primary" @click="goToRegister"
      >还没有账号？注册</el-link
    >
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Password from './password/index.vue'
import Code from './code/index.vue'
import { useRouter } from 'vue-router'

const squareUrl = ref('http://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png')

const loginMethod = ref(LoginMethodEnum.Password)

const Router = useRouter()

const switchLoginMethod = (data: LoginMethodEnum) => {
  loginMethod.value = data
}

const goToRegister = () => {
  Router.replace('/register')
}
</script>
<script lang="ts">
enum LoginMethodEnum {
  Password = 'password',
  Code = 'code'
}
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  align-items: center;
  flex-direction: column;
  user-select: none;

  .el-avatar {
    margin: 64px 0 67px 0;
  }

  .el-link {
    font-size: 16px;
    margin-bottom: 10px;
  }
}
</style>
