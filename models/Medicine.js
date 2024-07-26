const mongoose=require('mongoose');

const MedicineSchema= new mongoose.Schema({
    name:{
        type: String,
        required:[true,'must provide name']

    },
    price:{
        type: Number,
        required: [true,'must provide price']
    },
    discountPrice:{
        type: Number,

    },
    quantity:{
        type: Number,
        required: [true,'must provide quantty']
    },
    manufacturer:{
        type: String,
        required:[true,'must provide manufacturer']
    },
    imageUrl:{
        type: String,
    },

})

module.exports= mongoose.model('Medicine',MedicineSchema)