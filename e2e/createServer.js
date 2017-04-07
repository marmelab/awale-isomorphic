const express = require('express');
const next = require('next');
const driver = require('./chromeDriver');

let listeningServer;

before(async () => {
    const dev = process.env.NODE_ENV !== 'production';
    const app = next({ dev });
    const handle = app.getRequestHandler();

    return app.prepare().then(() => {
        const server = express();
        server.get('*', (req, res) => {
            return handle(req, res);
        })
        listeningServer = server.listen(8083);
    });
});

after(async () => {
    listeningServer.close();
    return driver.quit();
});
