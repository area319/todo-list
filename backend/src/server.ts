import express from 'express'
import helmet from 'helmet'
import compression from 'compression'
import * as bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config();
import './utils/mongoose'
import mainRouter from './routes'

const app = express();
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(cors());
app.use('/api', mainRouter);

const port = process.env.PORT;
app.listen(port, () => {
  console.log('Server is listening at port: ' + port);
}).on('error', () => {
  console.log('Server connectin error');
})

export default app;