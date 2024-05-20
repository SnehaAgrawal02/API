const CategoryModel = require('../models/Category');
const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name: "ddcnqvfum",
    api_key: "385286778953337",
    api_secret: "GJp8nVwKCt8mfL-BDkGgRDf0egc",
  });

class CategoryController {
  static view = async (req, res) => {
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

      const { name } = req.body;
      const newCategory = new CategoryModel({
        name:name,
        image:{
            public_id:imageUpload.public_id,
            url:imageUpload.secure_url
        }
      });
      await newCategory.save();
      res.status(201).json(newCategory);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
  static display = async (req, res) => {
    const { id } = req.params;
    try {
      const category = await CategoryModel.findById(id);
      if (category) {
        res.status(200).json(category);
      } else {
        res.status(404).json({ message: 'Category not found' });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
  static update = async (req, res) => {
    const { id } = req.params;
    try {
      const updatedCategory = await CategoryModel.findByIdAndUpdate(id, req.body, { new: true });
      if (updatedCategory) {
        res.status(200).json(updatedCategory);
      } else {
        res.status(404).json({ message: 'Category not found' });
      }
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
  static delete = async (req, res) => {
    const { id } = req.params;
    try {
      const deletedCategory = await CategoryModel.findByIdAndDelete(id);
      if (deletedCategory) {
        res.status(200).json({ message: 'Category deleted successfully' });
      } else {
        res.status(404).json({ message: 'Category not found' });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = CategoryController;