import Product from '../models/product.model.js'
import extend from 'lodash/extend.js'
import errorHandler from './error.controller.js'

const create = async (req, res) => { 
    const product = new Product(req.body) 
        try {
            await product.save()
            return res.status(200).json({ 
            message: "Added product successfully!"
        })
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err) 
        })
    } 
}
const list = async (req, res) => { 
    let name = req.query.name;
    try {
        let product = ""
        if(name == undefined )
            product = await Product.find().select('name description price quantity category') 
        else 
            product = await Product.find({name: name}).select('name description price quantity category') 
        res.json(product)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err) 
        })
    } 
}

const productById = async (req, res, next, id) => {
    try {
        console.log(id)
        let product = await Product.findById(id) 
        if (!product)
            return res.status(400).json({ 
            error: "Product not found"
        })
        req.product = product 
        next()
    } catch (err) {
        return res.status(400).json({ 
            error: "Could not retrieve product"
        }) 
    }
}

const read = (req, res) => {
    return res.json(req.product) 
}

const update = async (req, res) => { 
    try {
        let product = req.product
        product = extend(product, req.body) 
        product.updated = Date.now() 
        await product.save()
        res.json(product) 
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err) 
        })
    } 
}

const remove = async (req, res) => { 
    try {
        let product = req.product
        let deletedProduct = await product.deleteOne() 

        res.json(deletedProduct) 
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err) 
        })
    } 
}

const removeAll = async (req, res) => { 
    try {
        let deletedProducts = await Product.deleteMany()
        res.json(deletedProducts) 
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err) 
        })
    } 
}

export default { create, list, read, productById, update,  remove, removeAll }
