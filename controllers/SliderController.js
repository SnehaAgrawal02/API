const SliderModel = require('../models/Slider');
const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name: "ddcnqvfum",
    api_key: "385286778953337",
    api_secret: "GJp8nVwKCt8mfL-BDkGgRDf0egc",
  });
class SliderController{
    
    static display = async (req, res) => {
        try {
          const categories = await CategoryModel.find();
          res.status(200).json({
            success : true, 
            categories
        });
        } catch (err) {
          res.status(500).json({ message: err.message });
        }
      }
      static insert = async (req, res) => {
        try {
          const file = req.files.image
          const imageUpload = await cloudinary.uploader.upload(file.tempFilePath , {
              folder: 'projectAPI'
          })
    
          const { title } = req.body;
          const newSlider = new SliderModel({
            title:title,
            image:{
                public_id:imageUpload.public_id,
                url:imageUpload.secure_url
            }
          });
          await newSlider.save();
          res.status(201).json(newSlider);
        } catch (err) {
          res.status(400).json({ message: err.message });
        }
      }


}
module.exports = SliderController;