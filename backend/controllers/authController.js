import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../Models/User.js";

//Registration
export const registerUser = async (req,res)=>{
    try {
        const{name,email,password,role}=req.body;
        console.log('Registration attempt:', {name,email,role}); // Add logging
        const existing=await User.findOne({email});
        if(existing) {
            console.log('User already exists:', email); // Add logging
            return res.status(400).json({message:"User already registered,Login instead"})
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user=new User({name,email,password: hashedPassword,role});
        console.log('Saving user:', user); // Add logging
        await user.save();
        console.log('User saved successfully:', user._id); // Add logging
        //Generate JWT
        const token=jwt.sign({
            userId:user._id,role:user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn:"1d"
        })
        res.status(201).json({
            message:"User registered successfully",
            token,
            user:{
                id:user._id,name:user.name,role:user.role
            }
        });

    }
    catch(error){
        res.status(500).json({message :"Registered failed",error:error.message})
    }
}

//Login
export const loginUser=async(req,res)=>{
    try{
    const{email,password}=req.body ;
    console.log('Login attempt:', email); // Add logging
    const user=await User.findOne({email});
    if(!user) {
        console.log('User not found:', email); // Add logging
        return res.status(400).json({message:"User not registered"});
    }

    const isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch) {
        console.log('Invalid password for:', email); // Add logging
        return res.status(400).json({message:"Invalid credentials"});
    }
    console.log('Login successful for:', email); // Add logging
//Generate JWT
const token=jwt.sign({
    userId:user._id,role:user.role
},
process.env.JWT_SECRET,
{
    expiresIn:"1d"
})
res.status(200).json({
    message:"login Successful",
    token,
    user:{
        id:user._id,name:user.name,role:user.role
    }
})
}
catch(error)
{
    res.status(500).json({message:"Login failed",error:error.message})
}
}