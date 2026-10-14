const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/fullstackdb';

mongoose.connect(MONGO_URL)
  .then(() => console.log('MongoDB Connected!'))
  .catch(err => console.log('MongoDB Error:', err));

const DataSchema = new mongoose.Schema({ name: String, created: { type: Date, default: Date.now } });
const Data = mongoose.model('Data', DataSchema);

app.get('/', async (req, res) => {
  const count = await Data.countDocuments();
  res.json({ 
    message: 'Hello Arif, Backend + Database connected!',
    db_status: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    total_records: count,
    time: new Date().toLocaleString() 
  });
});

app.post('/add', async (req, res) => {
  const newData = new Data({ name: req.body.name || 'Test User' });
  await newData.save();
  res.json({ success: true, data: newData });
});

app.listen(5000, () => console.log('Backend running on 5000 with DB'));