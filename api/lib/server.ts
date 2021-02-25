const http = require('http');
import app from "./app";

const port = process.env.PORT || 3000;
const host = process.env.HOST || '0.0.0.0';

const server = http.createServer(app);

server.listen(port, host, () => {
    console.log('Server is working');
});