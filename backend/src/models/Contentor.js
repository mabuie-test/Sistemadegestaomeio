const mongoose = require('mongoose');

const ContentorSchema = new mongoose.Schema({
  gps: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  nivel:          { type: Number, default: 0 },
  estado:         { type: String, enum: ['vazio','em_uso','cheio'], default: 'vazio' },
  ultAtualizacao: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Contentor', ContentorSchema);
