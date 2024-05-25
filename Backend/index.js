const express = require('express');
const dbconn = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
dbconn()

app.use(cors());
app.use(bodyParser.json());

app.use('/tasks', require('./routes/tasks'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
