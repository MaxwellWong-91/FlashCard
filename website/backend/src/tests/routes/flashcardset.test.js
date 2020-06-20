const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../../../server.js");
const should = chai.should();
const expect = chai.expect;

before(done => {
  chai.use(chaiHttp);
  done();
})


describe("Test get /api/set/:id", () => {
  it("Should give correct value for existing id", (done) => {
    chai.request(app)
      .get("/api/set/5eae0f84f8159e46bc2028c7")
      .end((err, res) => {
        const expected = {
          "flashcards": [],
          "_id": "5eae0f84f8159e46bc2028c7",
          "name": "cse100",
          "__v": 2
        }
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("flashcards");
        expect(res.body).to.have.property("_id");
        expect(res.body).to.have.property("name");
        expect(res.body).to.have.property("__v");
        expect(res.body.flashcards.length).to.equal(0);
        expect(res.body._id).to.equal("5eae0f84f8159e46bc2028c7");
        expect(res.body.name).to.equal("cse100");
        expect(res.body.__v).to.equal(2);
        //res.should.have.status(200);
        //res.body.should.be.eql("lmao");
        done()
      })
  })

  it("Should give null value for nonexisting id", (done) => {
    chai.request(app)
      .get("/api/set/5eae0f84f8159e46bc2028c6")
      .end((err, res) => {
        //console.log(res.body)
        expect(res).to.have.status(200);
        expect(res.body).to.equal(null);
        //res.should.have.status(200);
        //res.body.should.be.eql("lmao");
        done()
      })
  })

  
})
