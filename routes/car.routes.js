


/////////////////////////////////////////////////////
const express = require("express")
const { carModel } = require("../model/car.model")
const carRouter = express.Router()


require('dotenv').config()
const app = express()
app.use(express.json())


carRouter.get("/",async(req,res)=>{
    let query = req.query
    try {
        const cars = await carModel.find(query)
        res.send(cars)
    } catch (error) {
        res.send(error)
    }
   
})
carRouter.get("/:id" , async(req,res)=>{
    const {id} = req.params
  try {
    const data = await carModel.find({"_id":id})
    res.send(data)
    
  } catch (error) {
   res.send(error) 
  }
  })

  //////////////////////////////////////////
  carRouter.get("/", async (req, res) => {
    const make = req.query;
    const year = req.query;
    const kms = req.query;
    const model = req.query;
  
    const { price, sort ,limit,page} = req.query;
  
    try {
      if (price > 0) {
        const data = await carModel.find({ price: { $lte: price } }).sort({
          price: sort == "asc" ? 1 : -1,
        });
        res.send(data);
      } else {
        const data = await carModel.find({
          $or: [
            make,
            year,
            kms,
            { $and: [make, year] },
            { $and: [make, year, kms] },
            { $and: [make, kms] },
            { $and: [make, model] },
            { $and: [make, year, model] },
            { $and: [make, year, kms, model] },
          ],
        }).sort({
          price: sort == "desc" ? -1 : 1,
        }).limit(limit).skip((page-1)*limit)
        res.send(data);
      }
    } catch (error) {
      res.send(error);
    }
  });


  /////////////////////////////////
carRouter.post("/post",async(req,res)=>{
    try {
        const car = new carModel(req.body)
    await car.save()
    res.send("posted")
        
    } catch (error) {
        console.log(error);
    }
   
    
})


carRouter.patch("/update/:id",async(req,res)=>{
    const id = req.params.id
    const payload = req.body
    try {
        await carModel.findByIdAndUpdate({_id:id},payload)
        res.send("updated")
    } catch (error) {
        res.send(error) 
    }
   
})
carRouter.delete("/delete/:id",async(req,res)=>{
    const id = req.params.id
    
    try {
        await carModel.findByIdAndDelete({_id:id})
        res.send("deleted")
    } catch (error) {
        res.send(error) 
    }
   
})
module.exports={
    carRouter
}