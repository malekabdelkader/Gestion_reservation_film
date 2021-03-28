const mongoose = require("mongoose");
const Joi = require('joi');
Joi.objectID = require('joi-objectid')(Joi)

const Schema = mongoose.Schema;
const reservation = new Schema({
  //Nom & prenom de personne qui a  effectuée la reservation
  nom: { type: String },
  prenom:{type :String},
  seance: { type: mongoose.Schema.Types.ObjectId, ref: "Seance" },
});

let reservation_validation_schema = Joi.object({
    nom : Joi.string().min(2).required(),
    prenom : Joi.string().min(2).required(),
    seance : Joi.objectID().required(),
})
function reservation_validation(body){
return reservation_validation_schema.validate(body)
}
const Reservation = mongoose.model("Reservation", reservation);
module.exports.Reservation = Reservation;
module.exports.reservation_validation=reservation_validation;
