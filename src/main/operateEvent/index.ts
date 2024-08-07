import { closeWindow, hideWindow, quitApp } from './close'
import { WinObj } from '..'
import { ipcMain, IpcMainInvokeEvent } from 'electron'
import { switchWindow } from './switch'
import { minimizeWindow } from './minimize'
import { maximizeWindow } from './maximize'

export default function initOperateEvent(winObj: WinObj) {
  quitApp()
  closeWindow(winObj)
  switchWindow(winObj)
  minimizeWindow(winObj)
  maximizeWindow(winObj)
  hideWindow(winObj)

  let token: string | null = null
  ipcMain.handle('push:transfer:data', async (_event: IpcMainInvokeEvent, data: string) => {
    console.log(data)

    token = data
  })
  ipcMain.handle('pull:transfer:data', async () => {
    return token
  })
}
