const { createProxyMiddleware } = require('http-proxy-middleware');
const PORT = process.env.PORT_SERVER || 9998;

module.exports = (app) => {
  app.use(
    createProxyMiddleware('/api', {
      target: `http://localhost:${PORT}`,
      changeOrigin: true,
    })
  );
};
