import { ipcMain } from 'electron'
import { WinMap } from '..'
import { WindowType } from '@main/window/modules/window-type'

export function minimizeWindow(winMap: WinMap) {
  ipcMain.on('minimize:window', (_, winType: WindowType) => {
    if (winMap.get(winType)) {
      const win = winMap.get(winType)?.getWindow()
      if (win) {
        win.minimize()
      }
    }
  })
}
