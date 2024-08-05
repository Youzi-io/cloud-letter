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
}
