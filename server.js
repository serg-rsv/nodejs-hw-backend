const { connect } = require('mongoose');

const app = require('./app');

const { DB_HOST, PORT = 3000 } = process.env;

connect(DB_HOST)
  .then(() => {
    console.log('Database connection successful');
    app.listen(PORT);
  })
  .then(() => {
    console.log('Server running. Use our API on port: 3000');
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
