import { ipcRenderer } from 'electron'
import { WindowType } from '../../main/window/modules/window-type'

export function minimizeWindow(winType: WindowType) {
  ipcRenderer.send('minimize:window', winType)
}
