//sending emails to subscribers
const require = createRequire(import.meta.url);
import { Disaster } from "./../Disaster/models/DisasterMongoose";

var cron = require("node-cron");

export const StartMapSubscription = () => {
  //cron.schedule("0 */2 * * *", () => {
  cron.schedule("*/10 * * * * *", function () {
    Disaster.find({})
      .populate("pins texts mapLayers")
      .exec((err, disasters) => {
        if (err) {
          console.log(err);
        } else {
          disasters.forEach((disaster) => {
            //if (disaster.subscriber.length !== 0) {
            let isUpdate = false;
            disaster.pins.forEach((pin) => {
              if (pin.date.getTime() > disaster.lastSentEmail.getTime()) {
                isUpdate = true;
              }
            });
            disaster.texts.forEach((text) => {
              if (text.date > disaster.lastSentEmail) {
                isUpdate = true;
              }
            });
            disaster.mapLayers.forEach((mapLayer) => {
              if (mapLayer.date > disaster.lastSentEmail) {
                isUpdate = true;
              }
            });
            if (isUpdate) {
              console.log("has been updated");

              Disaster.findOneAndUpdate(
                { _id: disaster._id },
                { lastSentEmail: Date.now() }
              );
              // send email to subscribers
              // update lastSentEmail to current time
            }

            //}
          });
        }
      });
  });
};
