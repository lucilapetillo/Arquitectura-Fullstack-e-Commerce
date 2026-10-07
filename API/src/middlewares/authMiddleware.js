import jwt from 'jsonwebtoken';


export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secreto');
    req.user = decoded; 
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token invalido o expirado' });
  }
};


export const isClient = (req, res, next) => {
  if (req.user?.type !== 'client') {
    return res.status(403).json({ error: 'No tiene acceso, necesita rol de Cliente' });
  }
  next();
};


export const isAdmin = (req, res, next) => {
  if (req.user?.type !== 'admin') {
    return res.status(403).json({ error: 'No tiene acceso, necesita rol de Administrador' });
  }
  next();
};


export const checkAdminRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || req.user.type !== 'admin') {
      return res.status(403).json({ error: 'No tiene acceso, no es un administrador' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'No tiene acceso, permisos insuficientes' });
    }

    next();
  };
};