const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/ws-stomp',
        createProxyMiddleware({
            target: process.env.REACT_APP_API_HOST,
            changeOrigin: true,
            ws: true, // websocket을 위한 설정
        })
    );
};
