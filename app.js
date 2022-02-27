const connectDB = require('./db/connect');
const express = require('express');
const tasks = require('./routes/tasks');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const URL = process.env.MONGO_URI;
const notFound = require('./middleware/not-found')

// Middleware
app.use(express.static('./public'));
app.use(express.json());

// Route
app.use('/api/v1/tasks', tasks);
app.use(notFound);

async function start() {
  try {
    // Connect Database
    await connectDB(URL);
    app.listen(PORT, () => {
      console.log(`Listining to port: ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
