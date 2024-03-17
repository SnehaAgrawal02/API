const cloudinary = require("cloudinary").v2;
const bcrypt = require("bcrypt");
const UserModel=require("../models/User");
const jwt= require('jsonwebtoken')


cloudinary.config({
  cloud_name: "ddcnqvfum",
  api_key: "385286778953337",
  api_secret: "GJp8nVwKCt8mfL-BDkGgRDf0egc",
});

class UserController {
  static getalluser = async (req, res) => {
    try {
      res.send("hello user");
    } catch (err) {
      console.log(err);
    }
  };
  static userInsert = async (req, res) => {
    try {
      //To upload Image on Cloud
      // console.log(req.files.image)
      const file = req.files.image;
      const imageUpload = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "projectAPI",
      });
      // console.log(imageUpload)

      const { name, email, password, confirmPassword } = req.body;
      const user = await UserModel.findOne({ email: email });
      // console.log(user)
      if (user) {
        res
          .status(401)
          .json({ status: "failed", message: "Email already exists" });
      } else {
        if (name && email && password && confirmPassword) {
          if (password == confirmPassword) {
            const hashPassword = await bcrypt.hash(password, 10);
            const result = new UserModel({
              name: name,
              email: email,
              password: hashPassword,
              image: {
                public_id: imageUpload.public_id,
                url: imageUpload.secure_url,
              },
            });
            //To save data
            await result.save();

            //To redirect to login page
            res
              .status(201)
              .json({
                status: "success",
                message: "Regististration Successful.",
              });
          } else {
            res
              .status(401)
              .json({
                status: "failed",
                message: "Password & Confirm Password must be Same.",
              });
          }
        } else {
          res
            .status(401)
            .json({ status: "failed", message: "All Fields are Required." });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  static loginUser = async (req, res) => {
    try {
        // console.log(req.body)
        const { email, password } = req.body
        // console.log(password)
        if (email && password) {
            const user = await UserModel.findOne({ email: email })
            // console.log(user)
            if (user != null) {
                const isMatched = await bcrypt.compare(password, user.password)
                if ((user.email === email) && isMatched) {
                    //generate jwt token
                    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);
                    // console.log(token)
                    res.cookie('token', token)
                    res
                        .status(201)
                        .json({ status: "success", message: "Login successfully with web token 😃🍻", token, user });
                } else {
                    res.status(401).json({ status: "failed", message: "'Email and Password is not valid !😓" });
                }
            } else {
                res.status(401).json({ status: "failed", message: "'You are not registered user😓" });
            }
        } else {
            res.status(401).json({ status: "failed", message: "'All Fields are required 😓" });
        }
    } catch (err) {
        console.log(err)
    }
};
static logout = async (req, res) => {
        
  try {
      res.cookie("token", null, {
          expires: new Date(Date.now()),
          httpOnly: true,
      });

      res.status(200).json({
          success: true,
          message: "Logged Out",
      });
  } catch (error) {
      console.log(error)
  }
};
static updatePassword = async (req, res) => {
  // console.log(req.user)
  try {
      const { oldPassword, newPassword, confirmPassword } = req.body

      if (oldPassword && newPassword && confirmPassword) {
          const user = await UserModel.findById(req.user.id);
          const isMatch = await bcrypt.compare(oldPassword, user.password)
          //const isPasswordMatched = await userModel.comparePassword(req.body.oldPassword);
          if (!isMatch) {
              res.status(201).json({ "status": 400, "message": "Old password is incorrect" })
          } else {
              if (newPassword !== confirmPassword) {
                  res.status(201)
                      .json({ "status": "failed", "message": "password does not match" })
              } else {
                  const salt = await bcrypt.genSalt(10)
                  const newHashPassword = await bcrypt.hash(newPassword, salt)
                  //console.log(req.user)
                  await UserModel.findByIdAndUpdate(req.user.id, { $set: { password: newHashPassword } })
                  res.status(201)
                      .json({ "status": "success", "message": "Password changed succesfully" })
              }
          }
      } else {
          res.status(201)
              .json({ "status": "failed", "message": "All Fields are Required" })
      }
  } catch (err) {
      res.status(201)
          .json(err)
  }
}

}

module.exports = UserController;
