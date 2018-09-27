// Set up MySQL connection.
const mysql = require("mysql");
let connection;
if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    //dis her 4 local runnins... ok?  swiper no swiping!
    connection = mysql.createConnection({
        host: "localhost",
        port: 9090,
        user: "root",
        password: "password",
        database: "jobbies"
    });
};

// Make connection.
connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});

// Export connection for our ORM to use.
module.exports = connection;