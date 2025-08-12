import userModel from "../models/userModel.js";


//add items to user cart 

const addtocart = async(req,res) =>{
  try{
  let userData = await userModel.findById(req.body.userId)
  let cartData = await userData.cartData;
  if(!cartData[req.body.itemId]){
    cartData[req.body.itemId] =1
  }
  else{
    cartData[req.body.itemId]+=1;
  }
  await userModel.findByIdAndUpdate(req.body.userId,{cartData});
  res.json({sucecss:true,message:"Added to cart"})
  }
  catch(err)
  {
    res.json({success:false,message:"error occured"})
  }
}



const removefromcart = async (req,res) =>{
 try{
     let userData = await userModel.findById(req.body.userId)
     let cartData = await userData.cartData;
     if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId] -=1
     }
     await userModel.findByIdAndUpdate(req.body.userId,{cartData})
     res.json({success:true,message:"removed from the cart"}) 
 }
 catch(err)
 {
    res.json({success:false,message:"error occured"});
 }
}



const getcart = async(req,res)=>{
     try{
        let userData = await  userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({success:true,cartData})
     }
     catch(error)
     {
        res.json({success:false,message:"error"})
     }
}

export {addtocart,removefromcart,getcart}