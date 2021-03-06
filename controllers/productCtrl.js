const Products = require('../models/productModel')

//filter, sorting and paginating

class APIfeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    filtering() {
        const queryObj = { ...this.queryString } //queryString= req.query
        // console.log({ before: queryObj }) // before delete page 

        const excludedFields = ['page', 'sort', 'limit']
        excludedFields.forEach(el => delete (queryObj[el]))

        // console.log({ after: queryObj }) // after delete page 

        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)
        // console.log({ queryStr })


        //gte = greater than or equal
        //lte = lesser than or equal
        //lt = lesser than
        //gt  = greater than
        this.query.find(JSON.parse(queryStr))

        return this;

    }

    sorting() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ')
            console.log(sortBy)

            this.query = this.query.sort(sortBy)
        } else {
            this.query = this.query.sort('-createdAt')

        }

        return this;
    }

    paginating() {
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 8
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)


        return this;
    }
}

const productCtrl = {
    getProducts: async (req, res) => {
        try {
            const features = new APIfeatures(Products.find(), req.query).filtering().sorting().paginating()
            const products = await features.query

            res.json(
                {
                    status: 'success',
                    result: products.length,
                    products: products
                }
            )
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    createProduct: async (req, res) => {
        try {
            const { product_id, title, price, description, content, images, category } = req.body

            if (!images) return res.status(400).json({ msg: "???nh kh??ng ???????c t???i l??n" })

            const product = await Products.findOne({ product_id })
            if (product)
                return res.status(400).json({ msg: "S???n ph???m ???? t???n t???i." })

            const newProduct = new Products({
                product_id, title: title.toLowerCase(), price, description, content, images, category
            })

            await newProduct.save()
            res.json({ msg: "T???o m???i s???n ph???m" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteProduct: async (req, res) => {
        try {
            await Products.findByIdAndDelete(req.params.id)

            res.json({ msg: "X??a s???n ph???m" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateProduct: async (req, res) => {
        try {
            const { title, price, description, content, images, category } = req.body

            if (!images) return res.status(400).json({ msg: "Kh??ng c?? ???nh t???i l??n" })

            await Products.findByIdAndUpdate({ _id: req.params.id }, {
                title: title.toLowerCase(), price, description, content, images, category
            })

            res.json({ msg: "C???p nh???t s???n ph???m" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    reviews: async (req, res) => {
        try {
            const { rating } = req.body
            if (rating && rating !== 0) {
                const product = await Products.findById(req.params.id)
                if (!product) return res.status(400).json({ msg: "S???n Ph???m Kh??ng T???n T???i." })

                let num = product.numReviews
                let rate = product.rating

                await Products.findOneAndUpdate({ _id: req.params.id }, {
                    rating: rate + rating, numReviews: num + 1
                })

                res.json({ msg: "C???p nh???t th??nh c??ng" })
            }

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
}

module.exports = productCtrl