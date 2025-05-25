const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  nome:      { type: String, required: true },
  email:     { type: String, required: true, unique: true },
  senhaHash: { type: String, required: true },
  role:      { type: String, enum: ['admin','user'], default: 'user' },
  criadoEm:  { type: Date, default: Date.now }
});

UserSchema.methods.compararSenha = function(senha) {
  return bcrypt.compare(senha, this.senhaHash);
};

UserSchema.pre('save', async function(next) {
  if (!this.isModified('senhaHash')) return next();
  const salt = await bcrypt.genSalt(10);
  this.senhaHash = await bcrypt.hash(this.senhaHash, salt);
  next();
});

module.exports = mongoose.model('User', UserSchema);
