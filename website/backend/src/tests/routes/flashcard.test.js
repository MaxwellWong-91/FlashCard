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

describe("Test GET /api/set/:id/card/:cardId", (done) => {
  it("Should give error for bad format id", (done) => {
    chai.request(app)
      .get("/api/set/5ac74cccc65aac3e0c4b6cde/card/507")
      .end((err, res) => {
        const expected = {
          "_id": "507",
          "word": "agile",
          "definition": "software methodology",
          "__v": 0
        }

        expect(res).to.have.status(400);
        expect(res.body).to.have.property("error");
        done();
      })
  })

  it("Should give error for nonexistent id", (done) => {
    chai.request(app)
      .get("/api/set/5ac74cccc65aac3e0c4b6cde/card/507f1f77bcf86cd799439444")
      .end((err, res) => {
        const expected = {
          "_id": "507f1f77bcf86cd799439444",
          "word": "agile",
          "definition": "software methodology",
          "__v": 0
        }

        expect(res).to.have.status(400);
        expect(res.body).to.have.property("error");
        expect(res.body.error).to.equal("Flashcard does not exist");
        done();
      })
  })

  it("Should find the card given correct id", (done) => {
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
        expect(res.body).to.have.property("_id");
        expect(res.body).to.have.property("word");
        expect(res.body).to.have.property("definition");
        expect(res.body).to.have.property("__v");
        expect(res.body._id).to.equal("507f1f77bcf86cd799439011");
        expect(res.body.word).to.equal("agile");
        expect(res.body.definition).to.equal("software methodology");
        expect(res.body.__v).to.equal(0);
        done();
      })
  })
})

describe("Test POST /api/set/:id/card/create", (done) => {
  it("Should not create card when missing word", (done) => {
    chai.request(app)
      .post("/api/set/5ac74cccc65aac3e0c4b6cde/card/create")
      .send({"word": "", "definition": "a tree data structure with exactly two children"})
      .end((err, res) => {

        expect(res).to.have.status(400);
        expect(res.body).to.have.property("error");
        expect(res.body.error).to.equal("Please make sure all fields are entered");
        done();
      })
  })

  it("Should not create card when missing definition", (done) => {
    chai.request(app)
      .post("/api/set/5ac74cccc65aac3e0c4b6cde/card/create")
      .send({"word": "avl tree", "definition": ""})
      .end((err, res) => {

        expect(res).to.have.status(400);
        expect(res.body).to.have.property("error");
        expect(res.body.error).to.equal("Please make sure all fields are entered");
        done();
      })
  })

  it("Should not create card when given bad format id", (done) => {
    chai.request(app)
      .post("/api/set/5ac74cccc65aac3e0c4b1234/card/create")
      .send({"word": "avl tree", "definition": ""})
      .end((err, res) => {

        expect(res).to.have.status(400);
        expect(res.body).to.have.property("error");
        done();
      })
  })

  it("Should not create card when id doesn't exist", (done) => {
    chai.request(app)
      .post("/api/set/5ac74cccc65aac3e0c4b1234/card/create")
      .send({"word": "avl tree", "definition": "a self-balancing tree"})
      .end((err, res) => {

        expect(res).to.have.status(400);
        expect(res.body).to.have.property("error");
        expect(res.body.error).to.equal("FlashcardSet does not exist");
        done();
      })
  })

  it("Should create card when all fields are entered", (done) => {
    chai.request(app)
      .post("/api/set/5ac74cccc65aac3e0c4b6cde/card/create/")
      .send({"word": "binary tree", "definition": "a tree data structure with exactly two children"})
      .end((err, res) => {

        expect(res).to.have.status(200);
        expect(res.body.set).to.have.property("_id");
        expect(res.body.set).to.have.property("flashcards");
        expect(res.body.set).to.have.property("name");
        expect(res.body.set).to.have.property("__v");
        expect(res.body.set._id).to.equal("5ac74cccc65aac3e0c4b6cde");
        expect(res.body.set.flashcards.length).to.equal(3);
        expect(res.body.set.flashcards[0]).to.equal("507f1f77bcf86cd799439011");
        expect(res.body.set.flashcards[1]).to.equal("507f191e810c19729de860ea");
        expect(res.body.set.name).to.equal("cse100");
        expect(res.body.set.__v).to.equal(1);
        done();
      })
  })
})

describe("Test PATCH /api/set/:id/card/update/:cardId", (done) => {
  it("Should not update card when missing word", (done) => {
    chai.request(app)
      .patch("/api/set/5ac74cccc65aac3e0c4b6cde/card/update/507f")
      .send({"word": "", "definition": "A newer form of software methodology"})
      .end((err, res) => {

        expect(res).to.have.status(400);
        expect(res.body).to.have.property("error");
        expect(res.body.error).to.equal("Please make sure all fields are entered");
        done();
      })
  })

  it("Should not update card when missing definition", (done) => {
    chai.request(app)
      .patch("/api/set/5ac74cccc65aac3e0c4b6cde/card/update/507f")
      .send({"word": "agile methodology", "definition": ""})
      .end((err, res) => {

        expect(res).to.have.status(400);
        expect(res.body).to.have.property("error");
        expect(res.body.error).to.equal("Please make sure all fields are entered");
        done();
      })
  })

  it("Should not update card when id is badly formatted", (done) => {
    chai.request(app)
      .patch("/api/set/5ac74cccc65aac3e0c4b6cde/card/update/507f")
      .send({"word": "agile methodology", "definition": "A newer form of software methodology"})
      .end((err, res) => {

        expect(res).to.have.status(400);
        expect(res.body).to.have.property("error");
        done();
      })
  })

  it("Should not update card when id doesn't exist", (done) => {
    chai.request(app)
      .patch("/api/set/5ac74cccc65aac3e0c4b6cde/card/update/507f1f77bcf86cd799431234")
      .send({"word": "agile methodology", "definition": "A newer form of software methodology"})
      .end((err, res) => {

        expect(res).to.have.status(400);
        expect(res.body).to.have.property("error");
        expect(res.body.error).to.equal("Flashcard does not exist");
        done();
      })
  })

  it ("Should update card when all fields are entered", (done) => {
    chai.request(app)
      .patch("/api/set/5ac74cccc65aac3e0c4b6cde/card/update/507f1f77bcf86cd799439011")
      .send({"word": "agile methodology", "definition": "A newer form of software methodology"})
      .end((err, res) => {

        expect(res).to.have.status(200);
        expect(res.body.card).to.have.property("_id");
        expect(res.body.card).to.have.property("word");
        expect(res.body.card).to.have.property("definition");
        expect(res.body.card).to.have.property("__v");
        expect(res.body.card._id).to.equal("507f1f77bcf86cd799439011");
        expect(res.body.card.word).to.equal("agile methodology");
        expect(res.body.card.definition).to.equal("A newer form of software methodology");
        expect(res.body.card.__v).to.equal(0);
        done();
      })
  })
})

describe("Test DELETE /api/set/:id/card/:cardId", () => {
    let requester = chai.request(app).keepOpen();
    let authToken = null;

    before("Logging in", (done) => {
      requester.post("/api/user/login")
        .send({username: "awesomename", password: "easypass"})
        .end((err, res) => {
          authToken = res.body.token;
          done();
        })
    });

    it ("Shouldn't work if not authenticated", (done) => {
      requester.delete("/api/set/5ac74cccc65aac3e0c4b6cde/card/delete/507f191e810c19729de860ea")
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property("msg");
          expect(res.body.msg).to.equal("Missing token. Authorization denied.");
          done();
        })
    });

    it ("Should delete the card as well as the card id in the set", (done) => {
      requester.delete("/api/set/5ac74cccc65aac3e0c4b6cde/card/delete/507f191e810c19729de860ea")
        .set("x-auth-token", authToken)
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.equal("Flashcard deleted");
          return requester.get("/api/set/5ac74cccc65aac3e0c4b6cde");
        })
        .then((res) => {
          expect(res).to.have.status(200);
          console.log(res.body.flashcards);
          expect(res.body.flashcards.filter((flashcard) => flashcard._id === "507f191e810c19729de860ea"))
            .to.have.length(0);
          requester.close();
          done();
        })
        .catch((err) => {
          requester.close();
          done(err);
        })
        
    })

})