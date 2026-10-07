import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import { sequelize } from './src/config/database.js';
import { Client } from './src/models/Client.js';
import { Admin } from './src/models/Admin.js';
import authRoutes from './src/routes/authRoutes.js';
import productRoutes from './src/routes/productRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', productRoutes);

const PORT = 3000;


sequelize.sync().then(async () => {
  console.log('Base de datos sincronizada');


  const superAdminPassword = await bcrypt.hash('admin123', 10);
  const [superAdmin, superCreated] = await Admin.findOrCreate({
    where: { email: 'admin@tienda.com' },
    defaults: { 
      nombre: 'Super Admin', 
      email: 'admin@tienda.com', 
      password: superAdminPassword,
      role: 'superadmin' 
    }
  });

  if (!superCreated) {
    superAdmin.password = superAdminPassword;
    superAdmin.role = 'superadmin';
    await superAdmin.save();
    console.log('Usuario y contraseña de Superadmin actualizados correctamente.');
  }

 
  const gestorPassword = await bcrypt.hash('gestor123', 10);
  const [gestorAdmin, gestorCreated] = await Admin.findOrCreate({
    where: { email: 'gestor@tienda.com' },
    defaults: { 
      nombre: 'Gestor Productos', 
      email: 'gestor@tienda.com', 
      password: gestorPassword,
      role: 'gestor_productos' 
    }
  });

  if (!gestorCreated) {
    gestorAdmin.password = gestorPassword;
    gestorAdmin.role = 'gestor_productos';
    await gestorAdmin.save();
    console.log('Usuario y contraseña de Gestor actualizados correctamente.');
  }


  const auditorPassword = await bcrypt.hash('auditor123', 10);
  const [auditorAdmin, auditorCreated] = await Admin.findOrCreate({
    where: { email: 'auditor@tienda.com' },
    defaults: { 
      nombre: 'Auditor General', 
      email: 'auditor@tienda.com', 
      password: auditorPassword,
      role: 'auditor' 
    }
  });

  if (!auditorCreated) {
    auditorAdmin.password = auditorPassword;
    auditorAdmin.role = 'auditor';
    await auditorAdmin.save();
    console.log('Usuario y contraseña de Auditor actualizados correctamente.');
  }

  
  const clientPassword = await bcrypt.hash('cliente123', 10);
  const [clientUser, clientCreated] = await Client.findOrCreate({
    where: { email: 'cliente@tienda.com' },
    defaults: { 
      nombre: 'Cliente Inicial', 
      email: 'cliente@tienda.com', 
      password: clientPassword 
    }
  });

  if (!clientCreated) {
    clientUser.password = clientPassword;
    await clientUser.save();
    console.log('Usuario y contraseña de Cliente actualizados correctamente.');
  }

  app.listen(PORT, () => console.log(`Servidor escuchando en http://localhost:${PORT}`));
}).catch(err => console.error('Error al conectar con la base de datos:', err));