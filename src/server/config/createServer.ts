import * as fs from 'fs';
import * as http from 'http';
import * as https from 'https';

import express from 'express';


const createServer = (app: express.Application) => {
    const isLocal = process.env.environment === 'local';
    const port = parseInt(process.env.port || "8080");
    app.set('port', port);

    const server = isLocal ?
        https.createServer(
            { key: fs.readFileSync('./Local.key'), cert: fs.readFileSync('./Local.crt') },
            app
        )
        :
        http.createServer(app)
        ;

    server.listen(port);
    server.on('error', (error: NodeJS.ErrnoException) => onError(error, port));
    server.on('listening', () => onListening(server));

    return server;
}

export default createServer;



function onError(error: NodeJS.ErrnoException, port: number) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = 'Port ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
        default:
            throw error;
    }
}

function onListening(server: http.Server) {
    const addr = server.address();
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr?.port}`;
    console.log('Listening on ' + bind);
}