const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp);
const app = require("../../../server");
const { request } = require("chai");

const testSetBiologyId = "5eae0f84f8159e46bc2028c7";
const testSetCSE100Id = "5ac74cccc65aac3e0c4b6cde";
const testCardAgileId = "507f1f77bcf86cd799439011";
const testCardWaterfallId = "507f191e810c19729de860ea";

describe("Test GET /api/set/:id", () => {
  it("Should give error for bad format id", (done) => {
    chai.request(app)
      .get("/api/set/5eae0f")
      .end((err, res) => {
        
        expect(res).to.have.status(400);
        expect(res.body).to.have.property("error");
        done();
      })
  })

  it("Should give error for nonexisting id", (done) => {
    chai.request(app)
      .get("/api/set/5eae0f84f8159e46bc2028c6")
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property("error");
        expect(res.body.error).to.equal("Flashcard set does not exist");
        done();
      })
  })

  it("Should give correct value for existing id and empty flashcards", (done) => {
    chai.request(app)
      .get("/api/set/5eae0f84f8159e46bc2028c7")
      .end((err, res) => {
        const expected = {
          "_id": "5eae0f84f8159e46bc2028c7",
          "flashcards": [],
          "name": "Biology",
          "__v": 0
        }
        
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("_id");
        expect(res.body).to.have.property("flashcards");
        expect(res.body).to.have.property("name");
        expect(res.body).to.have.property("__v");
        expect(res.body._id).to.equal("5eae0f84f8159e46bc2028c7");
        expect(res.body.flashcards.length).to.equal(0);
        expect(res.body.name).to.equal("Biology");
        expect(res.body.__v).to.equal(0);
        done();
      })
  })

  it("Should give correct value for existing id and filled flashcards", (done) => {
    chai.request(app)
      .get("/api/set/5ac74cccc65aac3e0c4b6cde")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("_id");
        expect(res.body).to.have.property("flashcards");
        expect(res.body).to.have.property("name");
        expect(res.body).to.have.property("__v");
        expect(res.body._id).to.equal("5ac74cccc65aac3e0c4b6cde");
        expect(res.body.flashcards.length).to.equal(2);
        expect(res.body.flashcards[0]._id).to.equal("507f1f77bcf86cd799439011");
        expect(res.body.name).to.equal("cse100");
        expect(res.body.__v).to.equal(1);
        done();
      })
  })
})

describe("Test PATCH /api/set/update", () => {
  let requester = chai.request(app).keepOpen();
  let authToken = null;

  before("Logging in", (done) => {
    requester.post("/api/user/login")
      .send({"username": "coolname", "password": "hardpass"})
      .end((err, res) => {
        authToken = res.body.token;
        done();
      })
  });

  it("Should make sure the user is logged in", (done) => {
    requester.patch(`/api/set/update/${testSetBiologyId}`)
      .send({"name": "qef"})
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.have.property("msg");
        done();
      })
  });

  it("Should make sure all fields are entered", (done) => {
    requester.patch(`/api/set/update/${testSetBiologyId}`)
      .set("x-auth-token", authToken)
      .send({"name": ""})
      .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property("error");
          done();
      })
  });

  it("Should update set when name field is entered", (done) => {
    requester.patch(`/api/set/update/${testSetBiologyId}`)
      .set("x-auth-token", authToken)
      .send({"name": "BiologyC"})
      .then((res) => {
          expect(res).to.have.status(200);
          expect(res.body.name).to.equal("BiologyC");
          return requester.patch(`/api/set/update/${testSetBiologyId}`)
            .set("x-auth-token", authToken)
            .send({"name": "Biology"});
      })
      .then((res) => {
        done();
      })
      .catch((err) => {
        done(err);
      })
  })

  it("Should give error for nonexistent id", (done) => {
      requester.patch("/api/set/update/123456789012")
        .set("x-auth-token", authToken)
        .send({"name": "notwork"})
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property("error");
          expect(res.body.error).to.equal("Flashcard set with id 123456789012 does not exist");
          done();
        })
  })

  it("Should make sure the user is the creator of the set", (done) => {
    requester.patch("/api/set/update/5ac74cccc65aac3e0c4b6cde")
      .set("x-auth-token", authToken)
      .send({"name": "notwork"})
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.body).to.have.property("error");

        requester.close();
        done();
      })
  })
})

describe("Test POST /api/set/search", () => {
    it("Should make sure all fields are entered", (done) => {
        chai.request(app)
          .post("/api/set/search")
          .end((err, res) => {
              expect(res).to.have.status(400);
              expect(res.body).to.have.property("error");
              done();
          })
    });

    it("Should get a list of sets when name field is entered", (done) => {
        chai.request(app)
        .post("/api/set/search")
        .send({name: "Biology"})
        .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body[0].name).to.equal("Biology");
            done();
        })
    })

    it("Should give error for nonexistent name", (done) => {
        chai.request(app)
        .post("/api/set/search")
        .send({name: "notexist"})
        .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body).to.have.property("error");
            expect(res.body.error).to.equal(`Flashcard set with name notexist does not exist`);
            done();
          
        })
    })
});

describe("Test POST /api/set/create", () => {
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

  it("Should make sure all fields are entered", (done) => {
    requester.post("/api/set/create")
      .set("x-auth-token", authToken)
      .send({"name": ""})
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property("error");
        done();
      })
  })

  it("Should create set when all fields entered", (done) => {
      requester.post("/api/set/create")
        .set("x-auth-token", authToken)
        .send({"name": "Biology Terms"})
        .end((err, res) => {
          console.log(res.body);
          expect(res).to.have.status(200);
          expect(res.body).to.have.property("name");
          expect(res.body).to.have.property("flashcards");
          expect(res.body.name).to.equal("Biology Terms");
          expect(res.body.flashcards.length).to.equal(0);
          done();
        })
  })

  
  it ("Should allow create of same name", (done) => {
      requester.post("/api/set/create")
        .set("x-auth-token", authToken)
        .send({"name": "cse100"})
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property("name");
          expect(res.body).to.have.property("flashcards");
          expect(res.body.name).to.equal("cse100");
          expect(res.body.flashcards.length).to.equal(0);

          done();
        })
  })

  it("Should be able to create with flashcards passed in", (done) => {
    requester.post("/api/set/create")
    .set("x-auth-token", authToken)
    .send({"name": "testFlashcards", "flashcards": [
      {
        word: "test1",
        definition: "def1"
      },
      {
        word: "test2",
        definition: "def2"
      }
    ]})
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body).to.have.property("name");
      expect(res.body).to.have.property("flashcards");
      expect(res.body.flashcards).to.have.length(2);
      expect(res.body.name).to.equal("testFlashcards");

      requester.close();
      done();
    })
  });
})


describe("Test GET /api/set (i.e. current user's sets)", () => {
    it ("Shouldn't work without login", (done) => {
        chai.request(app)
          .get("/api/set")
          .end((err, res) => {
            expect(res).to.have.status(401);
            expect(res.body).to.have.property("msg");
            expect(res.body.msg).to.equal("Missing token. Authorization denied.");
            done();
          })
    })

    it ("Should get the appropriate sets when logged in", (done) => {
      let requester = chai.request(app).keepOpen();

      requester.post('/api/user/login')
        .send({"username": "awesomename", "password": "easypass"})
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property("token");
          expect(res.body).to.have.property("user");
          expect(res.body.user).to.have.property("id");
          expect(res.body.user).to.have.property("username");

          return requester.get('/api/set').set("x-auth-token", res.body.token);
        })
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.length(4);
          requester.close();
          done();
        })
        .catch((err) => {
          requester.close();
          done(err);
        })
    })
})

describe("Test GET /api/set/names (i.e. get all unique set names)", () => {
  it ("Should get the appropriate names", (done) => {
    chai.request(app)
      .get("/api/set/names")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.length(4);
        expect(res.body).to.include("Biology");
        expect(res.body).to.include("Biology Terms");
        expect(res.body).to.include("cse100");
        done();
      });
  })
})

describe("Test DELETE /api/set/delete/:id", () => {
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

  it ("Should make sure set exists", (done) => {
        requester.delete("/api/set/delete/123456789012")
          .set("x-auth-token", authToken)
          .end((err, res) => {
              expect(res).to.have.status(400);
              expect(res.body).to.have.property("error");
              done();
          })
  })

  it ("Should make sure it is the correct user deleting the set", (done) => {
      requester.delete("/api/set/delete/5eae0f84f8159e46bc2028c7")
        .set("x-auth-token", authToken)
        .end((err, res) => {
            expect(res).to.have.status(403);
            expect(res.body).to.have.property("error");
            done();
        })
  });

  it ("Should make sure the set is deleted", (done) => {
      requester.delete(`/api/set/delete/${testSetCSE100Id}`)
        .set("x-auth-token", authToken)
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property("msg");
          return requester.get(`/api/set/${testSetCSE100Id}/card/${testCardAgileId}`)
                  .set("x-auth-token", authToken);
        })
        .then((res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property("error");
          return requester.get(`/api/set/${testSetCSE100Id}/card/${testCardWaterfallId}`)
                  .set("x-auth-token", authToken);
        })
        .then((res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property("error");
          requester.close();
          done();            
        })
        .catch((err) => {
          requester.close();
          done(err);
        })
  })
})