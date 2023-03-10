import mongoose from "mongoose";
import { Disaster } from "../../modules/Disaster/models/DisasterMongoose";
import { DrawingLayer } from "../../modules/DrawingLayer/models/DrawingLayerMongoose";

describe("Disaster Model", () => {
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
    await Disaster.deleteMany();
  });

  it("should create and save a new disaster", async () => {
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
      pins: [],
      drawingLayers: [],
      subscriptions: [],
    });
    const savedDisaster = await disaster.save();

    expect(savedDisaster._id).toBeDefined();
    expect(savedDisaster.disasterName).toBe("Test Disaster");
    expect(savedDisaster.disasterType).toBe("Earthquake");
    expect(savedDisaster.date).toBeTruthy();
    expect(savedDisaster.region).toBe("Test Region");
    expect(savedDisaster.location).toBe("Test Location");
    expect(savedDisaster.disasterCoordinates.type).toBe("Point");
    expect(savedDisaster.disasterCoordinates.coordinates[0]).toBe(0);
    expect(savedDisaster.disasterInformation).toBe("Test Disaster Information");
    expect(savedDisaster.amount_requested).toBe("100000");
    expect(savedDisaster.amount_funded).toBe("50000");
    expect(savedDisaster.createdBy).toBeTruthy();
    expect(savedDisaster.pins).toHaveLength(0);
    expect(savedDisaster.drawingLayers).toHaveLength(0);
    expect(savedDisaster.subscriptions).toHaveLength(0);
    expect(savedDisaster.lastSentEmail).toBeTruthy();
    expect(savedDisaster.createdAt).toBeTruthy();
    expect(savedDisaster.updatedAt).toBeTruthy();
  });

  it("should not save a disaster without required fields", async () => {
    const disaster = new Disaster({
      disasterType: "Earthquake",
      date: new Date(),
      region: "Test Region",
      disasterCoordinates: {
        type: "Point",
        coordinates: [0, 0],
      },
      amount_requested: "100000",
      amount_funded: "50000",
      createdBy: mongoose.Types.ObjectId(),
      pins: [],
      drawingLayers: [],
      subscriptions: [],
    });
    let err;
    try {
      await disaster.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.disasterName).toBeDefined();
  });
});
