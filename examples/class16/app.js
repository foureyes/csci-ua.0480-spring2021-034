const mongoose = require('mongoose');
console.log(process.env.FOO);

// this is bad 
// no credentials in code plz!
//
//
if(process.env.NODE_ENV == 'DEV') {
  // if we're in dev mode use configuration for dev
  fs.readFile('config-dev.json', (err, data) => {
    // parse configuration file
    const config = JSON.parse(data);
    // assuming that databaseConnection exists
    mongoose.connect(config.databaseConnection);
  });
} else {
    // if NODE_ENV is not specified, then don't use username and password
    mongoose.connect('mongodb://localhost/dbwhatever/');
}








