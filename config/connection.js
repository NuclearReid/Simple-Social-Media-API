
// this is all here just to connect the code to the mongo Database
const { connect, connection } = require('mongoose');

const connectionString = 'mongodb://127.0.0.1:27017/socialMediaDB';

connect(connectionString);

module.exports = connection;
