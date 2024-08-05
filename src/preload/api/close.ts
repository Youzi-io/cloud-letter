import { ipcRenderer } from 'electron'

// 关闭窗口
export function closeWindow() {
  ipcRenderer.send('close:window')
}
