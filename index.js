const debug = require("debug")("evolvus-docket-client:index");
const axios = require("axios");
const consumer = require('./torrent/kafka-config');

var TIME_OUT = process.env.TIME_OUT || 5000;

// consumer.on('message', function(message) {
//     console.log('On Receiveing ', message);
//     try {
//         const docketObject = JSON.parse(message.value);
//         var DOCKET_POST_URL = process.env.DOCKET_POST_URL || "http://localhost:3000/audit";
//         if (docketObject == null) {
//             debug(`IllegalArgument:Object is ${docketObject}`);
//             resolve(`IllegalArgument:Object is ${docketObject}`);
//         }
//         var instance = axios.create({
//             baseURL: DOCKET_POST_URL,
//             timeout: TIME_OUT
//         });
//
//         instance.post(DOCKET_POST_URL, docketObject).then((response) => {
//             debug("response is", response.data);
//
//         }).catch((error) => {
//             debug(`Error:${error} and audit failed to store is`, docketObject);
//
//         });
//     } catch (error) {
//         debug(`caught exception ${error} and audit failed to store is`, docketObject);
//     }
// });


module.exports.postToDocket = (docketObject) => {

  return new Promise((resolve, reject) => {
    try {
      var DOCKET_POST_URL = process.env.DOCKET_POST_URL || "http://localhost:3000/audit";
      if (docketObject == null) {
        debug(`IllegalArgument:Object is ${docketObject}`);
        resolve(`IllegalArgument:Object is ${docketObject}`);
      }
      var instance = axios.create({
        baseURL: DOCKET_POST_URL,
        timeout: TIME_OUT
      });

      instance.post(DOCKET_POST_URL, docketObject).then((response) => {
        debug("response is", response.data);
        resolve(response.data);
      }).catch((error) => {
        debug(`Error:${error} and audit failed to store is`, docketObject);
        resolve(docketObject);
      });
    } catch (error) {
      debug(`caught exception ${error} and audit failed to store is`, docketObject);
      resolve(error);
    }
  });
};

module.exports.audit = {
  application: "",
  name: "",
  eventCode: "",
  source: "",
  ipAddress: "",
  level: "",
  status: "",
  eventDateTime: "",
  details: "",
  keyDataAsJSON: "",
  createdBy: "",
  keywords: ""
};