const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');

// connect to auth routes
const authRoutes = require('./routes/authRoutes');

const app = express();

connectDB();


app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('backend is running');
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  if (error.type === 'entity.parse.failed') {
    return res.status(400).json({ message: 'Request body must contain valid JSON.' });
  }

  console.error('Unhandled request error:', error.message);
  return res.status(500).json({ message: 'Server error. Please try again.' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});