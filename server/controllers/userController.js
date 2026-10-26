const User = require("../models/User");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const registerUser = async (req , res) =>{
   try {
    console.log(req.body);

    const { name, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({
            message: "password and confirm password do not match"
        });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(400).json({
            message: "user with this email already exists"
        });
    }

    const saltRounds = 10;

    bcrypt.hash(password, saltRounds, async (error, hashedPassword) => {

        if (error) {
            return res.status(500).json({
                message: "password hashing failed"
            });
        }

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

    });

} catch (error) {

    console.log(error);

    return res.status(500).json({
        message: "internal server error"
    });
}
}



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
    });}};

const getTeamMembers = async (req, res) => {
  try {
    const response = await User.find({
      role: "team member"
    }).select("_id name email");

    res.status(200).json({
      message: "Team Members fetched successfully",
      data: response
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to fetch Team Members"
    });
  }
};

module.exports = {registerUser , LoginUser  , getTeamMembers}