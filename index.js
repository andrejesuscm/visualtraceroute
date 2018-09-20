const {app, BrowserWindow} = require('electron');

const path = require('path');
const url = require('url');
const log = require('electron-log');
//const client = require('electron-connect').client;


function start(){
    const windowOpions = {
        width: 1024,
        height: 768,
        titleBarStyle: 'hiddenInset'
        //frame: false
    }
    win = new BrowserWindow(windowOpions);
    win.loadFile('index.html');
    /*win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
    }));*/

    //win.webContents.openDevTools();

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null
    });

      // Connect to server process
    //client.create(win);
}


app.on('ready', start);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
// On macOS it is common for applications and their menu bar
// to stay active until the user quits explicitly with Cmd + Q
if (process.platform !== 'darwin') {
    app.quit()
}
})
  
app.on('activate', () => {
// On macOS it's common to re-create a window in the app when the
// dock icon is clicked and there are no other windows open.
if (win === null) {
    createWindow()
}
})

/*
  traceroute = require('traceroute');
traceroute.trace('google.com', function (err,hops) {
  console.log(hops);
});*/
