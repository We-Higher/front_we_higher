const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/ws-stomp',
        createProxyMiddleware({
            target: `http://localhost:${process.env.REACT_APP_MY_PORT}}`,
            changeOrigin: true,
            ws: true, // websocket을 위한 설정
        })
    );
};
