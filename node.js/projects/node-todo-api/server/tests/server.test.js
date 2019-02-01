const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

beforeEach((done) => {
  Todo.deleteMany({}).then(() => done());
});

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test text todo';

    request(app)
      .post('/todos')
      .send({text})
      .status(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
       .end((err, res) => {
         if (err) {
           return done(err);
         }

         Todo.find().then((todos) => {
           expect(todos.length).toBe(1);
           expect(todos[0].text).toBe(text);
           done();
         });
       });
  });
});
