import mongoose from "mongoose";
import { Disaster } from "../../modules/Disaster/models/DisasterMongoose";
import { DrawingLayer } from "../../modules/DrawingLayer/models/DrawingLayerMongoose";
import { Pin } from "../../modules/Pin/models/PinMongoose";

describe("DrawingLayer Model", () => {
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
    await DrawingLayer.deleteMany();
    await Disaster.deleteMany();
  });

  it("should create and save a new drawing layer", async () => {
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

    const drawingLayer = new DrawingLayer({
      disaster: disaster._id,
      createdBy: mongoose.Types.ObjectId(),
      featureType: "Polygon",
      featureGeoJSON: {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [0, 0],
              [1, 0],
              [1, 1],
              [0, 1],
              [0, 0],
            ],
          ],
        },
        properties: {},
      },
    });
    const savedDrawingLayer = await drawingLayer.save();

    expect(savedDrawingLayer._id).toBeDefined();
    expect(savedDrawingLayer.disaster.toString()).toEqual(
      disaster._id.toString()
    );
    expect(savedDrawingLayer.createdBy).toBeTruthy();
    expect(savedDrawingLayer.featureType).toBe("Polygon");
    expect(savedDrawingLayer.featureGeoJSON.type).toBe("Feature");
    expect(savedDrawingLayer.featureGeoJSON.geometry.type).toBe("Polygon");
    expect(
      savedDrawingLayer.featureGeoJSON.geometry.coordinates[0]
    ).toHaveLength(5);
    expect(savedDrawingLayer.createdAt).toBeTruthy();
    expect(savedDrawingLayer.updatedAt).toBeTruthy();
  });
});
