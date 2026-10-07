import { Router } from 'express';
import { 
  loginClient, 
  loginAdmin, 
  refreshToken, 
  logout,       
  getClientPerfil, 
  getAdminMetricas,
  getAdminUsuarios,
  createAdminProducto,
  getAdminReportes
} from '../controllers/authController.js';
import { verifyToken, isClient, isAdmin, checkAdminRole } from '../middlewares/authMiddleware.js';

const router = Router();


router.post('/auth/client/login', loginClient);
router.post('/auth/admin/login', loginAdmin);
router.post('/auth/refresh', refreshToken); 
router.post('/auth/logout', logout);       


router.get('/client/perfil', verifyToken, isClient, getClientPerfil);


router.get('/admin/metricas', verifyToken, isAdmin, getAdminMetricas);


router.get('/admin/usuarios', verifyToken, isAdmin, checkAdminRole(['superadmin']), getAdminUsuarios);
router.post('/admin/productos', verifyToken, isAdmin, checkAdminRole(['superadmin', 'gestor_productos']), createAdminProducto);
router.get('/admin/reportes', verifyToken, isAdmin, checkAdminRole(['superadmin', 'auditor']), getAdminReportes);

export default router;