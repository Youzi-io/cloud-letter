import { ipcMain } from 'electron'
import { WinMap } from '..'
import { WindowType } from '@main/window/modules/window-type'

export function maximizeWindow(winMap: WinMap) {
  ipcMain.on('maximize:window', (_, winType: WindowType) => {
    if (winMap.get(winType)) {
      const win = winMap.get(winType)?.getWindow()
      if (win) {
        win.isMaximized() ? win.unmaximize() : win.maximize()
      }
    }
  })
}
