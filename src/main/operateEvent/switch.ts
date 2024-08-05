import { ipcMain, IpcMainEvent } from 'electron'
import { ElectronWindowType } from '../window/modules/window-type'
import WindowFactory from '../window/windowFactory'
import { WinObj } from '..'

// 切换窗口
export function switchWindow(winObj: WinObj) {
  ipcMain.on('switch:window', (_event: IpcMainEvent, winType: ElectronWindowType) => {
    if (winObj.win) {
      winObj.win.close()
    }
    winObj.win = WindowFactory.createWindow(winType)
  })
}
