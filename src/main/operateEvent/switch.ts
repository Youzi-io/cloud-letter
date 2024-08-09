import { ipcMain, IpcMainEvent } from 'electron'
import { WindowType } from '../window/modules/window-type'
import WindowFactory from '../window/windowFactory'
import { WinMap } from '..'

// 切换窗口
export function switchWindow(winMap: WinMap) {
  ipcMain.on('switch:window', (_: IpcMainEvent, winType: WindowType, closeWinType: WindowType) => {
    if (winMap.get(closeWinType)) {
      const win = winMap.get(closeWinType)?.getWindow()
      if (win) {
        win.close()
        winMap.delete(winType)
      }
    }
    winMap.set(winType, WindowFactory.createWindow(winType))
  })
}
