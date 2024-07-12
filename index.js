'use strict';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config.js');

// ROUTER API
const userRoutes = require('./routes/user-routes');
const mentorRoutes = require('./routes/mentor-routes.js');
const projectRoute = require('./routes/project-routes.js');
const scoreRoutes = require('./routes/scoring-routes.js');
const attendRoutes = require('./routes/attending-routes.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.use('/api', userRoutes.routes);
app.use('/api', mentorRoutes.routes);
app.use('/api', projectRoute.routes);
app.use('/api', scoreRoutes.routes);
app.use('/api', attendRoutes.routes);

app.listen(config.port, () => console.log('listening on port ' + config.port));