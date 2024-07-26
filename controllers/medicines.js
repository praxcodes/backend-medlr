const Medicine=require('../models/Medicine')

const getAllMedicines =async(req,res)=>{
    try {
       const medicines= await Medicine.find({})
        res.status(200).json({medicines:medicines})
    } catch (error) {
        res.status(500).json({msg: error})
    }
}

const createMedicine= async(req,res)=>{
  try {
    const medicine=await Medicine.create(req.body) //adds to db
    res.status(201).json({medicine})// shows the new medicine added
    
  } catch (error) {
    res.status(500).json({msg : error})
  }
}

const getMedicine=async(req,res,next)=>{
try {
    const {id:medID}=req.params;
    const medicine=await Medicine.findOne({_id:medID})
    if(!medicine){
        return res.status(404).json({msg:`No medicine with id: ${medID}`})
    }
    res.status(200).json({medicine})
    
} catch (error) {
    res.status(500).json({msg : error})
}
    
}

const deleteMedicine= async(req,res,next)=>{
    try {
        const {id:medID}=req.params; 
        const medicine=await Medicine.findOneAndDelete({_id:medID});
        if(!medicine){
            return res.status(404).json({msg:`No medicine with id: ${medID}`})
        }
        //res.status(200).json({medicine})
        res.status(200).send();
    } catch (error) {
        res.status(500).json({msg : error})
    }
}

const updateMedicine= async(req,res,next)=>{
try {
    const {id:medID}=req.params;
    const medicine= await Medicine.findOneAndUpdate({_id:medID},req.body,{
        new:true,
        runValidators:true,
    });
    if(!medicine){
        return res.status(404).json({msg:`No medicine with id: ${medID}`})
    }
    res.status(200).json({medicine})
    
} catch (error) {
    
}
}

module.exports = {
    getAllMedicines,
    createMedicine,
    getMedicine,
    updateMedicine,
    deleteMedicine,
}