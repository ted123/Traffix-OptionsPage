var express = require('express'),
	routes = require('./routes'),
	http = require('http'),
	partials = require('express-partials'), 
	path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(partials()); 
app.use(express.cookieParser('traffix'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only -- REMOVE THIS ON DEPLOYMENT
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/routes', routes.routes);
app.get('/options', routes.options);
app.post('/validate', routes.validate);
app.get('/help', routes.help);
app.get('/logout',routes.logout);
app.post('/deleteAccount',routes.deleteAccount);
app.post('/resetPassword',routes.resetPassword);


var server = app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

http.createServer(app);
