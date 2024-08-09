import { closeWindow, hideWindow, quitApp } from './close'
import { WinMap } from '..'
import { ipcMain, IpcMainInvokeEvent } from 'electron'
import { switchWindow } from './switch'
import { minimizeWindow } from './minimize'
import { maximizeWindow } from './maximize'

export default function initOperateEvent(winMap: WinMap) {
  quitApp()
  closeWindow(winMap)
  switchWindow(winMap)
  minimizeWindow(winMap)
  maximizeWindow(winMap)
  hideWindow(winMap)

  let token: string | null = null
  ipcMain.handle('push:transfer:data', async (_event: IpcMainInvokeEvent, data: string) => {
    console.log(data)

    token = data
  })
  ipcMain.handle('pull:transfer:data', async () => {
    return token
  })
}
