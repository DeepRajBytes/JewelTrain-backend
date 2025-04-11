import dotenv from 'dotenv'

dotenv.config();

interface Config {
  port: number;
  mongoDBurl: string;
}

const config: Config = {
  port: parseInt(process.env.PORT || "3001", 10),
  mongoDBurl: process.env.MONGODB_URI as string,
};

export default config;
