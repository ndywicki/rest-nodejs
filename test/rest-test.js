const PORT = 3000;
var assert = require('assert')
  , app = require('../app')
  , bookmark = {
      "title": "Google",
      "url":   "http://www.google.com",
      "tags":  [ "google", "search" ]
    }
  , dummy = { "": ""}
  , expected_id = 1
 
// Configure REST API host & URL
require('api-easy')
.describe('bookmarks-rest')
.use('localhost', PORT)
.root('/bookmarks')
 
// Initially: start server
.expect('Start server', function () {
  app.db.configure({namespace: 'bookmarks-test-rest'});
  app.server.listen(PORT);
}).next()


// 1. Empty database
.setHeader('Content-Type', 'text/html')
.del()
.expect(200)
.next()


// 2. Add a new bookmark
.setHeader('Content-Type', 'application/json')
.post(bookmark)
.expect('Has ID', function (err, res, body) {
  var obj;
  assert.doesNotThrow(function() { obj = JSON.parse(body) }, SyntaxError);
  assert.isObject(obj);
  assert.include(obj, 'id');
  assert.equal(expected_id, obj.id);
  bookmark.id = obj.id;
})
.undiscuss().next()
 
// 3.1. Check that the freshly created bookmark appears
.setHeader('Content-Type', 'text/html')
.get()
.expect('Collection', function (err, res, body) {
  var obj;
  assert.doesNotThrow(function() { obj = JSON.parse(body) }, SyntaxError);
  assert.isArray(obj);
  assert.include(obj, '/bookmarks/bookmark/' + expected_id);
})

// 3.2. Get the freshly created bookmark
.setHeader('Content-Type', 'text/html')
.get('/bookmark/' + expected_id)
.expect('Found bookmark', function (err, res, body) {
  var obj;
  assert.doesNotThrow(function() { obj = JSON.parse(body) }, SyntaxError);
  assert.deepEqual(obj, bookmark);
})
.next()

// 4. Update bookmark
.setHeader('Content-Type', 'application/json')
.put('/bookmark/' + expected_id, {"title": "Google.com"})
.expect('Updated bookmark', function (err, res, body) {
  var obj;
  assert.doesNotThrow(function() { obj = JSON.parse(body) }, SyntaxError);
  bookmark.title = "Google.com";
  assert.deepEqual(obj, bookmark);
})
.next()

// 5. Delete bookmark
.setHeader('Content-Type', 'text/html')
.del('/bookmark/' + expected_id)
.expect(200)
.next()
 
// 6. Check deletion
.setHeader('Content-Type', 'text/html')
.get('/bookmark/' + expected_id)
.expect(404)
.next()
 
// 7. Check all bookmarks are gone
.setHeader('Content-Type', 'text/html')
.get()
.expect('Empty database', function (err, res, body) {
  var obj;
  assert.doesNotThrow(function() { obj = JSON.parse(body) }, SyntaxError);
  assert.isArray(obj);
  assert.equal(obj.length, 0);
})

// 8. Test unallowed methods
.setHeader('Content-Type', 'text/html')
.post('/bookmark/' + expected_id).expect(405)
.put().expect(405)

// Finally: clean, and stop server
.expect('Clean & exit', function () {
  app.db.deleteAll(function () { app.close() });
})

// Export tests for Vows
.export(module)