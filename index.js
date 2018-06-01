const debug = require("debug")("evolvus-docket-client:index");
const axios=require("axios");

var TIME_OUT=process.env.TIME_OUT || 5000;

module.exports.postToDocket=(docketObject)=> {
    
    return new Promise((resolve,reject)=> {
        try {
            var DOCKET_POST_URL=process.env.DOCKET_POST_URL || "http://localhost:3000/audit";
            if(docketObject==null) {
                debug(`IllegalArgument:Object is ${docketObject}`);
                resolve(`IllegalArgument:Object is ${docketObject}`);
            }
            var instance = axios.create({
                baseURL: DOCKET_POST_URL,
                timeout: TIME_OUT
              });
            
            instance.post(DOCKET_POST_URL,docketObject).then((response)=> {
                debug(`response is ${response} and audit is ${docketObject}`);
                resolve(response.data);
            }).catch((error)=> {
                debug(`Error:${error} and audit which is failed to store ${docketObject}`);
                resolve(error);
            });
        } catch (error) {
            debug(`caught exception ${error} and audit which is failed to store ${docketObject}`);
            resolve(error);
        }
    });
};
