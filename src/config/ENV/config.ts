import dotenv from "dotenv";

dotenv.config();

interface Config {
  mode: string;
  port: number;
  mongoDBurl: string;
  JWT_SECREAT_KEY: any;
}

const config: Config = {
  mode: process.env.NODE_ENV as string,
  port: parseInt(process.env.PORT || "3001", 10),
  mongoDBurl: process.env.MONGODB_URI as string,
  JWT_SECREAT_KEY: process.env.JWT_SECREAT_KEY,
};

export default config;
