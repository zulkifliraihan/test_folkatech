
import session from 'express-session';
import { RequestHandler } from 'express';
import dotenv from 'dotenv';
dotenv.config();

const JWTSecret: any = process.env.JWT_SECRET

const sessionOptions: session.SessionOptions = {
    secret: JWTSecret,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 2 * 60 * 60 * 1000
    }
};

export const sessionConfig: RequestHandler = session(sessionOptions);
