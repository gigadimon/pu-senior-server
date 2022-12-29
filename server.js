const app = require('./app');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
require('dotenv').config();
mongoose.set('strictQuery', false);

async function connect() {
  await mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
  });
  app.listen(8080, () => {
    console.log('Server running. Use our API on port: 8080');
  });
}

connect()
  .then(() => {
    console.log('Database connection successful');
  })
  .catch(err => {
    console.error(err.message);
    process.exit(1);
  });
