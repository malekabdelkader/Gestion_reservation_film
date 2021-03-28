const mongoose = require("mongoose");
const Joi = require('joi');
const Schema = mongoose.Schema;
const seance = new Schema({
  date: { type: String },
  temp: { type: String},
  nombre_de_places: { type: Number },
});
let seance_validation_schema = Joi.object({
  date : Joi.required(),
  temp : Joi.required(),
  nombre_de_places : Joi.number().positive().required(),
})
function seance_validation(body) {
  return seance_validation_schema.validate(body);
}

var Seance = mongoose.model("Seance", seance);
module.exports.Seance = Seance;
module.exports.seance_validation = seance_validation;
