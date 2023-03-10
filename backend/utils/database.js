import { mongoose } from 'mongoose'

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
