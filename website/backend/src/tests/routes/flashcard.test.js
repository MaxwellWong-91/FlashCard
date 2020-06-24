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

describe ("Test get /api/set/:id/card/:cardId", (done) => {
  chai.request(app)
    .get("/api/set/5ac74cccc65aac3e0c4b6cde/card/507f1f77bcf86cd799439011")
    .end((err, res) => {
      const expected = {
        "_id": "507f1f77bcf86cd799439011",
        "word": "agile",
        "definition": "software methodology",
        "__v": 0
      }

      expect(res).to.have.status(200);
      expect(res.body).to.equal(expected);
      done();
    })
})