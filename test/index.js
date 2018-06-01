const debug = require("debug")("evolvus-docket-client.test.index");
const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");
const expect = chai.expect;

chai.use(chaiAsPromised);

let index=require("../index");

describe('testing postToDocket method', () => {
  let auditEvent = {
    name: 'TESTING_DOCKET',
    createdBy: 'kavyak',
    application: 'APPLICATION',
    source: 'application',
    ipAddress: '127.0.0.1',
    level: 'info',
    status: 'SUCCESS',
    eventDateTime: new Date().toISOString(),
    details: '{ user: "kavya" }',
    keywords: 'login application',
    keyDataAsJSON: "keydata"
  };
  let invalidDocket={
    name: 'loginEvent',
    createdBy: 'kavyak',
    application: 123,
    source: 'loginPage',
    ipAddress: '127.0.0.1',
    level: 'info',
    status: 'SUCCESS',
    eventDateTime: new Date().toISOString(),
    details: '{ user: "kavya" }',
    keywords: 'login CDA',
    keyDataAsJSON: "keydata"
  };


  describe("testing with docket objects",()=> {
    beforeEach((done)=> {
      process.env.DOCKET_POST_URL = "http://localhost:3000/audit";
      done();
    });

    it('should save valid object to database', (done) => {
    var res=index.postToDocket(auditEvent);
    expect(res)
    .to.be.eventually.include(auditEvent)
    .notify(done);
    });

    it('should respond with status code 400 if docketObject is invalid', (done) => {
      var res=index.postToDocket(invalidDocket);
      expect(res)
      .to.be.fulfilled.then((resp)=> {
        expect(resp.response.status).to.be.equal(400);
        done();
      });
    });
  });

  describe("testing when the server is down",()=> {
    beforeEach((done)=> {
      process.env.DOCKET_POST_URL = "http://localhost:4000/audit";
      done();
    });

    it('should respond with connection refused if docket server is down', (done) => {
      var res=index.postToDocket(auditEvent);
      expect(res).to.be.fulfilled.then((resp)=> {
        expect(resp.code).to.be.equal('ECONNREFUSED');
        done();
      });
    });
  });
});