const { query } = require('express')

const Medicine=require('../models/Medicine')

const getAllMedicines =async(req,res)=>{
    try {
        
        const {name,manufacturer,numericFilters,sort}=req.query
        
        const queryObject={}
        
        if(name){
            queryObject.name={$regex:name, $options:'i'}
        }
        if(manufacturer){
            queryObject.manufacturer={$regex: manufacturer, $options: 'i'}
        }
        if(numericFilters){
            const operatorMap={
                '>':'$gt',
                '>=':'$gte',
                '=':'$eq',
                '<':'$lt',
                '<=':'$lte',
             }
             const regEx=/\b(<|>|<=|>=|=)\b/g
             let filters=numericFilters.replace(regEx,(match)=>`-${operatorMap[match]}-` )
             const options=['price','quantity','discountPrice'];
             filters=filters.split(',').forEach((item)=>{
                const [field,operator,value]=item.split('-')
                if(options.includes(field)){
                    queryObject[field]={[operator]:Number(value)}
                }
             })
        }




        //console.log(queryObject)
        
       let result= Medicine.find(queryObject)
       
       if(sort){
        const sortList= sort.split(',').join(' ')
        result=result.sort(sortList)
       }
       else{
        result=result.sort('name')
       }
        
       const medicines=await result
       
        res.status(200).json({medicines})
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
    res.status(500).json({msg : error})
}
}

module.exports = {
    getAllMedicines,
    createMedicine,
    getMedicine,
    updateMedicine,
    deleteMedicine,
}