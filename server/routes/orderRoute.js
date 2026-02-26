import express from 'express';
import authUser from '../middlewares/authUser.js';
import authSeller from '../middlewares/authSeller.js'; // <-- Add this import
import { 
    placeOrderCOD, 
    placeOrderStripe, 
    stripeWebhook, 
    getUserOrders, 
    getAllOrders 
} from '../controllers/orderController.js';

const orderRouter = express.Router();

// Place order COD
orderRouter.post('/cod', authUser, placeOrderCOD);

// Place order stripe
orderRouter.post('/stripe', authUser, placeOrderStripe);

// Stripe webhook
orderRouter.post('/webhook', stripeWebhook);

// Get orders by user
orderRouter.get('/user', authUser, getUserOrders);

// Get all orders (for seller/admin)
orderRouter.get('/seller', authSeller, getAllOrders);

export default orderRouter;
