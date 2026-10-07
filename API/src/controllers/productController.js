import { Op } from 'sequelize';
import Product from '../models/Product.js';


export const getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;

    const { search, category, sortBy = 'id', order = 'ASC' } = req.query;

    
    const where = {};

    if (search) {
      where.name = { [Op.like]: `%${search}%` };
    }

    if (category) {
      where.category = category;
    }

   
    const { count, rows } = await Product.findAndCountAll({
      where,
      limit,
      offset,
      order: [[sortBy, order.toUpperCase()]]
    });

    const totalPages = Math.ceil(count / limit);

    return res.json({
      totalItems: count,
      totalPages,
      currentPage: page,
      products: rows
    });
  } catch (error) {
    console.error('Error al obtener productos:', error);
    return res.status(500).json({ message: 'Error al obtener productos.' });
  }
};


export const createProduct = async (req, res) => {
  try {
    const { name, price, stock, category, image, imagen } = req.body;

    
    const finalImage = (image || imagen || '').trim() || null;

    const newProduct = await Product.create({ 
      name, 
      price, 
      stock, 
      category, 
      image: finalImage 
    });

    return res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error al crear producto:', error);
    return res.status(500).json({ message: 'Error al crear producto.' });
  }
};


export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, stock, category, image, imagen } = req.body;

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: 'No se encontro el producto.' });
    }

    const inputImage = image !== undefined ? image : imagen;
    const finalImage = inputImage !== undefined 
      ? (inputImage ? inputImage.trim() : null) 
      : product.image;

    await product.update({ 
      name, 
      price, 
      stock, 
      category, 
      image: finalImage 
    });

    return res.json(product);
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    return res.status(500).json({ message: 'Error al actualizar producto.' });
  }
};


export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado.' });
    }

    await product.destroy();
    return res.json({ message: 'Producto eliminado correctamente.' });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    return res.status(500).json({ message: 'Error al eliminar producto.' });
  }
};