const Category = require('../models/categoryModel')
const Products = require('../models/productModel')

const categoryCtrl = {
    getCategories: async (req, res) => {
        try {
            const categories = await Category.find()
            res.json(categories)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    createCategory: async (req, res) => {
        try {
            // neu user co role = 1 -> admin
            // danh cho admin them sua xoa san pham
            const { name } = req.body;
            const category = await Category.findOne({ name })

            if (category) return res.status(400).json({ msg: "Category tồn tại. " })

            const newCategory = new Category({ name })

            await newCategory.save()
            res.json({ msg: "Thêm thành công category." })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteCategory: async (req, res) => {
        try {
            // neu user co role = 1 -> admin
            // danh cho admin them sua xoa san pham
            const products = await Products.findOne({ category: req.params.id })
            if (products) return res.status(400).json({ msg: "Hãy xóa sản phẩm liên quan đến danh mục." })

            await Category.findByIdAndDelete(req.params.id)
            res.json({ msg: "Xóa category thành công." })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateCategory: async (req, res) => {
        try {
            // neu user co role = 1 -> admin
            // danh cho admin them sua xoa san pham
            const { name } = req.body
            await Category.findOneAndUpdate({ _id: req.params.id }, { name })

            res.json({ msg: "Cập nhật category." })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

module.exports = categoryCtrl