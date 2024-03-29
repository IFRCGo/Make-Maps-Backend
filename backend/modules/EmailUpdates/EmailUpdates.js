import cron from 'node-cron'
import { sendEmail } from "./../../utils/sendEmail.js";
import { Disaster } from "../Disaster/models/DisasterMongoose.js";
import { Pin } from "../Pin/models/PinMongoose.js";
import { User } from "../User/models/UserMongoose.js";

// * * * * *
// - - - - -
// | | | | |
// | | | | ----- Day of week (0 - 7) (Sunday = both 0 and 7)
// | | | ------- Month (1 - 12)
// | | --------- Day of month (1 - 31)
// | ----------- Hour (0 - 23)
// ------------- Minute (0 - 59)
/**
 Starts a cron job that runs every 30 seconds to check for updates on disasters, pins and drawing layers.
 If any updates are found, sends an email to all subscribers and updates the last sent email time for the disaster.
 @returns {void}
 TODO: I dont think this is the best way to do this. Better to trigger this on events rather than running it every 30 seconds.
 */
export const StartMapSubscription = () => {
  cron.schedule("*/30 * * * * *", () => {
    console.log("runnign");
    Disaster.find({})
      .populate("pins drawingLayers subscriptions")
      .exec((err, disasters) => {
        if (err) {
          console.log(err);
        } else {
          disasters.forEach((disaster) => {
            if (disaster.subscriptions.length != 0) {
              const bodyArray = [];
              const isUpdate = false;
              disaster.pins.forEach((pin) => {
                if (pin.date.valueOf() > disaster.lastSentEmail.valueOf()) {
                  isUpdate = true;
                  User.findById(pin.createdBy, (err, user) => {
                    if (err) {
                      console.log(err);
                    } else {
                      console.log(user);
                      const firstName = user.firstName;
                      bodyArray.push(`Pin Updated/Added by ${firstName}.`);
                      // use the user name as needed
                    }
                  });
                } else {
                  console.log(pin.date.valueOf());
                  console.log(disaster.lastSentEmail.valueOf());
                }
              });

              disaster.drawingLayers.forEach((drawingLayer) => {
                if (
                  drawingLayer.date.valueOf() > disaster.lastSentEmail.valueOf()
                ) {
                  isUpdate = true;
                  User.findById(drawingLayer.createdBy, (err, user) => {
                    if (err) {
                      console.log(err);
                    } else {
                      console.log(user);
                      const firstName = user.firstName;
                      bodyArray.push(
                        `${drawingLayer.featureType} Updated/Added by ${firstName}.`
                      );

                      // use the user name as needed
                    }
                  });
                }
              });
              console.log("1-----");
              if (isUpdate === true) {
                console.log("2-----");

                console.log("has been updated");
                console.log(bodyArray);
                Disaster.findOneAndUpdate(
                  { _id: disaster._id },
                  { lastSentEmail: new Date() },
                  { new: true },
                  (err, updatedDisaster) => {
                    if (err) {
                      // handle the error
                    } else {
                      for (let i = 0; i < disaster.subscriptions.length; i++) {
                        sendEmail(
                          disaster.subscriptions[i].email,
                          updatedDisaster.disasterName,
                          emailBody(bodyArray)
                        );
                      }
                    }
                  }
                );
                // send email to subscribers
                // update lastSentEmail to current time
              }
            }

            //}
          });
        }
      });
  });
};

/**

 Returns an HTML formatted string that contains the body of an email.
 @param {string[]} arr - An array of strings that make up the body of an email.
 @returns {string} - An HTML formatted string that contains the body of an email.
 */
const emailBody = (arr) => {
  let body = "";
  arr.map((p) => {
    body += `<p>${p}</p>`;
  });
  return body;
};
