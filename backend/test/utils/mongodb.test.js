const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();
//const uri = process.env.MONGO_URL;
const uri =
  "mongodb+srv://piraveenankirupakaran:RHFixkKdutpicbaY@cluster0.3nqu1aq.mongodb.net/?retryWrites=true&w=majority";
describe("MongoDB connection", () => {
  it("Connects to the MongoDB server", async () => {
    const client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
    });
    expect(client).toBeDefined();
    await client.close();
  });
});
