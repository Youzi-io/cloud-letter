import { ipcMain, app } from 'electron'
import { WinObj } from '..'

// 关闭app
export function quitApp() {
  ipcMain.on('quit:application', () => {
    app.quit()
  })
}

// 关闭窗口
export function closeWindow(winObj: WinObj) {
  ipcMain.on('close:window', () => {
    if (winObj.win) {
      winObj.win.close()
    }
  })
}
