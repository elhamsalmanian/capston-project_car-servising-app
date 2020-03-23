const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema({


  date: { type: String, required: true },
  time: { type: String, required: true },
  customers: { type: String, required: true },
  notes: { type: String, require: false }

});

module.exports = mongoose.model('Appointment', appointmentSchema);
