const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/ws-stomp',
        createProxyMiddleware({
            target: 'ws://localhost:8082',
            changeOrigin: true,
            ws: true, // websocket을 위한 설정
        })
    );
};
