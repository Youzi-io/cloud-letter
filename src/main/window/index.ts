import { ElectronWindowType } from './modules/window-type'
import AuthWindow from './modules/authWindow'
import MainWindow from './modules/mainWindow'

// 实现工厂方法
export default class WindowFactory {
  static createWindow(winType: string) {
    switch (winType) {
      case ElectronWindowType.Auth:
        return new AuthWindow()
      case ElectronWindowType.Main:
        return new MainWindow()
      default:
        throw new Error(`Invalid animal type: ${winType}`)
    }
  }
}
