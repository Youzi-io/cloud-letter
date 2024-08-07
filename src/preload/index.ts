import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { switchWindow } from './api/switch'
import { quitApp } from './api/quit'
import { minimizeWindow } from './api/minimize'
import { maximizeWindow } from './api/maximize'
import { closeWindow } from './api/close'
import { hideWindow } from './api/hide'

// Custom APIs for renderer
const api = {
  ISwitchWindow: switchWindow,
  IQuitApp: quitApp,
  IMinimizeWindow: minimizeWindow,
  IMaximizeWindow: maximizeWindow,
  ICloseWindow: closeWindow,
  IHideWindow: hideWindow
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
