import { ElectronWindowType } from './window-type'
import CommonWindow from './common'
import { join } from 'path'
import { app, Menu, Tray } from 'electron'

const icon = join(__dirname, '../../resources/icon.png')

export default class MainWindow extends CommonWindow {
  private tray: Tray

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
    // 解决可拖动区域右键触发菜单问题（0x0116为window消息）
    win?.hookWindowMessage(0x0116, () => {
      win.setEnabled(false)
      setTimeout(() => {
        win.setEnabled(true)
      }, 0)
      return true
    })
    // 初始化系统托盘
    this.tray = new Tray(icon)
    const contextMenu = Menu.buildFromTemplate([
      {
        label: '退出',
        click: () => {
          app.quit()
        }
      }
    ])
    this.tray.setToolTip('云涵')
    this.tray.setContextMenu(contextMenu)
    this.tray.on('click', () => {
      win?.show()
    })
  }
}
