import { ipcMain, app } from 'electron'
import { WinMap } from '..'
import { WindowType } from '@main/window/modules/window-type'

// 关闭app
export function quitApp() {
  ipcMain.on('quit:application', () => {
    app.quit()
  })
}

// 关闭窗口
export function closeWindow(winMap: WinMap) {
  ipcMain.on('close:window', (_, winType: WindowType) => {
    if (winMap.get(winType)) {
      const win = winMap.get(winType)?.getWindow()
      if (win) {
        win.close()
        winMap.delete(winType)
      }
    }
  })
}

// 隐藏窗口
export function hideWindow(winMap: WinMap) {
  ipcMain.on('hide:window', (_, winType: WindowType) => {
    if (winMap.get(winType)) {
      const win = winMap.get(winType)?.getWindow()
      if (win) {
        win.hide()
      }
    }
  })
}
