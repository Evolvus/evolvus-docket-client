const debug = require("debug")("evolvus-docket-client:index");
const axios=require("axios");

var DOCKET_POST_URL=process.env.DOCKET_POST_URL || "http://localhost:3000/audit";

module.exports.postToDocket=(docketObject)=> {
    return new Promise((resolve,reject)=> {
        try {
            if(docketObject==null) {
                throw new Error("IllegalArgumentException:docketObject is null/undefined");
            }
            axios.post(DOCKET_POST_URL,docketObject).then((response)=> {
                debug(`response is ${response}`);
                resolve(response);
            }).catch((e)=> {
                debug(`exception ${e}`);
                reject(e);
            });
        } catch (error) {
            debug(`caught exception ${error}`);
            reject(error);
        }
    });
}