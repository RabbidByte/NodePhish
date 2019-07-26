var http = require('http');
var https = require('https');
var fs=require('fs');
var privateKey  = fs.readFileSync('sslcert/privkey.pem', 'utf8');
var certificate = fs.readFileSync('sslcert/cert.pem', 'utf8');
var ca = fs.readFileSync('sslcert/chain.pem', 'utf8');
var credentials = {key: privateKey, cert: certificate};
var express=require('express');
var stylus=require('stylus');
var nib = require('nib');
var app=express();
var path = require('path');
var logEntry = require('./log.js');
var date = require('node-datetime');

app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded());

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

//main app
app.get('/connect', function(req, res){
	//IP work
	var ip = req.connection.remoteAddress;
	ip = ip.replace(/^.*:/, '');
	//date and time
	var dt = date.create();
	var dtDate = dt.format('Y-m-d');
	var dtTime = dt.format('H:M:S');
	//parameter stuff
	var userString = req.query.id;
	if (typeof userString == 'undefined') {
	//url does not contain id string
		logEntry.logError(dtDate, dtTime, ip, 'No ID in URL');
		res.render('success', {
			message: "404 - page not found"
		});
		res.end();
	} else {
	//the url is good
		logEntry.logAccess(dtDate, dtTime, ip, userString);
		res.render('index', {
			id: userString
		});
	}
});

//POST to /signin page
app.post('/signin', function(req, res){
	//IP work
	var ip = req.connection.remoteAddress;
	ip = ip.replace(/^.*:/, '');
	//date and time
	var dt = date.create();
	var dtDate = dt.format('Y-m-d');
	var dtTime = dt.format('H:M:S');
	//parameter stuff
	var userString = req.body.id;
	var userName = req.body.UserName;
	var userPassword = req.body.Password;
	if ((userString == '') || (userName == '') || (userPassword == '')) {
	//url does not contain id string
		logEntry.logError(dtDate, dtTime, ip, 'No ID in URL');
		res.render('success', {
			message: "404 - page not found"
		});
	} else {
	//the url is good
		logEntry.logUser(dtDate, dtTime, ip, userString, userName, userPassword);
		res.render('success', {
			message: "Thank You! Your request has been processed and additional space has been assigned."
		});
	}
});

//The default / page
app.get('/', function(req, res){
	//IP work
	var ip = req.connection.remoteAddress;
	ip = ip.replace(/^.*:/, '');
	//date and time
	var dt = date.create();
	var dtDate = dt.format('Y-m-d');
	var dtTime = dt.format('H:M:S');
	//parameter stuff
	logEntry.logError(dtDate, dtTime, ip, 'Root site Access');
	res.writeHead(301, {
		Location: 'http://www.COMPANY.com'
	});
	res.end();
});

//404 bad url page
//app.get('/404-badurl', function(req, res){
//	res.render('index', {
//		title:'404 - Bad URL',message:'Page Not Found'
//	});
//});

//Start the server and listen
//var server=app.listen(80,function(){});
httpServer.listen(80,function(){});
httpsServer.listen(443,function(){});
