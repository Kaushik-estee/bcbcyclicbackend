

const mongoose = require("mongoose")
const carSchema = mongoose.Schema({
    year:{type:Number,required:true},
    make:{type:String,required:true},
    model:{type:String,required:true},
    kms:{type:String,required:true},
    transmission:{type:String,required:true},
    exteriorcolor:{type:String,required:true},
    fuel:{type:String,required:true},
    price:{type:Number,required:true},
    image:{type:String,required:true}

  
    
},{
    versionKey:false
})
// creating the model

const carModel = mongoose.model("car",carSchema)

module.exports={
    carModel
}