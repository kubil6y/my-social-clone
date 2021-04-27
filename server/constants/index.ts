import path from 'path';

export const __prod__ = process.env.NODE_ENV === 'production';
export const PORT = process.env.PORT ?? 5000;
export const publicDir = path.join(__dirname, '..', '..', 'public');

export const MONGO_URI = process.env.MONGO_URI;

export const ORIGIN = process.env.ORIGIN;
export const APP_URL = process.env.APP_URL;
