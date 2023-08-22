const express = require ("express")
const bodyParser = require ("body-parser")
const mongoose = require ("mongoose")
const crypto = require ("crypto")
const nodemailer = require ("nodemailer")
const jwt = require ("jsonwebtoken")
const User = require("./models/user")
const Post = require("./models/post")

const app = express()
const port = 3000;
const cors = require ("cors")
app.use(cors())

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
//
mongoose
  .connect("mongodb+srv://singhsaurabh1905:aIYrJIzj4EtR1lE2@cluster0.w8yvfmg.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
     
    console.log("Connected to Mongo Db");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDb", err);
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}` );
  });


  //  ENDPOINT TO REGISTER A USER IN THE BACKEND =============================================================================
  app.post("/register",async(req,res)=> {
    try {
        const {name,email,password} = req.body ;

        const existingUser = await User.findOne({email})

        if(existingUser){
            return res.status(400).json({message:"Email already exists, Register with different Email"})
        } 

        //create a new user 
        const newUser = new User({name,email,password})

        //generate & store the verification token
        newUser.verificationToken = crypto.randomBytes(20).toString("hex")

        //save the user to the database 
        await newUser.save()

            //send the verification email to the user 
            sendVerificationEmail(newUser.email,newUser.verificationToken)

            res.status(200).json({message:"Registration successful please check your email for verification"})
        
    } catch (error) {
        console.log("Error registering User ", error)
        res.status(500).json({message:"Error registering user"})
    }
  })

  const sendVerificationEmail = async (email,verificationToken)=> {
    
    //cretae a nodemailer transporter 
const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"singhsaurabh1905@gmail.com",
         pass:"drqonvgeuicsuvlp"
        // pass:process.env.EMAILPASS
    }
})

//compose the email message 
const mailOptions ={
    from:"threads.com",
    to:email,
    subject:"Email Verification",
    text:`Please click the following link to verify your email https://192.168.151.136:3000/verify/${verificationToken} `
}

try {
    await transporter.sendMail(mailOptions)
} catch (error) {
    console.log("Error sending mail", error)
}
  }


  //to verify the user which clicked on the link
app.get("/verify/:token",async (req,res)=> {
    try {
        const token = req.params.token ;

        const user = await User.findOne({verificationToken:token})

        if(!user) {
            res.status(404).json({message:"Invalid token"})
        }

        user.verified = true ;
        user.verificationToken = undefined;
        await user.save()

        res.status(200).json({message:"Email verified successfully"})
    } catch (error) {
        console.log("Error getting the user " , error)
        res.status(500).json({message:"Email verification failed"})
    }
})


//ENDPOINT FOR LOGING IN  USER ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//generate secretKey
const generateSecretKey = ()=> {
const secretKey = crypto.randomBytes(32).toString("hex")
return secretKey
}

const secretKey = generateSecretKey();

app.post("/login",async(req,res)=> {
    try {
        const {email,password} = req.body ;

        const user = await User.findOne({email})

        if(!user){
            return res.status(404).json({message: "Invalid credentials"})
        }
        
        if(user.password !== password){
            return res.status(404).json({message:"Invalid credentials"})
        }

        const token = jwt.sign({userId:user._id},secretKey)

        res.status(200).json({token})
    } catch (error) {
        res.status(500).json({message:"Login failed"})
    }
})