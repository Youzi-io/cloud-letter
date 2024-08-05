import { closeWindow, quitApp } from './close'
import { WinObj } from '..'
import { ipcMain, IpcMainInvokeEvent } from 'electron'
import { switchWindow } from './switch'

export default function initOperateEvent(winObj: WinObj) {
  quitApp()
  closeWindow(winObj)
  switchWindow(winObj)

  let token: string | null = null
  ipcMain.handle('push:transfer:data', async (_event: IpcMainInvokeEvent, data: string) => {
    console.log(data)

    token = data
  })
  ipcMain.handle('pull:transfer:data', async () => {
    return token
  })
}
