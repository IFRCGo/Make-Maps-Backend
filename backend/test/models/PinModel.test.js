import mongoose from "mongoose";
import { Pin } from "../../modules/Pin/models/PinMongoose";
import { Disaster } from "../../modules/Disaster/models/DisasterMongoose";

describe("Pin Model", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    await Pin.deleteMany();
    await Disaster.deleteMany();
  });

  it("should create and save a new pin", async () => {
    const disaster = new Disaster({
      disasterName: "Test Disaster",
      disasterType: "Earthquake",
      date: new Date(),
      region: "Test Region",
      location: "Test Location",
      disasterCoordinates: {
        type: "Point",
        coordinates: [0, 0],
      },
      disasterInformation: "Test Disaster Information",
      amount_requested: "100000",
      amount_funded: "50000",
      createdBy: mongoose.Types.ObjectId(),
    });
    await disaster.save();

    const pin = new Pin({
      disaster: disaster._id,
      pinText: "Test Pin Text",
      pinCoordinates: {
        type: "Point",
        coordinates: [0, 0],
      },
      createdBy: mongoose.Types.ObjectId(),
    });
    const savedPin = await pin.save();

    expect(savedPin._id).toBeDefined();
    expect(savedPin.disaster.toString()).toEqual(disaster._id.toString());
    expect(savedPin.pinText).toBe("Test Pin Text");
    expect(savedPin.pinCoordinates.type).toBe("Point");
    expect(savedPin.pinCoordinates.coordinates).toEqual([0, 0]);
    expect(savedPin.createdAt).toBeTruthy();
    expect(savedPin.updatedAt).toBeTruthy();
  });
});
