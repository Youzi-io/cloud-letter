import { ipcRenderer } from 'electron'
import { WindowType } from '../../main/window/modules/window-type'

// 切换窗口
export function switchWindow(winType: WindowType, closeWinType: WindowType) {
  ipcRenderer.send('switch:window', winType, closeWinType)
}
