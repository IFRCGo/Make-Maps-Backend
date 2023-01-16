const mongoose = require("mongoose");//add

const TestSchema = mongoose.Schema(
  {
    name: { type: "String", required: true },
    value: { type: "Number", required: true },
  },
  { timestaps: true }
);

const Test = mongoose.model("user", TestSchema);
const testDoc = new Test({ name: "Test Document", value: 42 });
testDoc.save(function (err) {
  if (err) return handleError(err);
  console.log("Document created");
});
module.exports = Test;
