import express from "express";
import Product from "./products.model.js";

/**
 * Get products
 * @returns { products }
 */
export const getProducts = async (req, res, next) => {
    try {
        const products = await Product.find();
        return res.json(products);

    } catch (error) {
        next(error)
    }
}

/**
 * Get product by name
 * @param sku
 * @returns { product }
 */
export const getProductBySKU = (req, res, next) => {
    try {
        const { sku } = req.params;
        const product = Product.findOne({SKU: sku});
        return res.json(product);

    } catch (error) {
        next(error)
    }
}

/**
 * Add product
 * @property {SKU} req.body.SKU
 * @property {name} req.body.name
 * @property {type} req.body.type
 * @property {quantity} req.body.quantity
 * @returns { product }
 */
export const addProduct = async(req, res, next) => {
    try {
        let payload = req.body;
        let product = await Product.findOne({ SKU: payload.SKU })
        if (product) {
            payload.updatedAt = new Date();
            product = await Product.findOneAndUpdate(
                { _id: product._id },
                { $set: payload },
                { new: true }
              );
              return res.json(product);
        }
        payload.createdAt = new Date();
        payload.updatedAt = new Date();
        product = new Product(payload);
        product.save();
        return res.json(product);

    } catch (error) {
        next(error)
    }
}

/**
 * Update product
 * @param {id} req.param
 * @property {SKU} req.body.SKU
 * @property {name} req.body.name
 * @property {type} req.body.type
 * @property {quantity} req.body.quantity
 * @returns { product }
 */
export const updateProduct = async(req, res, next) => {
    try {
        const { id } = req.params;
        let payload = req.body;

        let product = await Product.findById(id)
        if (!product) {
            throw new Error("Product not found!");
        } else {
            payload.updatedAt = new Date();
            product = await Product.findOneAndUpdate(
                { _id: product._id },
                { $set: payload },
                { new: true }
              );
              return res.json(product);
        }
    } catch (error) {
        next(error)
    }
}

