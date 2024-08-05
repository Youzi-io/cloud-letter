import { ElectronWindowType } from './window-type'
import CommonWindow from './common'
import { join } from 'path'

const icon = join(__dirname, '/resources/icon.png')

export default class AuthWindow extends CommonWindow {
  constructor() {
    super({
      width: 400,
      height: 600,
      show: false,
      frame: false, // 无边框
      resizable: false, // 不允许改变窗口大小
      maximizable: false, // 不允许最大化
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
      windowType: ElectronWindowType.Auth,
      loadUrl: (host) => `${host}#auth`
    })
    const win = this.getWindow()
    if (win) {
      // 解决可拖动区域右键触发菜单问题（0x0116为window消息）
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
