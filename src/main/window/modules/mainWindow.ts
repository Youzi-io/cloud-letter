import { ElectronWindowType } from './window-type'
import CommonWindow from './common'
import { join } from 'path'

const icon = join(__dirname, '/resources/icon.png')

export default class MainWindow extends CommonWindow {
  constructor() {
    super({
      width: 912,
      height: 642,
      minWidth: 912,
      minHeight: 642,
      show: false,
      frame: false, // 无边框
      ...(process.platform === 'linux' ? { icon } : {}),
      webPreferences: {
        // Use pluginOptions.nodeIntegration, leave this alone
        // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
        nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION as unknown as boolean,
        contextIsolation: !(process.env.ELECTRON_NODE_INTEGRATION as unknown) as boolean,
        preload: join(__dirname, '../preload/index.js'),
        sandbox: false
        // webSecurity:false
      },
      windowType: ElectronWindowType.Main,
      loadUrl: (host) => `${host}#main`
    })
    const win = this.getWindow()
    if (win) {
      // 解决可拖动区域右键触发菜单问题
      win.hookWindowMessage(0x0116, () => {
        win.setEnabled(false)
        setTimeout(() => {
          win.setEnabled(true)
        }, 0)
        return true
      })
    }
  }
}
