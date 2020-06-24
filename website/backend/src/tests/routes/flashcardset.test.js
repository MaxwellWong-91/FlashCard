const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp);
const app = require("../../../server");

before((done) => {
  app.on("ready", () => {
    done();
  })
})

describe("If this pass and everything fails, database error", (done) => {
  it("should be true", (done) => {
    expect(5).to.equal(5);
    done();
  })
})

describe("Test get /api/set/:id", () => {
  it("Should give correct value for existing id and empty flashcards", (done) => {
    chai.request(app)
      .get("/api/set/5eae0f84f8159e46bc2028c7")
      .end((err, res) => {
        const expected = {
          "flashcards": [],
          "_id": "5eae0f84f8159e46bc2028c7",
          "name": "Biology",
          "__v": 0
        }
        
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("flashcards");
        expect(res.body).to.have.property("_id");
        expect(res.body).to.have.property("name");
        expect(res.body).to.have.property("__v");
        expect(res.body.flashcards.length).to.equal(0);
        expect(res.body._id).to.equal("5eae0f84f8159e46bc2028c7");
        expect(res.body.name).to.equal("Biology");
        expect(res.body.__v).to.equal(0);
        done();
      })
  })

  it("Should give correct value for existing id and filled flashcards", (done) => {
    chai.request(app)
      .get("/api/set/5ac74cccc65aac3e0c4b6cde")
      .end((err, res) => {
        const expected = {
          "flashcards": [ "507f1f77bcf86cd799439011", "507f191e810c19729de860ea" ],
          "_id": "5ac74cccc65aac3e0c4b6cde",
          "name": "cse100",
          "__v": 0
        }

        expect(res).to.have.status(200);
        expect(res.body).to.have.property("flashcards");
        expect(res.body).to.have.property("_id");
        expect(res.body).to.have.property("name");
        expect(res.body).to.have.property("__v");
        expect(res.body.flashcards.length).to.equal(2);
        expect(res.body._id).to.equal("5ac74cccc65aac3e0c4b6cde");
        expect(res.body.name).to.equal("cse100");
        expect(res.body.__v).to.equal(0);
        done();
      })
  })

  it("Should give null value for nonexisting id", (done) => {
    chai.request(app)
      .get("/api/set/5eae0f84f8159e46bc2028c6")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.equal(null);
        done();
      })
  })

  it("Should give error for bad format id", (done) => {
    chai.request(app)
      .get("/api/set/5eae0f")
      .end((err, res) => {
        
        expect(res).to.have.status(400);
        expect(res.body).to.have.property("error");
        done();
      })
  })
})

describe("Test post /api/set/create", () => {
  it ("Should make sure all fields are entered", (done) => {
    chai.request(app)
      .post("/api/set/create")
      .send({"name": ""})
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property("error");
        done();
      })
  })

  it ("Should create when all fields entered", (done) => {
    chai.request(app)
      .post("/api/set/create")
      .send({"name": "Biology Terms"})
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("name");
        expect(res.body).to.have.property("flashcards");
        expect(res.body.name).to.equal("Biology Terms");
        expect(res.body.flashcards.length).to.equal(0);
        done();
      })
  })

  it ("Should allow create of same name", (done) => {
    chai.request(app)
      .post("/api/set/create")
      .send({"name": "Biology"})
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("name");
        expect(res.body).to.have.property("flashcards");
        expect(res.body.name).to.equal("Biology");
        expect(res.body.flashcards.length).to.equal(0);
        done();
      })
  })
})