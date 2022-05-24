const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        createProxyMiddleware('/api', {
            target: 'http://localhost:1337',
            changeOrigin: true,
        })
    );

    app.use(
        createProxyMiddleware('/smartpoke/socket.io', {
            target: 'ws://localhost:1337',
            ws: true,
            changeOrigin: true,
        })
    );
};