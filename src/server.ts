import 'reflect-metadata';
import express from 'express';
import routes from './routes';
import './database';
import uploadConfig from './config/uploads';

const app = express();
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.listen(3333, () => {
    console.log(':fire Server started on port 3333');
})
