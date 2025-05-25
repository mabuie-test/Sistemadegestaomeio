const AuditLog = require('../models/AuditLog');

module.exports = async (req, res, next) => {
  const { method, originalUrl, user } = req;
  const startState = await req.getStateBefore?.();
  res.on('finish', async () => {
    const endState = await req.getStateAfter?.();
    await AuditLog.create({
      timestamp:        new Date(),
      userId:           user?.id || null,
      role:             user?.role || 'system',
      action:           `${method}_${originalUrl}`,
      targetCollection: req.targetCollection,
      targetId:         req.targetId,
      before:           startState,
      after:            endState,
      metadata: {
        ip:     req.ip,
        ua:     req.headers['user-agent'],
        status: res.statusCode
      }
    });
  });
  next();
};
