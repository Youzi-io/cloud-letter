import { ipcRenderer } from 'electron'
import { WindowType } from '../../main/window/modules/window-type'

// 关闭窗口
export function closeWindow(winType: WindowType) {
  ipcRenderer.send('close:window', winType)
}
