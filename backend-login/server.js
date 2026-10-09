const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
const connectDB = require('./config/db');



dotenv.config();

connectDB();
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
