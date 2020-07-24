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

  it("Shouldn't work without login", (done) => {
    requester.get("/api/set/5ac74cccc65aac3e0c4b6cde/card/507")
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.have.property("msg");
        done();
      })
  })

  it("Should give error for bad format id", (done) => {
    requester.get("/api/set/5ac74cccc65aac3e0c4b6cde/card/507")
      .set("x-auth-token", authToken)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property("error");
        done();
      })
  })

  it("Should give error for nonexistent id", (done) => {
    requester.get("/api/set/5ac74cccc65aac3e0c4b6cde/card/507f1f77bcf86cd799439444")
      .set("x-auth-token", authToken)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property("error");
        expect(res.body.error).to.equal("Flashcard does not exist");
        done();
      })
  })

  it("Should find the card given correct id", (done) => {
    requester.get("/api/set/5ac74cccc65aac3e0c4b6cde/card/507f1f77bcf86cd799439011")
      .set("x-auth-token", authToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("_id");
        expect(res.body).to.have.property("word");
        expect(res.body).to.have.property("definition");
        expect(res.body).to.have.property("__v");
        expect(res.body._id).to.equal("507f1f77bcf86cd799439011");
        expect(res.body.word).to.equal("agile");
        expect(res.body.definition).to.equal("software methodology");
        expect(res.body.__v).to.equal(0);
        requester.close();
        done();
      })
  })
})

describe("Test POST /api/set/:id/card/create", (done) => {
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

  it("Shouldn't work without login", (done) => {
    requester.post("/api/set/5ac74cccc65aac3e0c4b6cde/card/create")
      .send({"word": "", "definition": "a tree data structure with exactly two children"})
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.have.property("msg");
        done();
      })
  });

  it("Should not create card when missing word", (done) => {
    requester.post("/api/set/5ac74cccc65aac3e0c4b6cde/card/create")
      .set("x-auth-token", authToken)
      .send({"word": "", "definition": "a tree data structure with exactly two children"})
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property("error");
        expect(res.body.error).to.equal("Please make sure all fields are entered");
        done();
      })
  })

  it("Should not create card when missing definition", (done) => {
    requester.post("/api/set/5ac74cccc65aac3e0c4b6cde/card/create")
      .set("x-auth-token", authToken)
      .send({"word": "avl tree", "definition": ""})
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property("error");
        expect(res.body.error).to.equal("Please make sure all fields are entered");
        done();
      })
  })

  it("Should not create card when given bad format id", (done) => {
    requester.post("/api/set/5ac74cccc65aac3e0c4b1234/card/create")
      .set("x-auth-token", authToken)
      .send({"word": "avl tree", "definition": ""})
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property("error");
        done();
      })
  })

  it("Should not create card when id doesn't exist", (done) => {
    requester.post("/api/set/5ac74cccc65aac3e0c4b1234/card/create")
      .set("x-auth-token", authToken)
      .send({"word": "avl tree", "definition": "a self-balancing tree"})
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property("error");
        expect(res.body.error).to.equal("FlashcardSet does not exist");
        done();
      })
  })

  it("Should create card when all fields are entered", (done) => {
    requester.post("/api/set/5ac74cccc65aac3e0c4b6cde/card/create/")
      .set("x-auth-token", authToken)
      .send({"word": "binary tree", "definition": "a tree data structure with exactly two children"})
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.flashcard.word).to.equal("binary tree");
        expect(res.body.flashcard.definition).to.equal("a tree data structure with exactly two children");
        done();
      })
  })

  it("Shouldn't work with a set you don't own", (done) => {
    requester.post("/api/set/5eae0f84f8159e46bc2028c7/card/create/")
      .set("x-auth-token", authToken)
      .send({"word": "yeet", "definition": "yes"})
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.body).to.have.property("error");
        requester.close();
        done();
      })
  });
})

describe("Test PATCH /api/set/:id/card/update/:cardId", () => {
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

  it("Shouldn't work without login", (done) => {
    requester.patch("/api/set/5ac74cccc65aac3e0c4b6cde/card/update/507f")
      .send({"word": "", "definition": "A newer form of software methodology"})
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.have.property("msg");
        done();
      })
  });

  it("Should not update card when missing word", (done) => {
    requester.patch("/api/set/5ac74cccc65aac3e0c4b6cde/card/update/507f")
      .set("x-auth-token", authToken)
      .send({"word": "", "definition": "A newer form of software methodology"})
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property("error");
        expect(res.body.error).to.equal("Please make sure all fields are entered");
        done();
      })
  })

  it("Should not update card when missing definition", (done) => {
    requester.patch("/api/set/5ac74cccc65aac3e0c4b6cde/card/update/507f")
      .set("x-auth-token", authToken)
      .send({"word": "agile methodology", "definition": ""})
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property("error");
        expect(res.body.error).to.equal("Please make sure all fields are entered");
        done();
      })
  })

  it("Should not update card when id is badly formatted", (done) => {
    requester.patch("/api/set/5ac74cccc65aac3e0c4b6cde/card/update/507f")
      .set("x-auth-token", authToken)
      .send({"word": "agile methodology", "definition": "A newer form of software methodology"})
      .end((err, res) => {
        expect(res).to.have.status(500);
        expect(res.body).to.have.property("error");
        done();
      })
  })

  it("Should not update when set doesn't exist", (done) => {
    requester.patch("/api/set/123456789012/card/update/123456789012")
      .set("x-auth-token", authToken)
      .send({"word": "test", "definition": "test2"})
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property("error");
        done();
      })
  });

  it("Should not update card when id doesn't exist", (done) => {
    requester.patch("/api/set/5ac74cccc65aac3e0c4b6cde/card/update/507f1f77bcf86cd799431234")
      .set("x-auth-token", authToken)
      .send({"word": "agile methodology", "definition": "A newer form of software methodology"})
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property("error");
        expect(res.body.error).to.equal("Flashcard does not exist");
        done();
      })
  })

  it ("Should update card when all fields are entered", (done) => {
    requester.patch("/api/set/5ac74cccc65aac3e0c4b6cde/card/update/507f1f77bcf86cd799439011")
      .set("x-auth-token", authToken)
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
  });

  it ("Shouldn't work with a set you don't own", (done) => {
    requester.patch("/api/set/5eae0f84f8159e46bc2028c7/card/update/123")
      .set("x-auth-token", authToken)
      .send({"word": "fafafa", "definition": "test"})
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.body).to.have.property("error");
        requester.close();
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

    it("Shouldn't work if not authenticated", (done) => {
      requester.delete("/api/set/5ac74cccc65aac3e0c4b6cde/card/delete/507f191e810c19729de860ea")
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property("msg");
          expect(res.body.msg).to.equal("Missing token. Authorization denied.");
          done();
        })
    });

    it("Shouldn't delete if set doesn't exist", (done) => {
      requester.delete("/api/set/123456789012/card/delete/123456789012")
        .set("x-auth-token", authToken)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property("error");
          done();
        })
    });

    it("Shouldn't delete if user is not owner of set", (done) => {
      requester.delete("/api/set/5eae0f84f8159e46bc2028c7/card/delete/123456789012")
        .set("x-auth-token", authToken)
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body).to.have.property("error");
          done();
        })
    })

    it("Should delete the card as well as the card id in the set", (done) => {
      requester.delete("/api/set/5ac74cccc65aac3e0c4b6cde/card/delete/507f191e810c19729de860ea")
        .set("x-auth-token", authToken)
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.equal("Flashcard deleted");
          return requester.get("/api/set/5ac74cccc65aac3e0c4b6cde");
        })
        .then((res) => {
          expect(res).to.have.status(200);
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