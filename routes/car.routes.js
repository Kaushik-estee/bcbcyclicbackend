


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