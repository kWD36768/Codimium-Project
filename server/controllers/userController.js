const User = require("../models/User");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const registerUser = async (req , res) =>{
   try {
    console.log(req.body);

    const { name, email, password, confirmPassword } = req.body;

    // Password confirmation
    if (password !== confirmPassword) {
        return res.status(400).json({
            message: "password and confirm password do not match"
        });
    }

    // Check existing email
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(400).json({
            message: "user with this email already exists"
        });
    }

    // Password hash
    const saltRounds = 10;

    bcrypt.hash(password, saltRounds, async (error, hashedPassword) => {

        if (error) {
            return res.status(500).json({
                message: "password hashing failed"
            });
        }

        // Save user
        const dataToSave = new User({
            name: name,
            email: email,
            password: hashedPassword
        });

        const response = await dataToSave.save();

        console.log(response);

        return res.status(200).json({
            message: "user registered successfully"
        });


        // ==============================
        // JWT ابھی ضروری نہیں
        // ==============================

        /*
        const dataWithoutPassword = response._doc;

        jwt.sign(
            dataWithoutPassword,
            process.env.JWT_KEY,
            { expiresIn: 60 * 60 * 24 * 30 },
            (error, token) => {

                if (error) {
                    return res.status(500).json({
                        message: "internal server error"
                    });
                }

                return res.status(200).json({
                    message: "user registered successfully",
                    data: dataWithoutPassword,
                    auth: token
                });
            }
        );
        */
    });

} catch (error) {

    console.log(error);

    return res.status(500).json({
        message: "internal server error"
    });
}
}

// const LoginUser = async (req , res) =>{
//     try{

//         const {email , password} = req.body
        
//         const user = await User.findOne({email : email});
        
//         if(!user){
            
//             return res.status(400).json({message : "user with this email does not exist"})}
//            const ismatch = await bcrypt.compare(password , user.password) ;
           
//            if (!ismatch){
            
//             return res.status(400).json({message : "invalid password"})
            
//            }
           
//            const {password  , ...userWithoutPassword} = user._doc ; 

//            const token = jwt.sign(userWithoutPassword , process.env.JWT_KEY , {expiresIn : 60 * 60 *24 *300});
//            res.status(200).json({message : "user logged in successfully" , data : userWithoutPassword , auth : token})
  
//     }
//     catch(error){
//         res.status(500).json({message : "user could not be logged in"})
//         console.log(error)
//     }
// }

const LoginUser = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({
        message: "User with this email does not exist"
      });
    }

    const ismatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!ismatch) {
      return res.status(400).json({
        message: "Invalid password"
      });
    }

    const { password: userPassword, ...dataWithoutPassword } = user._doc;

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role : user.role 
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "300d"
      }
    );

    return res.status(200).json({
      message: "User logged in successfully",
      data: dataWithoutPassword,
      auth: token
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message: "User could not be logged in"
    });

  }
};

module.exports = {registerUser , LoginUser}