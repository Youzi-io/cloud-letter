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

// 隐藏窗口
export function hideWindow(winObj: WinObj) {
  ipcMain.on('hide:window', () => {
    if (winObj.win) {
      const win = winObj.win.getWindow()
      if (win) {
        win.hide()
      }
    }
  })
}
