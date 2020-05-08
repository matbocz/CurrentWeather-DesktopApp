const { app, BrowserWindow, Menu } = require('electron')

const template = [{
    label: 'Menu',
    submenu: [{
            label: 'Go to the GitHub repository',
            click: async() => {
                const { shell } = require('electron')
                await shell.openExternal('https://github.com/matbocz/CurrentWeather-DesktopApp')
            }
        },

        {
            label: 'Fullscreen',
            role: 'togglefullscreen'
        },

        {
            type: 'separator'
        },

        {
            label: 'Exit',
            role: 'quit'
        },
    ]
}]
const menu = Menu.buildFromTemplate(template)

function createWindow() {
    const win = new BrowserWindow({
        width: 900,
        height: 700,
        webPreferences: {
            nodeIntegration: true
        }
    })

    Menu.setApplicationMenu(menu)

    win.loadFile('index.html')

    // win.webContents.openDevTools()
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})