import { ipcRenderer } from 'electron'

export function minimizeWindow() {
  ipcRenderer.send('minimize:window')
}
