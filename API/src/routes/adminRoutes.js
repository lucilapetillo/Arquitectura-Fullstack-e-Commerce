import { Router } from 'express';
import { verifyToken, checkAdminRole } from '../middlewares/authMiddleware.js';
import { 
  obtenerUsuarios, 
  crearProducto, 
  obtenerReportes 
} from '../controllers/adminController.js';

const router = Router();


router.get(
  '/usuarios', 
  verifyToken, 
  checkAdminRole(['superadmin']), 
  obtenerUsuarios
);


router.post(
  '/productos', 
  verifyToken, 
  checkAdminRole(['superadmin', 'gestor_productos']), 
  crearProducto
);


router.get(
  '/reportes', 
  verifyToken, 
  checkAdminRole(['superadmin', 'auditor']), 
  obtenerReportes
);

export default router;