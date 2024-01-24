import * as dotenv from "dotenv";
dotenv.config();

const { MONGO_DB_URI, PORT } = process.env;

export { MONGO_DB_URI, PORT };
