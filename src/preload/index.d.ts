import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: CustomApi
  }
}

interface CustomApi {
  ISwitchWindow: (winType: ElectronWindowType) => void
  IQuitApp: () => void
  IMinimizeWindow: () => void
  IMaximizeWindow: () => void
  ICloseWindow: () => void
  IHideWindow: () => void
}
