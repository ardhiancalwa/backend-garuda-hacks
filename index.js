'use strict';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config/config.js');

// ROUTER API
const userRoutes = require('./routes/user-routes');
const mentorRoutes = require('./routes/mentor-routes.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.use('/api', userRoutes.routes);
app.use('/api', mentorRoutes.routes);
// app.use('/api', projectRoutes.routes);

app.listen(config.port, () => console.log('listening on port ' + config.port));