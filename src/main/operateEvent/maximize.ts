import { ipcMain } from 'electron'
import { WinObj } from '..'

export function maximizeWindow(winObj: WinObj) {
  ipcMain.on('maximize:window', () => {
    if (winObj.win) {
      const win = winObj.win.getWindow()
      if (win) {
        win.isMaximized() ? win.unmaximize() : win.maximize()
      }
    }
  })
}
