const express = require('express');
const app = express();

// Env
require('dotenv').config()

// Global Configs
require('./configs/global.config');

// Cors
const cors = require('cors')
app.use(cors())

// Body Parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
const appRoutes = require('./routes');
appRoutes(app);

app.listen(process.env.PORT, () => {
  console.log(`App listening at http://localhost:${process.env.PORT}`)
})