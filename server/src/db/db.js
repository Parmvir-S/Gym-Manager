const mysql = require("mysql");

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password",
    database: "gym"
});

db.connect(function(error){
	if(error){
        console.log("Error", error.stack);
        console.log("Error", error.name);
        console.log("Error", error.message);
        throw Error("help?");
    }
	else {
		console.log('DB has connected properly');
	}
});

module.exports = db;