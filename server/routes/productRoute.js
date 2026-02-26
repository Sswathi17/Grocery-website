import express from 'express';
import { addProduct, changeStock, productById, productList } from '../controllers/productController.js';
import upload from '../configs/multer.js'; // ✅ default import
import authSeller from '../middlewares/authSeller.js';

const productRouter = express.Router();

// Add product (protected route for seller) with multiple images
productRouter.post('/add', authSeller, upload.array("images"), addProduct);

// Get all products
productRouter.get('/list', productList);

// Get single product by ID
productRouter.get('/:id', productById);

// Change product stock (protected route for seller)
productRouter.post('/stock', authSeller, changeStock);

export default productRouter;