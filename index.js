const express = require("express")
const cors = require('cors');


const { connection } = require("./db")
const { carRouter } = require("./routes/car.routes")

require('dotenv').config()
const app = express()
app.use(express.json())
app.use(cors());

app.use("/car",carRouter)

app.get("/",(req,res)=>{
    res.send("welcome bcb")
})


app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("runing");
        
    } catch (error) {
        console.log(error);
    }
   
}) 

// https://rose-hilarious-bat.cyclic.app/

// "year": 2016,
// "make": "audi",
// "model": "x4",
// "kms": "20000 km",
// "transmission": "petrol",
// "exteriorcolor": "red",
// "fuel": "petrol",
// "price": 90080,
// "image": "https://cdn.bigboytoyz.com/new-version/assets/images/no-image-3.png"