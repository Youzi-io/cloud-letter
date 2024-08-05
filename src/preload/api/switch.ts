import { ipcRenderer } from 'electron'

// 切换窗口
export function switchWindow(winType: string) {
  ipcRenderer.send('switch:window', winType)
}
