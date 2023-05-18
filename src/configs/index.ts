import * as dotenv from "dotenv";
dotenv.config();

const config = {
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL,
  SALT: process.env.SALT,
};

export default config;
