import http from 'http';
import app from './app';
import { config } from './config/env';

const PORT = config.PORT ?? 5000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});