const debug = require("debug")("evolvus-docket-client.test.index");

const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");
const expect = chai.expect;

process.env.MONGO_DB_URL = "mongodb://localhost:27017/TestDocket";

let index=require("../index");

describe('testing postToDocket method', () => {

    let auditEvent = {
        name: 'loginEvent',
        createdBy: 'kavyak',
        application: 'CDA',
        source: 'loginPage',
        ipAddress: '127.0.0.1',
        level: 'info',
        status: 'SUCCESS',
        eventDateTime: new Date().toISOString(),
        details: '{ user: "kavya" }',
        keywords: 'login CDA',
        keyDataAsJSON: "keydata"
      };

    it('should save valid object to database', (done) => {
     var res=index.postToDocket(auditEvent);
     expect(res)
     .to.be.eventually.include(auditEvent)
     .notify(done);
    });
  });