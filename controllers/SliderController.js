const SliderModel = require('../models/Slider');

const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "ddcnqvfum",
  api_key: "385286778953337",
  api_secret: "GJp8nVwKCt8mfL-BDkGgRDf0egc",
});

class SliderController {
    static display = async (req, res) => {
        try {
          const slider = await SliderModel.find();
          if (slider) {
            res.status(200).json(slider);
          } else {
            res.status(404).json({ message: 'Slider not found' });
          }
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
    
          const { title , description } = req.body;
          const newSlider = new SliderModel({
            title:title,
            description: description,
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

    static view = async (req, res) => {
        const { id } = req.params;
        try {
          const slider = await SliderModel.findById(id);
          if (slider) {
            res.status(200).json(slider);
          } else {
            res.status(404).json({ message: 'Slider not found' });
          }
        } catch (err) {
          res.status(500).json({ message: err.message });
        }
    }

    static update = async (req, res) => {
        const { id } = req.params;
        try {
          if (req.file) {
            const product = await productModel.findById(id);
            const image_id = product.images.public_id;
            await cloudinary.uploader.destroy(image_id);
    
            const file = req.files.image;
            const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: "projectAPI",
            });
            var data = {
              name: req.body.name,
              description: req.body.description,
              images: {
                  public_id: myimage.public_id,
                  url: myimage.secure_url,
              },
            };
          } else {
            var data = {
              name: req.body.name,
              description: req.body.description,
            };
          }
    
          const updatedSlider = await SliderModel.findByIdAndUpdate(id, data);
          if (updatedSlider) {
            res.status(200).json({success:true,updatedSlider});
          } else {
            res.status(404).json({ message: 'Slider not found' });
          }
        } catch (err) {
          res.status(400).json({ message: err.message });
        }
      }

      static delete = async (req, res) => {
        const { id } = req.params;
        try {
          const deletedSlider = await SliderModel.findByIdAndDelete(id);
          if (deletedSlider) {
            res.status(200).json({ message: 'Slider deleted successfully' });
          } else {
            res.status(404).json({ message: 'Slider not found' });
          }
        } catch (err) {
          res.status(500).json({ message: err.message });
        }
      }
}

module.exports = SliderController;