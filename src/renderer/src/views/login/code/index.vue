<template>
  <div class="login-code">
    <el-form ref="loginFormRef" style="width: 274px" :model="loginForm" :rules="rules">
      <el-form-item prop="phone">
        <el-input
          v-model="loginForm.phone"
          type="text"
          autocomplete="off"
          placeholder="手机号"
          :input-style="loginInputStyle"
        >
          <template #prefix> <MSIcon name="Phone_iPhone" size="20" /> </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input
          v-model="loginForm.code"
          type="text"
          autocomplete="off"
          placeholder="验证码"
          :input-style="loginInputStyle"
        >
          <template #prefix> <MSIcon name="Vpn_Key" size="20" /> </template>
          <template #suffix>
            <el-link
              class="send-code"
              type="primary"
              :underline="false"
              :disabled="isStatus"
              @click="sendCode"
              >{{ promptText }}</el-link
            >
          </template>
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
import { useCountDown } from '@renderer/hooks/useCountDown'
import { PHONE_NUMBER_REGEX } from '@renderer/constants/regex'
import { WindowType } from '@main/window/modules/window-type'

const { ISwitchWindow } = window.api

const loginInputStyle = { height: '50px', fontSize: '18px' }

const loginBtnLoading = ref(false)

const loginFormRef = ref<FormInstance>()

const loginForm = ref({
  phone: '',
  code: ''
})

const { promptText, isStatus, countDown } = useCountDown('获取验证码')
const isSendCode = ref(false)

const validatePhone = (_rule, value: string, callback: (error?: Error) => void) => {
  if (value === '') {
    isSendCode.value = false
    callback(new Error('请输入手机号'))
  } else if (!PHONE_NUMBER_REGEX.test(value)) {
    isSendCode.value = false
    callback(new Error('请输入正确的手机号'))
  } else {
    isSendCode.value = true
    callback()
  }
}

const rules = ref<FormRules<typeof loginForm>>({
  phone: [{ validator: validatePhone, trigger: 'blur' }],
  code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
})

const sendCode = () => {
  if (loginForm.value.phone && isSendCode.value) {
    countDown()
  } else {
    loginFormRef.value?.validateField('phone')
  }
}

// 登录
const loginSubmit = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      loginBtnLoading.value = true
      setTimeout(() => {
        loginBtnLoading.value = false
        // 跳转窗口
        ISwitchWindow(WindowType.Main, WindowType.Auth)
      }, 3000)
      console.log('submit!')
    } else {
      console.log('error submit!')
    }
  })
}
</script>

<style lang="scss" scoped>
.login-code {
  text-align: center;

  .el-form {
    -webkit-app-region: no-drag;

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

  .send-code {
    font-size: 16px;
    text-align: center;
    width: 80px;
  }
}
</style>
