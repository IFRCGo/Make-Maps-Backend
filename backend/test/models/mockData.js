var Mongoose = require("mongoose").Mongoose;
var mongoose = new Mongoose();
const mockData = {
  disaster: mongoose.Types.ObjectId(),
  pinText: "This is a sample pin text",
  pinCoordinates: {
    type: "Point",
    coordinates: [45.5231, -122.6765],
  },
  createdBy: mongoose.Types.ObjectId(),
};
