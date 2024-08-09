import { WindowType } from './modules/window-type'
import AuthWindow from './modules/authWindow'
import MainWindow from './modules/mainWindow'

// 实现工厂方法
export default class WindowFactory {
  static createWindow(winType: string) {
    switch (winType) {
      case WindowType.Auth:
        return new AuthWindow()
      case WindowType.Main:
        return new MainWindow()
      default:
        throw new Error(`无效的窗口类型: ${winType}`)
    }
  }
}
