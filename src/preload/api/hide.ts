import { ipcRenderer } from 'electron'
import { WindowType } from '../../main/window/modules/window-type'

export function hideWindow(winType: WindowType) {
  ipcRenderer.send('hide:window', winType)
}
