import express from 'express';
import setupRouter from './router';
import './modules/db';
import './modules/redis';

const app = express();
setupRouter(app);

export default app;