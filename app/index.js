var express = require('express'),
    http = require('http'),
    redis = require('redis');

var app = express();

console.log('Demarrage');

// Utiliser l'entree cree dans le /etc/hosts
var client = redis.createClient('6379', 'redis');


app.get('/', function(req, res, next) {
  console.log("*********** beep *********");
  client.incr('compteur', function(err, compteur) {
    if(err) return next(err);
    res.send('compteur = ' + compteur);
  });
});

http.createServer(app).listen(process.env.PORT || 8080, function() {
  console.log('Ecoute sur le port ' + (process.env.PORT || 8080));
});
