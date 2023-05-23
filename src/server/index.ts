import express from 'express';
import dotenv from 'dotenv'

import createServer from './config/createServer';

dotenv.config()

const app: express.Application = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static('dist/client'));

app.get('/api/health', (req, res) => {
    console.log('Hit /api/health');
    res.send('ok');
});

app.get('/api/message', (req, res) => {
    console.log('Hit /api/message');
    const d = new Date().toLocaleString();
    res.send(`Hola desde el server, Son las  ${d}`);
});

createServer(app);
