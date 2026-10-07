import { Router } from 'express';

const router = Router();


router.get('/perfil', (req, res) => {
  return res.json({ message: 'Perfil de cliente' });
});

router.get('/catalogo', (req, res) => {
  return res.json({ message: 'Catálogo de productos' });
});

export default router;