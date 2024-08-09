import { WindowType } from './window-type'
import CommonWindow from './common'
import { join } from 'path'
import { app, Menu, Tray } from 'electron'

const icon = join(__dirname, '../../resources/icon.png')

export default class AuthWindow extends CommonWindow {
  private tray: Tray

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
      windowType: WindowType.Auth,
      loadUrl: (host) => `${host}#auth`
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

  /**
   * 关闭窗口并销毁托盘图标
   */
  close() {
    this.tray.destroy()
    super.close()
  }
}
