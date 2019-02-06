// start monogodb: ./mongod --dbpath ~/mongo-data/

const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
  _id: new ObjectID(),
  text: 'First test todo'
}, {
  _id: new ObjectID(),
  completedAt: 333,
  completed: true,
  text: 'Second test todo'
}];

beforeEach((done) => {
  Todo.deleteMany({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
});

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
        expect(res.body.todo.completedAt.valueOf()).toBeA('number');
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
