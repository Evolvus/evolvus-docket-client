const debug = require("debug")("evolvus-docket-client:index");
const axios=require("axios");

var DOCKET_POST_URL=process.env.DOCKET_POST_URL || "http://localhost:3000/audit";
var TIME_OUT=process.env.TIME_OUT || 5000;

module.exports.postToDocket=(docketObject)=> {
    return new Promise((resolve,reject)=> {
        try {
            if(docketObject==null) {
                reject("IllegalArgument:Object is null/undefined");
            }
            var instance = axios.create({
                baseURL: DOCKET_POST_URL,
                timeout: TIME_OUT
              });
            
            instance.post(DOCKET_POST_URL,docketObject).then((response)=> {
                debug(`response is ${response}`);
                resolve(response.data);
            }).catch((error)=> {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    if(error.response.data==="MongoError") {
                        throw new Error(error.response.data);
                    } else {
                        debug(`Error:${error.response.data}`);
                        reject(error.response.data);
                    }
                  } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    debug(`Error:${error.message}`);
                    reject(error.message);
                  } else {
                    // Something happened in setting up the request that triggered an Error
                    debug(`Error:${error.message}`);
                    reject(error.message);
                  }
            });
        } catch (error) {
            debug(`caught exception ${error}`);
            reject(error);
        }
    });
};