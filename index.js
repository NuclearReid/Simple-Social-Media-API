const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

// cwd stands for 'current working directory'
//  used to let me know where/what file the server is running
const cwd = process.cwd();

const PORT = process.env.PORT || 3001;
const app = express();

// this is where cwd is used and sets it to activity which is used in the console log
const activity = cwd.includes('./social-media-api')
  ? cwd.split('social-media-api')[1]
  : cwd;

// the basic middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// db.once() is a MongoDB object modeling tool for Node.js
//    basically db.once() will start the server only after the connection to the db was successfull 
db.once('open', () =>{
    app.listen(PORT, () => {
        console.log(`API server for ${activity} is running on port ${PORT}`);
    });
});