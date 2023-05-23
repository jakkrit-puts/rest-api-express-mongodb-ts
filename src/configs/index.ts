import * as dotenv from "dotenv";
dotenv.config();

const config = {
  PORT: process.env.PORT || '3000',
  MONGO_URL: process.env.MONGO_URL || '',
  SALT: process.env.SALT || '',
  JWT_SECRET: process.env.JWT_SECRET || '',
  JWT_EXP: process.env.JWT_EXP || ''
};

export default config;
