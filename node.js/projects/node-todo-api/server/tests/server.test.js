// start monogodb: ./mongod --dbpath ~/mongo-data/

const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');
const {todos, populateTodos, users, populateUsers} = require('./seed/seed');
const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('GET /todos', () => {
  it('should return a list of todos', (done) => {

    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      }).end(done);
      // .end((err, res) => {
      //   if (err) {
      //     return done(err);
      //   }
      //
      //   Todo.find().then((todos) => {
      //     expect(todos.length).toBe(2);
      //     done();
      //   }).catch((e) => done(e));
      // });

  });
});

describe('GET /todos/:id', () => {
  it('should return a todo from valid id', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('should return 404 if todo not found', (done) => {
    var id = new ObjectID().toHexString();

    request(app)
      .get(`/todos/${id}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 for non-object ids', (done) => {
    request(app)
      .get('/todos/123')
      .expect(404)
      .end(done);
  });
});

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test text todo';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
         if (err) {
           return done(err);
         }

         Todo.find({text}).then((todos) => {
           expect(todos.length).toBe(1);
           expect(todos[0].text).toBe(text);
           done();
         }).catch((e) => done(e));
       });
  });

  it('should not create todo with invalid body data', (done) => {

    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }). catch((e) => done(e));
      });
  });
});

describe('DELETE /todos/:id', () => {
  it('should fail if invalid id is provided', (done) => {
    var invalidId = '123abc';

    request(app)
      .delete(`/todos/${invalidId}`)
      .expect(404)
      .end(done);
  });


  it('should return an error if id is not found', (done) => {
    var nonExistingId = new ObjectID().toHexString();

    request(app)
      .delete(`/todos/${nonExistingId}`)
      .expect(400)
      .end(done);
  });

  it('should return a todo doc that was deleted', (done) => {
    var id = todos[0]._id.toHexString();

    request(app)
      .delete(`/todos/${id}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(id);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.findById(id).then((todo) => {
          expect(todo).toBeFalsy();
          done();
        }).catch((e) => done(e));
      });
  });
});

describe('PATCH /todo/:id', () => {
  // it('should return 404 if object is invalid', (done) => {
  //
  // });
  //
  // it('should return 404 if object is not found', (done) => {
  //
  // });

  it('should update and return the updated object', (done) => {
    var newText = 'Updated text from mocha';
    var id = todos[0]._id.toHexString();

    request(app)
      .patch(`/todos/${id}`)
      .send({completed: true, text: newText})
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.completed).toBeTruthy();
        expect(res.body.todo.text).toBe(newText);
      })
      .end(done);
  });

  it('should clear completedAt if todo is not completed', (done) => {
    var id = todos[1]._id.toHexString();
    var newText = 'Text updated. Completed should be false';

    request(app)
      .patch(`/todos/${id}`)
      .send({text: newText, completed: false})
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(newText);
        expect(res.body.todo.completed).toBeFalsy();
        expect(res.body.todo.completedAt).toBeFalsy();
      })
      .end(done);
  });
});

describe('POST /users', () => {
  it('should create a user', (done) => {
    var email = "maikati@da.eba";
    var password = "mrasenpedal";

    request(app)
      .post('/users')
      .send({email, password})
      .expect(200)
      .expect((res) => {
        expect(res.headers['x-auth']).toBeTruthy();
        expect(res.body._id).toBeTruthy();
        expect(res.body.email).toBe(email);
      })
      .end((err) => {
        if (err) {
          return done(err);
        }

        User.findOne({email}).then((user) => {
          expect(user).toBeTruthy();
          //expect(user.password).toNotEqual(password);
          done();
        }).catch((e) => done(e));
      });
  });

  it('it should return validation errors if request is invalid', (done) => {
    var email = "";
    var password = "";

    request(app)
      .post('/users')
      .send({email, password})
      .expect(400)
      .expect((res) => {
        expect(res.body.errors).toBeTruthy();
      })
      .end(done);
  });

  it('should not create a user if email in use', (done) => {
    var email = 'jen@example.com';
    var password = 'jenjenjen';

    request(app)
      .post('/users')
      .send({email, password})
      .expect(400)
      .expect((res) => {
        expect(res.body.name).toBe('MongoError');
        expect(res.body.code).toBe(11000);
      })
      .end(done);
  });
});

describe('GET /users/me', () => {
  it('should return user if authenticated', (done) => {
    request(app)
      .get('/users/me')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body._id).toBe(users[0]._id.toHexString());
        expect(res.body.email).toBe(users[0].email);
      })
      .end(done);
  });

  it('should return 401 if not authenticated', (done) => {
    request(app)
      .get('/users/me')
      .expect(401)
      .expect((res) => {
        expect(res.body).toEqual({}); // equal empty body
      })
      .end(done);
  });
});

describe('POST /users/login', () => {
  it('should login user and return auth token', (done) => {
    var user = users[0];
    var email = user.email;
    var password = user.password;

    request(app)
      .post('/users/login')
      .send({email, password})
      .expect(200)
      .expect((res) => {
        // expect(res.body._id).toBe(user._id.toHexString());
        // expect(res.body.email).toBe(email);
        expect(res.headers['x-auth']).toBeTruthy();
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        User.findOne(user._id).then((user) => {
          expect(user.tokens[0]).toInclude({
            access: 'auth',
            token: res.headers['x-auth']
          });
          done();
        }).catch((e) => done(e));
      });
  });

  it('should reject invalid login', (done) => {
      var email = (users[1].email).substr(1);
      var password = (users[1].password).substr(1);

      request(app)
        .post('/users/login')
        .send({email, password})
        .expect(400)
        .expect((res) => {
          expect(res.body).toEqual({});
        })
        .end(done);
  });
});
