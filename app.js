require('dotenv').config();

const cors = require("cors")
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const auth = require('./routes/auth.route');
const { sequelize } = require('./db');


const app = express();
const PORT = process.env.PORT || 3005;
// app.use(cors());
app.use(bodyParser.json());
app.use(cors())

app.use('/auth', auth);

sequelize.sync({ force: false })
    .then(() => {
        console.log('Database synced');
    })
    .catch(err => {
        console.error('Error syncing database:', err);
    });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});