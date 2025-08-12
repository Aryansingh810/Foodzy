import mongoose from "mongoose";

const connectDB = async () =>{
    await mongoose.connect("mongodb+srv://admin-aryan:aryan123@cluster0.cuqngvq.mongodb.net/food-del").then(()=>console.log("DB connected"))
}

export {connectDB};