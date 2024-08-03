<template>
  <div class="register">
    <div class="title">欢迎注册！</div>
    <el-form ref="registerFormRef" style="width: 274px" :model="registerForm" :rules="rules">
      <el-form-item prop="account">
        <el-input
          v-model="registerForm.account"
          type="text"
          autocomplete="off"
          placeholder="账号"
          :input-style="registerInputStyle"
        >
          <template #prefix> <MSIcon name="Person" size="20" /> </template>
        </el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          v-model="registerForm.password"
          type="password"
          autocomplete="off"
          placeholder="密码"
          :input-style="registerInputStyle"
        >
          <template #prefix> <MSIcon name="Lock" size="20" /> </template>
        </el-input>
      </el-form-item>

      <el-form-item prop="checkPassword">
        <el-input
          v-model="registerForm.checkPassword"
          type="password"
          autocomplete="off"
          placeholder="确认密码"
          :input-style="registerInputStyle"
        >
          <template #prefix> <MSIcon name="Lock" size="20" /> </template>
        </el-input>
      </el-form-item>

      <el-form-item prop="phone">
        <el-input
          v-model="registerForm.phone"
          type="text"
          autocomplete="off"
          placeholder="手机号"
          :input-style="registerInputStyle"
        >
          <template #prefix> <MSIcon name="Phone_iPhone" size="20" /> </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input
          v-model="registerForm.code"
          type="text"
          autocomplete="off"
          placeholder="验证码"
          :input-style="registerInputStyle"
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
        <el-button
          type="primary"
          :loading="registerBtnLoading"
          @click="registerSubmit(registerFormRef)"
        >
          注册
        </el-button>
      </el-form-item>
    </el-form>

    <el-link type="primary" @click="returnToLogin">返回登录</el-link>
  </div>
</template>

<script setup lang="ts">
import { PASSWORD_REGEX, PHONE_NUMBER_REGEX } from '@renderer/constants/regex'
import { useCountDown } from '@renderer/hooks/useCountDown'
import { FormInstance, FormRules } from 'element-plus'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const registerInputStyle = { height: '50px', fontSize: '18px' }

const registerBtnLoading = ref(false)

const registerFormRef = ref<FormInstance>()

const registerForm = ref({
  account: '',
  password: '',
  checkPassword: '',
  phone: '',
  code: ''
})

const { promptText, isStatus, countDown } = useCountDown('获取验证码')

const validatePass = (_rule, value: string, callback: (error?: Error) => void) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else if (!PASSWORD_REGEX.test(value)) {
    callback(new Error('密码不小于6位不超过26位,并且由字母和数字组成'))
  } else {
    if (registerForm.value.checkPassword) {
      if (registerFormRef.value) {
        registerFormRef.value.validateField('checkPassword')
      }
    }
    callback()
  }
}

const validateConfirmPass = (_rule, value: string, callback: (error?: Error) => void) => {
  if (value === '') {
    callback(new Error('请输入确认密码'))
  } else if (value !== registerForm.value.password) {
    callback(new Error('两次密码不一致'))
  } else {
    callback()
  }
}

const validatePhone = (_rule, value: string, callback: (error?: Error) => void) => {
  if (value === '') {
    callback(new Error('请输入手机号'))
  } else if (!PHONE_NUMBER_REGEX.test(value)) {
    callback(new Error('请输入正确的手机号'))
  } else {
    callback()
  }
}

const rules = ref<FormRules<typeof registerForm>>({
  account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ validator: validatePass, trigger: 'blur' }],
  checkPassword: [{ validator: validateConfirmPass, trigger: 'blur' }],
  phone: [{ validator: validatePhone, trigger: 'blur' }],
  code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
})

const Router = useRouter()

const sendCode = () => {
  if (registerForm.value.phone) {
    countDown()
  } else {
    if (registerFormRef.value) {
      registerFormRef.value.validateField('phone')
    }
  }
}

const returnToLogin = () => {
  Router.replace('/login')
}

// 注册
const registerSubmit = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      registerBtnLoading.value = true
      setTimeout(() => {
        ElMessage({
          message: '注册成功！',
          type: 'success',
          duration: 1000
        })
        registerBtnLoading.value = false
        returnToLogin()
      }, 3000)
    } else {
      console.log('error submit!')
    }
  })
}
</script>

<style lang="scss" scoped>
.register {
  display: flex;
  flex-direction: column;
  align-items: center;
  user-select: none;

  .title {
    margin: 24px 0 35px 0;
    font-size: 20px;
    color: #409eff;
  }

  .el-form {
    &-item {
      margin-bottom: 20px;

      .area-code {
        width: 80px;
        height: 50px;
        font-size: 16px;

        :deep(.el-select__wrapper) {
          height: 100%;
        }
      }

      &:nth-child(5) {
        margin-bottom: 0;
      }

      &:last-child {
        margin: 36px 0 15px 0;
      }

      .el-button {
        width: 100%;
        height: 50px;
        font-size: 20px;
      }
    }
  }

  .el-link {
    font-size: 16px;
    text-align: center;
    width: 80px;
  }
}
</style>
