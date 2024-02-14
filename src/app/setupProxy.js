// src/setupProxy.js
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/users", // Specify the path you want to proxy
    createProxyMiddleware({
      target: "http://localhost:5000", // Specify the target server
      changeOrigin: true,
    })
  );
};
