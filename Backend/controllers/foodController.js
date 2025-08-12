
import foodModel from "../models/foodModel.js";
import fs from "fs"



//add food item

const addFood = async (req,res) =>{
      
let image_filename = `${req.file.filename}`;

const food = new foodModel({
    name:req.body.name,
    description:req.body.description,
    price:req.body.price,
    category:req.body.category,
    image:image_filename


})

try{
    await food.save();
    res.json({success:true,message:"food added"})
}
catch(err)
{
 console.log("error");
 res.json({success:false,message:"error"})
}

}


const listFood = async (req,res)=>{
    try{
  const foods = await foodModel.find({})
  res.json({success:true,data:foods})

    }catch(err)
    {
     console.log(err)
     res.json({success:false,message:"error"})
    }
}


const removeFood = async (req,res)=>{
       const id = req.body?.id;
try{
   const food = await foodModel.findById(id);
    // fs.unlink(`uploads/${food.image}`,()=>{})
    if (food.image && fs.existsSync(`uploads/${food.image}`)) {
  fs.unlinkSync(`uploads/${food.image}`);
}
    await foodModel.findByIdAndDelete(id)
    res.json({success:true,message:"food removed"})
}
catch(error)
{
    console.log(error);
    res.json({success:false,message:"error "})

}
}

export {addFood,listFood,removeFood};