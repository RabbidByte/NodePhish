var fs = require('fs');

exports.logAccess = function (date, time, ip, userString) {
	var data = date + "," + time + "," + ip + "," + userString + "\n";
	fs.appendFile("accesslog.txt", data, (err) => {
		if (err) console.log(err);
	});
}

exports.logError = function (date, time, ip, userString) {
	var data = date + "," + time + "," + ip + "," + userString + "\n";
	fs.appendFile("errorlog.txt", data, (err) => {
		if (err) console.log(err);
	});
}

exports.logUser = function (date, time, ip, userString, userName, userPass) {
	var data = date + "," + time + "," + ip + "," + userString + "," + userName + "," + userPass + "\n";
	fs.appendFile("userlog.txt", data, (err) => {
		if (err) console.log(err);
	});
}
