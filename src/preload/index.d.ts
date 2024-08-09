import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: CustomApi
  }
}

interface CustomApi {
  ISwitchWindow: (winType: WindowType, closeWinType: WindowType) => void
  IQuitApp: () => void
  IMinimizeWindow: (winType: WindowType) => void
  IMaximizeWindow: (winType: WindowType) => void
  ICloseWindow: (winType: WindowType) => void
  IHideWindow: (winType: WindowType) => void
}
