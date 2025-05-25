const mongoose = require('mongoose');

module.exports = {
  connect: () => {
    mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB conectado (config)'))
    .catch(err => console.error('Erro MongoDB (config):', err));
  }
};
