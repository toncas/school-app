const mongoose = require('mongoose');
const config = require('./config');
const app = require('./app');

mongoose.connect(config.dbUri)
  .then(() => console.log('Connected to the database'))
  .catch((error) => console.error('Database connection error:', error));

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
