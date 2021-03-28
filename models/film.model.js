const mongoose = require("mongoose");
const Joi = require('joi');
Joi.objectID = require('joi-objectid')(Joi)

const Schema = mongoose.Schema;
const film = new Schema({
  nom: { type: String },
  acteurs: [{ type: String}],
  seances: [{ type: mongoose.Schema.Types.ObjectId, ref: "Seance" }],
});
let film_validation_schema = Joi.object({
    nom : Joi.string().min(2).required(),
    acteurs : Joi.array().items(Joi.string().min(2)),
    seances : Joi.array().items(Joi.objectID()),
})
function film_validation(body){
return film_validation_schema.validate(body)
}
const Film = mongoose.model("Film", film);
module.exports.Film = Film;
module.exports.film_validation=film_validation;
