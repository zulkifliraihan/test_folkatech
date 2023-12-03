import * as Minio from 'minio'
import dotenv from 'dotenv';

dotenv.config();

const MINIO_ENDPOINT: string = process.env.MINIO_ENDPOINT || '';
const MINIO_PORT: number = parseInt(process.env.MINIO_PORT || '0', 10);
const MINIO_ACCESS_KEY: string = process.env.MINIO_ACCESS_KEY || '';
const MINIO_SECRET_KEY: string = process.env.MINIO_SECRET_KEY || '';

let MINIO_SSL: boolean = true

if(MINIO_ENDPOINT == 'localhost') MINIO_SSL = false

const minioConfig = new Minio.Client({
    endPoint: MINIO_ENDPOINT,
    port: MINIO_PORT,
    useSSL: MINIO_SSL,
    accessKey: MINIO_ACCESS_KEY,
    secretKey: MINIO_SECRET_KEY,
})

export default minioConfig