import { Router } from 'express';
import { 
  getProducts, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} from '../controllers/productController.js';
import { verifyToken, checkAdminRole } from '../middlewares/authMiddleware.js';

const router = Router();


router.get('/products', getProducts);


router.post('/products', verifyToken, checkAdminRole(['superadmin', 'gestor_productos']), createProduct);
router.put('/products/:id', verifyToken, checkAdminRole(['superadmin', 'gestor_productos']), updateProduct);
router.delete('/products/:id', verifyToken, checkAdminRole(['superadmin', 'gestor_productos']), deleteProduct);

export default router;