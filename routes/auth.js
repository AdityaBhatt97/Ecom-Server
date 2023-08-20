const router = require("express").Router();
const User = require("../models/User")
const CryptoJS = require("crypto-js")
const jwt = require( "jsonwebtoken" )

// REGISTER

router.post("/register" , async(req , res) => {
      try{
     const {username , password , email} = req.body; 

         if(!username || !email || !password){
        return    res.status(400).json({message : "All Fields Are Not Filled!"})
         }

         const emailDuplicates = await User.findOne({ email : email});
         const usernameDuplicates = await User.findOne({ username : username});

         if(emailDuplicates || usernameDuplicates){
           return res.status(409).json({message : 'Username Or Email Already Exist!'})
         }

    const newUser = new User({
        username: username,
        email: email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
 
    })

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);

    } catch(err){
        res.status(500).json(err);
    }
})

// LOGIN

router.post("/login" , async(req , res) => {
 
    try{
        const user =  await User.findOne(
            { 
                username :  req.body.username
                }
                );

       if( !user ) {

       return    res.status(401).json("Wrong Credentials!")
       }

        const hashedPassword = CryptoJS.AES.decrypt(user.password , process.env.PASS_SEC);

        const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        const inputPassword = req.body.password;

       if( OriginalPassword !== inputPassword) { 
        return  res.status(401).json("Wrong Password!");
        }

        const accessToken = jwt.sign({
            id : user._id,
            isAdmin : user.isAdmin
        }, process.env.JWT_SEC,
        {expiresIn : "1h"}
        )

        const {password , ...others} = user._doc;

        res.status(200).json({...others , accessToken});

     } catch(err){
        res.status(500).json(err);
    }


})





module.exports =router ;