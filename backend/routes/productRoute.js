import express from 'express';

import { createProduct, deleteProduct, getProduct, getProductID, updateProduct } from '../controllers/product.controller.js';



const router = express.Router();

//Select All
router.get('/', getProduct);

//Select ID
router.get('/:id', getProductID);

//Insert
router.post('/', createProduct);

//Update
router.put('/:id', updateProduct);

//Delete ID
router.delete('/:id', deleteProduct);

export default router;