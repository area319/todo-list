import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import {MainRouter} from './routes'
import compression from 'compression'
import helmet from 'helmet'
import cors from 'cors'
import * as bodyParser from 'body-parser';
import './utils/mongoose'

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 7001;

app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(cors());
app.use("/api", MainRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
})
.on('error', (e) => console.log(e));
