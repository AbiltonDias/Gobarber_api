import express, { request, response } from 'express';
import routes from './routes';

const app = express();
app.use(express.json());
app.use(routes);

app.listen(3333, () => {
    console.log(':fire Server started on port 3333');
})
