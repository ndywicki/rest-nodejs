/**
 * Module dependencies.
 */

require('./response');

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , db = exports.db = require('./db')()
  , app = module.exports = express()
  , server = http.createServer(app);


app.configure(function(){
  app.db = db;
  app.server = server;
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  //app.use(express.favicon());
  //app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);


app.post('/bookmarks', function (req, res) {
  if ('undefined' != typeof req.body.id) {
    res.respond(new Error('Bookmark ID must not be defined'), 400);
  } else {
    db.save(req.body, function (err, bookmark, created) {
      res.respond(err || bookmark, err ? 500 : 200);
    });
  }
});

app.get('/bookmarks', function (req, res) {
  db.fetchAll(function (err, ids) {
    res.respond(err || ids.map(function (id) {
      return '/bookmarks/bookmark/' + id;
    }), err ? 500 : 200);
  });
});

app.get('/bookmarks/bookmark/:id', function (req, res) {
  if (isNaN(parseInt(req.param('id')))) {
    res.respond(new Error('ID must be a valid integer'), 400);
  }
  db.fetchOne(req.param('id'), function (err, bookmark) {
    if (err) {
      if (err.type == 'ENOTFOUND') res.respond(err, 404);
      else res.respond(err, 500);
    } else res.respond(bookmark, 200);
  });
});

app.put('/bookmarks/bookmark/:id', function (req, res) {
  var id = req.param('id');
  if (isNaN(parseInt(req.param('id')))) {
    res.respond(new Error('ID must be a valid integer'), 400);
  } else if ('undefined' != typeof req.body.id && req.body.id != id) {
    res.respond(new Error('Invalid bookmark ID'), 400);
  } else {
    req.body.id = id;
    db.save(req.body, function (err, bookmark, created) {
      if (err) {
        if (err.type == 'ENOTFOUND') res.respond(err, 404);
        else res.respond(err, 500);
      } else res.respond(bookmark, 200);
    })
  }
});

app.del('/bookmarks', function (req, res) {
  db.deleteAll(function (err, deleted) {
    res.respond(err || deleted, err ? 500 : 200);
  });
});

app.del('/bookmarks/bookmark/:id', function (req, res) {
  var id = req.param('id');
  if (isNaN(parseInt(req.param('id')))) {
    res.respond(new Error('ID must be a valid integer'), 400);
  } else {
    db.deleteOne(id, function (err, deleted) {
      if (err) {
        if (err.type == 'ENOTFOUND') res.respond(err, 404);
        else res.respond(err, 500);
      } else res.respond(deleted, 200);
    });
  }
});

app.all('/bookmarks/?*', function (req, res) {
  res.respond(405);
});

//if (module.parent === null) {
  app.server.listen(3000);
  console.log("Express server listening on port %d in %s mode", app.server.address().port, app.settings.env);
//}


app.on('close', db.close); // Close open DB connection when server exits
