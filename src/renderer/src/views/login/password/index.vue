<template>
  <div class="login-password">
    <el-form ref="loginFormRef" style="width: 274px" :model="loginForm" :rules="rules">
      <el-form-item prop="account">
        <el-input
          v-model="loginForm.account"
          type="text"
          autocomplete="off"
          placeholder="账号/手机号/邮箱"
          :input-style="loginInputStyle"
        >
          <template #prefix> <MSIcon name="Person" size="20" /> </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          autocomplete="off"
          placeholder="密码"
          :input-style="loginInputStyle"
        >
          <template #prefix> <MSIcon name="Lock" size="20" /> </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="loginBtnLoading" @click="loginSubmit(loginFormRef)">
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { FormInstance, FormRules } from 'element-plus'
import MSIcon from '@renderer/components/MSIcon/index.vue'
import { ref } from 'vue'
import { PASSWORD_REGEX } from '@renderer/constants/regex'

const { ipcRenderer } = window.electron

const loginInputStyle = { height: '50px', fontSize: '18px' }

const loginBtnLoading = ref(false)

const loginFormRef = ref<FormInstance>()

const loginForm = ref({
  account: '',
  password: ''
})

const validatePass = (_rule, value: string, callback: (error?: Error) => void) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else if (!PASSWORD_REGEX.test(value)) {
    callback(new Error('密码不小于6位不超过26位,并且由字母和数字组成'))
  } else {
    callback()
  }
}

const rules = ref<FormRules<typeof loginForm>>({
  account: [{ required: true, message: '请输入账号/手机号/邮箱', trigger: 'blur' }],
  password: [{ validator: validatePass, trigger: 'blur' }]
})

// 登录
const loginSubmit = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      loginBtnLoading.value = true
      setTimeout(() => {
        loginBtnLoading.value = false
        // 跳转窗口
        ipcRenderer.invoke('push:transfer:data', 'a11111111')
        ipcRenderer.send('switch:window', 'main')
      }, 3000)
      console.log('submit!')
    } else {
      console.log('error submit!')
    }
  })
}
</script>

<style lang="scss" scoped>
.login-password {
  text-align: center;
  .el-form {
    &-item {
      margin-bottom: 20px;

      .el-button {
        width: 100%;
        height: 50px;
        font-size: 20px;
      }

      &:nth-child(2) {
        margin-bottom: 60px;
      }
      &:nth-child(3) {
        margin-bottom: 10px;
      }
    }
  }
}
</style>
