const router = require('express').Router();
const _ = require('lodash');
const {film_validation , Film} =require('../models/film.model');

router.get('/',async (req,res)=> {
    res.status(200).send(await Film.find().populate('seances'))    
})
router.get('/:id',async (req,res)=>{
    const film= await Film.findById(req.params.id)//.populate('seances')
    if(!film)
       return res.status(404).send("ID not found")
    res.status(200).json(film)
})
router.post('/',async (req,res)=>{
    let validation=film_validation(req.body)

    if(validation.error)
      return res.status(400).send(validation.error.details[0].message)
    let film= new Film(_.pick(req.body,['nom','acteurs']))
    try{
        film=await film.save();
    }catch(error){
        return res.status(400).send(error.message)
    }
    res.status(201).send(film);
})
router.delete('/:id', async (req,res)=>{
    let film = await Film.findByIdAndDelete(req.params.id);
    if(!film)
        return res.status(404).send('Id not found')
    res.send(film)
})
module.exports=router;