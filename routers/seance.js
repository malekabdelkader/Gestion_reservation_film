const router = require('express').Router();
const _ = require('lodash');
const {seance_validation , Seance} =require('../models/seance.model');
const{Film}  =require('../models/film.model');


router.get('/',async (req,res)=> {
    res.status(200).send(await Seance.find())    
})
router.get('/:id',async (req,res)=>{
    const seance= await Seance.findById(req.params.id)
    if(!seance)
       return res.status(404).send("ID not found")
    res.status(200).json(seance)
})
router.post('/:filmID',async (req,res)=>{
    let validation=seance_validation(req.body)
    const film =await Film.findById(req.params.filmID);
    if(!film)
        return res.status(404).send("FiLM ID not found")

    if(validation.error)
      return res.status(400).send(validation.error.details[0].message)
    let seance= new Seance(_.pick(req.body,['date','temp','nombre_de_places']))
    try{
        seance=await seance.save();
        await Film.findByIdAndUpdate(req.params.filmID, {
            $push: { seances: seance._id },
          });
    }catch(error){
        return res.status(400).send(error.message)
    }
    res.status(201).send(seance);
})
router.delete('/:id', async (req,res)=>{
    let seance = await Seance.findByIdAndDelete(req.params.id);
    if(!seance)
        return res.status(404).send('Id not found')
    res.send(seance)
})
module.exports=router;