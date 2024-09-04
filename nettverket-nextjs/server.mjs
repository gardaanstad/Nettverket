import express from 'express';
import next from 'next';
import { createProxyMiddleware } from 'http-proxy-middleware';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Proxy configuration for API requests
  server.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5257', // ASP.NET backend
      changeOrigin: true,
      pathRewrite: { '^/api': '' }, // Optional rewrite of path
    })
  );

  server.all('*', (req, res) => {
 return handle(req, res);
  });

  const port = process.env.PORT || 3000;
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});