const express = require('express');
const next = require('next');
const driver = require('./chromeDriver');

let listeningServer;

// before(() => {
    const dev = process.env.NODE_ENV !== 'production';
    const app = next({ dev });
    const handle = app.getRequestHandler();

    app.prepare().then(() => {
        const server = express();
        server.get('/', (req, res) => {
            return app.render(req, res, '/');
        });

        server.get('/game', (req, res) => {
            return app.render(req, res, '/game');
        });

        server.get('*', (req, res) => {
            return handle(req, res);
        })
        listeningServer = server.listen(8083);
    });
// });

after(async () => {
    listeningServer.close();
    return driver.quit();
});
