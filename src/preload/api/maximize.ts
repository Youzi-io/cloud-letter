import { ipcRenderer } from 'electron'
import { WindowType } from '../../main/window/modules/window-type'

export function maximizeWindow(winType: WindowType) {
  ipcRenderer.send('maximize:window', winType)
}
