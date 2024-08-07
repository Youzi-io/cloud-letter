import { ipcRenderer } from 'electron'

export function hideWindow() {
  ipcRenderer.send('hide:window')
}
