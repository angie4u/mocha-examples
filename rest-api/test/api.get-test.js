// Create a server using Restify
var restify = require('restify');

function respond(req, res, next) {
  res.send('hello ' + req.params.name);
  next();
}

var server = restify.createServer();
server.get('/users/:name', respond);

server.listen(5001, function() {
  console.log('%s listening at %s', server.name, server.url);
});

// Run the test code 
var supertest = require('supertest');
const client = supertest.agent('http://localhost:5001');

describe('GET /users', ()=> {
    it('returns users', done => {
        client
        .get('/users')
        .expect('Content-Type',/json/)
        .expect(200)
        .end((err, res)=> {
            if(res.body)
                return done()
        });
    });
});