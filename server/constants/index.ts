export const NODE_ENV = process.env.NODE_ENV;
export const __prod__ = process.env.NODE_ENV === 'production';
export const PORT = process.env.PORT ?? 3000;

export const MONGO_URI = process.env.MONGO_URI;

export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
