import { config } from "dotenv";
config();

const { PORT, NODE_ENV, MONGO_URI, JWT_SECRET } = process.env;

export const port = PORT || 5000;
export const nodeEnv = NODE_ENV;
export const mongoUri = MONGO_URI;
export const jwtSecret = JWT_SECRET;
