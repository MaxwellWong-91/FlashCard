const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp);
const app = require("../../../server");

describe("Test POST /api/user/register", (done) => {
  it("Should not create user when missing username", (done) => {
    chai.request(app)
      .post("/api/user/register")
      .send({"username": "", "password1": "hardtoguess", "password2": "hardtoguess"})
      .end((err, res) => {
        
        expect(res).to.have.status(400);
        expect(res.body).to.have.property("error");
        expect(res.body.error).to.equal("Please make sure all fields are entered");
        done();
      })
  })

  it("Should not create user when missing password1", (done) => {
    chai.request(app)
      .post("/api/user/register")
      .send({"username": "test", "password1": "", "password2": "hardtoguess"})
      .end((err, res) => {
        
        expect(res).to.have.status(400);
        expect(res.body).to.have.property("error");
        expect(res.body.error).to.equal("Please make sure all fields are entered");
        done();
      })
  })

  it("Should not create user when missing password2", (done) => {
    chai.request(app)
      .post("/api/user/register")
      .send({"username": "test", "password1": "hardtoguess", "password2": ""})
      .end((err, res) => {
        
        expect(res).to.have.status(400);
        expect(res.body).to.have.property("error");
        expect(res.body.error).to.equal("Please make sure all fields are entered");
        done();
      })
  })

  it("Should not create user when missing passwords don't match", (done) => {
    chai.request(app)
      .post("/api/user/register")
      .send({"username": "test", "password1": "hardtoguess", "password2": "hardtoguess2"})
      .end((err, res) => {
        
        expect(res).to.have.status(400);
        expect(res.body).to.have.property("error");
        expect(res.body.error).to.equal("Please make sure passwords are the same");
        done();
      })
  })

  it("Should not create user when username taken", (done) => {
    chai.request(app)
      .post("/api/user/register")
      .send({"username": "coolname", "password1": "hardpass", "password2": "hardpass"})
      .end((err, res) => {
        
        expect(res).to.have.status(400);
        expect(res.body).to.have.property("error");
        expect(res.body.error).to.equal("Username already taken");
        done();
      })
  })

  it("Should create a user when all fields are entered", (done) => {
    chai.request(app)
      .post("/api/user/register")
      .send({"username": "test", "password1": "hardtoguess", "password2": "hardtoguess"})
      .end((err, res) => {
        
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("token");
        expect(res.body).to.have.property("user");
        expect(res.body.user).to.have.property("id");
        expect(res.body.user).to.have.property("username");
        expect(res.body.user.username).to.equal("test");
        done();
      })
  })
})


describe("Test POST /api/user/login", (done) => {
  it("Should not login when missing username", (done) => {
    chai.request(app)
      .post("/api/user/login")
      .send({"username": "", "password": "hardpass"})
      .end((err, res) => {

        expect(res).to.have.status(400);
        expect(res.body).to.have.property("error");
        expect(res.body.error).to.equal("Please make sure all fields are entered");
        done();
      })
  })

  it("Should not login when missing password", (done) => {
    chai.request(app)
      .post("/api/user/login")
      .send({"username": "test", "password": ""})
      .end((err, res) => {

        expect(res).to.have.status(400);
        expect(res.body).to.have.property("error");
        expect(res.body.error).to.equal("Please make sure all fields are entered");
        done();
      })
  })

  it("Should not login when username doesn't exist", (done) => {
    chai.request(app)
      .post("/api/user/login")
      .send({"username": "superuniquename", "password": "hardtoguess"})
      .end((err, res) => {

        expect(res).to.have.status(400);
        expect(res.body).to.have.property("error");
        expect(res.body.error).to.equal("Invalid Credentials");
        done();
      })
  })

  it("Should not login when password doesn't match", (done) => {
    chai.request(app)
      .post("/api/user/login")
      .send({"username": "coolname", "password": "hardtoguess"})
      .end((err, res) => {

        expect(res).to.have.status(400);
        expect(res.body).to.have.property("error");
        expect(res.body.error).to.equal("Invalid Credentials");
        done();
      })
  })

  it("Should login when all fields entered", (done) => {
    chai.request(app)
      .post("/api/user/login")
      .send({"username": "coolname", "password": "hardpass"})
      .end((err, res) => {

        expect(res).to.have.status(200);
        expect(res.body).to.have.property("token");
        expect(res.body).to.have.property("user");
        expect(res.body.user).to.have.property("id");
        expect(res.body.user).to.have.property("username");
        expect(res.body.user.id).to.equal("579a25921f417dd1e5518141");
        expect(res.body.user.username).to.equal("coolname");
        done();
      })
  })
})