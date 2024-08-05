import { ipcMain } from 'electron'
import { WinObj } from '..'

export function minimizeWindow(winObj: WinObj) {
  ipcMain.on('minimize:window', () => {
    if (winObj.win) {
      const win = winObj.win.getWindow()
      win && win.minimize()
    }
  })
}
