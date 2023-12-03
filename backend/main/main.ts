// import cron from 'node-cron';
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import route from '../routes/api';
import bodyParser from 'body-parser';
import { sessionConfig } from '../config/session';
import multer from 'multer';
import cors from 'cors';

dotenv.config();
const app = express();
const upload = multer()

const JWTSecret: any = process.env.JWT_SECRET
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(sessionConfig);
app.use(upload.any()); 
app.use(cors());

const port = process.env.port || process.env.PORT || 3000
const appName = process.env.APP_NAME
const appEnv = process.env.APP_ENV

app.get('/', (req: Request, res: Response) => {
    res.send('Test - PT.Surya Digital Teknologi!');
});

app.use('/api', route)

app.listen(port, () => {
    console.log(`\n${ appName } (${appEnv}) listening to http://localhost:${ port }`)
})

