//Importing So Require Works in Node 14+
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

export async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      dbName: `IFRC_DB`,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit();
  }
}
