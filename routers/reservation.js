const router = require('express').Router();
const _ = require('lodash');
const {reservation_validation , Reservation} =require('../models/reservation.model');
const {Seance} =require('../models/seance.model');


router.post('/',async (req,res)=>{
    let validation=reservation_validation(req.body)
    const seance =await Seance.findById(req.body.seance);
    if(!seance)
        return res.status(404).send("seance ID not found")

    if(validation.error)
      return res.status(400).send(validation.error.details[0].message)
    let reservation= new Reservation(_.pick(req.body,['nom','prenom','seance']))
    try{
        if(seance.nombre_de_places == 0){
            return res.status(200).send("No more places")
        }
        seance.nombre_de_places= seance.nombre_de_places-1
        await seance.save()
        reservation=await reservation.save();

    }catch(error){
        return res.status(400).send(error.message)
    }
    res.status(201).send(reservation);
})
router.get('/',async (req,res)=> {
    res.status(200).send(await Reservation.find().populate('seance'))    
})
router.get('/:id',async (req,res)=>{
    const reservation= await Reservation.findById(req.params.id)//.populate('seances')
    if(!reservation)
       return res.status(404).send("ID not found")
    res.status(200).json(reservation)
})
router.delete('/:id', async (req,res)=>{
    let reservation = await Reservation.findByIdAndDelete(req.params.id);
    if(!reservation)
        return res.status(404).send('Id not found')
    res.send(reservation)
})
module.exports=router;