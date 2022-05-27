const express = require("express")
const router = require('./src/routes');
const cors = require("cors")
require('dotenv').config();

const app = express()
const PORT = 8000

app.use(express.json());
app.use(cors());
app.use('/api/v1/', router);

app.listen(PORT,() => console.log(`server running on port ${PORT}`))