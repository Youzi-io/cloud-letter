import { ref } from 'vue'
/**
 *
 * @param text 提示文本-默认:发送验证码
 * @param timing 倒计时-默认:59
 * @returns {
 * promptText:提示文本
 * isStatus:状态
 * countDown:倒计时方法
 * }
 */
export function useCountDown(text = '发送验证码', timing = 59) {
  const promptText = ref<string>(text)
  const isStatus = ref<boolean>(false)
  const num = ref<number>(timing)

  const countDown = () => {
    isStatus.value = true
    promptText.value = String(num.value)
    const timer = setInterval(() => {
      if (num.value <= 0) {
        num.value = timing
        isStatus.value = false
        promptText.value = text
        clearInterval(timer)
      } else {
        num.value--
        isStatus.value = true
        promptText.value = String(num.value)
      }
    }, 1000)
  }

  return {
    promptText,
    isStatus,
    countDown
  }
}
