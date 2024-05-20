// models/WineList.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wineSchema = new Schema({
  castle: { type: String, required: true },
  year: { type: Number, required: true },
  quantity: { type: Number, required: true },
  type: { type: String, required: true },
});

const wineListSchema = new Schema({
  email: { type: String, required: true, unique: true },
  wines: [wineSchema],
});

const WineList = mongoose.model('WineList', wineListSchema);

module.exports = WineList;