import mongoose from 'mongoose';
import Product from '../models/product.model.js';

// Select All
export const getProduct = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.error(`Error in Getting products: ${error.message}`);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// Select by ID
export const getProductID = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: 'Invalid Product ID!' });
    }

    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found!' });
        }
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        console.error(`Error in Getting product by ID: ${error.message}`);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// Create
export const createProduct = async (req, res) => {
    const product = req.body;

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: 'Please provide all product details correctly.' });
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.error(`Error in Creating product: ${error.message}`);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// Update
export const updateProduct = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: 'Invalid Product ID!' });
    }

    const product = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: 'Product not found!' });
        }
        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        console.error(`Error in Updating product: ${error.message}`);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// Delete
export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: 'Invalid Product ID!' });
    }

    try {
        const result = await Product.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ success: false, message: 'Product not found!' });
        }

        // Use 200 OK to return a success message
        res.status(200).json({ success: true, message: 'Product deleted successfully.' });
    } catch (error) {
        console.error(`Error in Deleting product: ${error.message}`);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

