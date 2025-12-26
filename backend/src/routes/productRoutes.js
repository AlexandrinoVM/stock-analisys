import express from 'express';
import ProductController from '../controllers/productController.js';
import { authMiddleware } from '../middleware/authMiddlewere.js';

const router = express.Router();

router.get('/', authMiddleware,ProductController.getAll);
router.post('/', authMiddleware, ProductController.create);
router.put('/:id', authMiddleware, ProductController.update);
router.delete('/:id', authMiddleware, ProductController.delete);

export default router;
