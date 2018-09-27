//dependencies for app
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
//setting up express app
const app = express();
app.use(cors());
let PORT = process.env.PORT || 9090;
//requiring models

const db = require('./models');

//setting up Express app to handle data parsing
app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());
app.use(express.static('client'));

//Requiring routes for the server
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);
//-----------------------------------

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
    });
  }

//syncing sequelize models and starting Express
db.sequelize.sync().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`App listening on PORT ${PORT}`);
    });
});