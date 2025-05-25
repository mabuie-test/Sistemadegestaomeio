const mongoose = require('mongoose');

const AuditLogSchema = new mongoose.Schema({
  timestamp:        { type: Date, default: Date.now },
  userId:           { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  role:             { type: String },
  action:           { type: String },
  targetCollection: { type: String },
  targetId:         { type: mongoose.Schema.Types.ObjectId },
  before:           { type: Object },
  after:            { type: Object },
  metadata:         { type: Object }
});

module.exports = mongoose.model('AuditLog', AuditLogSchema);
