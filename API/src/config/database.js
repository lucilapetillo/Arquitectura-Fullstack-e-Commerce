import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'tiendamates',
  process.env.DB_USER || 'root',
  process.env.DB_PASS || '',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: false
  }
);

export const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log(' Conexión a MySQL establecida correctamente.');
  } catch (error) {
    console.error(' Error al conectar con la base de datos:', error.message);
  }
};


export { sequelize };
export default sequelize;