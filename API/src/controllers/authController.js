import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import  Client  from '../models/Client.js';
import  Admin  from '../models/Admin.js';

const JWT_SECRET = process.env.JWT_SECRET || 'secreto_super_seguro';
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'secreto_refresh_super_seguro';


const generateTokens = (payload) => {
  const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign(payload, REFRESH_SECRET, { expiresIn: '7d' });
  return { accessToken, refreshToken };
};


export const loginClient = async (req, res) => {
  try {
    const { email, password } = req.body;
    const client = await Client.findOne({ where: { email } });

    if (!client) {
      return res.status(401).json({ message: 'Usurio o Contraseña incorrectos' });
    }

    const isValidPassword = await bcrypt.compare(password, client.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Usurio o Contraseña incorrectos' });
    }

    const payload = { id: client.id, type: 'client', email: client.email };
    const { accessToken, refreshToken } = generateTokens(payload);

    client.refreshToken = refreshToken;
    await client.save();

    return res.json({
      token: accessToken,
      refreshToken,
      userType: 'client',
      nombre: client.nombre
    });
  } catch (error) {
    console.error('Error en loginClient:', error);
    return res.status(500).json({ message: 'Error' });
  }
};


export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ where: { email } });

    if (!admin) {
      return res.status(401).json({ message: 'Usurio o Contraseña incorrectos' });
    }

    const isValidPassword = await bcrypt.compare(password, admin.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Usurio o Contraseña incorrectos' });
    }

    const payload = { id: admin.id, type: 'admin', role: admin.role, email: admin.email };
    const { accessToken, refreshToken } = generateTokens(payload);

    admin.refreshToken = refreshToken;
    await admin.save();

    return res.json({
      token: accessToken,
      refreshToken,
      userType: 'admin',
      role: admin.role,
      nombre: admin.nombre
    });
  } catch (error) {
    console.error('Error en loginAdmin:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};


export const refreshToken = async (req, res) => {
  try {
    const { refreshToken: tokenReceived } = req.body;

    if (!tokenReceived) {
      return res.status(400).json({ message: 'Refresh token requerido' });
    }

    let decoded;
    try {
      decoded = jwt.verify(tokenReceived, REFRESH_SECRET);
    } catch (err) {
      return res.status(401).json({ message: 'Refresh token invalido o expirado' });
    }

    let user;
    if (decoded.type === 'admin') {
      user = await Admin.findOne({ where: { id: decoded.id, refreshToken: tokenReceived } });
    } else if (decoded.type === 'client') {
      user = await Client.findOne({ where: { id: decoded.id, refreshToken: tokenReceived } });
    }

    if (!user) {
      return res.status(401).json({ message: 'Sesión no encontrada o token revocado' });
    }

    const payload = decoded.type === 'admin'
      ? { id: user.id, type: 'admin', role: user.role, email: user.email }
      : { id: user.id, type: 'client', email: user.email };

    const tokens = generateTokens(payload);

    user.refreshToken = tokens.refreshToken;
    await user.save();

    return res.json({
      token: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      userType: decoded.type,
      role: user.role || null,
      nombre: user.nombre
    });
  } catch (error) {
    console.error('Error en refreshToken:', error);
    return res.status(500).json({ message: 'Error al refrescar token' });
  }
};


export const logout = async (req, res) => {
  try {
    const { refreshToken: tokenReceived } = req.body;

    if (tokenReceived) {
      const admin = await Admin.findOne({ where: { refreshToken: tokenReceived } });
      if (admin) {
        admin.refreshToken = null;
        await admin.save();
      } else {
        const client = await Client.findOne({ where: { refreshToken: tokenReceived } });
        if (client) {
          client.refreshToken = null;
          await client.save();
        }
      }
    }

    return res.json({ message: 'Se cerro la sesion' });
  } catch (error) {
    console.error('Error en logout:', error);
    return res.status(500).json({ message: 'Error al cerrar sesion' });
  }
};


export const getClientPerfil = async (req, res) => {
  return res.json({ message: 'Perfil de cliente obtenido' });
};

export const getAdminMetricas = async (req, res) => {
  return res.json({ message: 'Metricas de administrador' });
};

export const getAdminUsuarios = async (req, res) => {
  return res.json({ message: 'Lista de usuarios (Superadmin)' });
};

export const createAdminProducto = async (req, res) => {
  return res.json({ message: 'Producto creado desde Admin' });
};

export const getAdminReportes = async (req, res) => {
  return res.json({ message: 'Reportes del sistema' });
};