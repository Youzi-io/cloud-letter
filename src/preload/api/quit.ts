import { ipcRenderer } from 'electron'

// 关闭app
export function quitApp() {
  ipcRenderer.send('quit:application')
}
