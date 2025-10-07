const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/database');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/animals', require('./routes/animalRoutes'));
app.use('/api/vaccinations', require('./routes/vaccinationRoutes'));
// Add other routes for different modules

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});