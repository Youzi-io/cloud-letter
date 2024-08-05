import { ipcRenderer } from 'electron'

export function maximizeWindow() {
  ipcRenderer.send('maximize:window')
}
