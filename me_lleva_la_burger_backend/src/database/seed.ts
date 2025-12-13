import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';

export async function seed(dataSource: DataSource) {
  const customerRepo = dataSource.getRepository('Customer');
  const employeeRepo = dataSource.getRepository('Employee');
  const productRepo = dataSource.getRepository('Product');

  // Seed Customers
  const customersCount = await customerRepo.count();
  if (customersCount === 0) {
    const hashedPassword = await bcrypt.hash('password123', 10);
    await customerRepo.insert([
      {
        nombre_cliente: 'Juan',
        apellido_cliente: 'Pérez',
        correo_cliente: 'juan.perez@email.com',
        contrasena_cliente: hashedPassword,
        telefono_cliente: '5551234567',
        direccion: 'Calle Falsa 123, CDMX',
        estado_cliente: 'activo',
      },
      {
        nombre_cliente: 'María',
        apellido_cliente: 'González',
        correo_cliente: 'maria.gonzalez@email.com',
        contrasena_cliente: hashedPassword,
        telefono_cliente: '5559876543',
        direccion: 'Av. Principal 456, Monterrey',
        estado_cliente: 'activo',
      },
      {
        nombre_cliente: 'Carlos',
        apellido_cliente: 'López',
        correo_cliente: 'carlos.lopez@email.com',
        contrasena_cliente: hashedPassword,
        telefono_cliente: '5555551234',
        direccion: 'Boulevard Central 789, Guadalajara',
        estado_cliente: 'activo',
      },
    ]);
    console.log('✅ Customers seeded');
  }

  // Seed Employees
  const employeesCount = await employeeRepo.count();
  if (employeesCount === 0) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await employeeRepo.insert([
      {
        nombre_empleado: 'Ana',
        apellido_empleado: 'Martínez',
        correo_empleado: 'ana.martinez@burguerexpress.com',
        contrasena_empleado: hashedPassword,
        telefono_empleado: '5552223333',
        cargo: 'gerente',
        estado_empleado: 'activo',
      },
      {
        nombre_empleado: 'Luis',
        apellido_empleado: 'Ramírez',
        correo_empleado: 'luis.ramirez@burguerexpress.com',
        contrasena_empleado: hashedPassword,
        telefono_empleado: '5554445555',
        cargo: 'cocinero',
        estado_empleado: 'activo',
      },
      {
        nombre_empleado: 'Sofia',
        apellido_empleado: 'Torres',
        correo_empleado: 'sofia.torres@burguerexpress.com',
        contrasena_empleado: hashedPassword,
        telefono_empleado: '5556667777',
        cargo: 'cajero',
        estado_empleado: 'activo',
      },
    ]);
    console.log('✅ Employees seeded');
  }

  // Seed Products
  const productsCount = await productRepo.count();
  if (productsCount === 0) {
    await productRepo.insert([
      {
        nombre_producto: 'Hamburguesa Clásica',
        descripcion: 'Hamburguesa de carne de res con lechuga, tomate, cebolla y salsa especial',
        ingredientes: 'Carne de res, pan, lechuga, tomate, cebolla, queso, salsa',
        precio: 89.00,
        foto: null,
        disponibilidad: 'disponible',
      },
      {
        nombre_producto: 'Hamburguesa BBQ',
        descripcion: 'Hamburguesa con tocino, cebolla caramelizada y salsa BBQ',
        ingredientes: 'Carne de res, pan, tocino, cebolla, queso cheddar, salsa BBQ',
        precio: 109.00,
        foto: null,
        disponibilidad: 'disponible',
      },
      {
        nombre_producto: 'Hamburguesa de Pollo',
        descripcion: 'Pechuga de pollo empanizada con mayonesa y lechuga',
        ingredientes: 'Pechuga de pollo, pan, lechuga, mayonesa, pepinillos',
        precio: 79.00,
        foto: null,
        disponibilidad: 'disponible',
      },
      {
        nombre_producto: 'Papas Fritas',
        descripcion: 'Papas fritas crujientes con sal',
        ingredientes: 'Papas, aceite, sal',
        precio: 35.00,
        foto: null,
        disponibilidad: 'disponible',
      },
      {
        nombre_producto: 'Refresco 500ml',
        descripcion: 'Refresco de cola de 500ml',
        ingredientes: 'Agua carbonatada, jarabe, azúcar',
        precio: 25.00,
        foto: null,
        disponibilidad: 'disponible',
      },
      {
        nombre_producto: 'Nuggets de Pollo',
        descripcion: '6 piezas de nuggets de pollo con salsa a elegir',
        ingredientes: 'Pollo, empanizado, aceite, salsas',
        precio: 59.00,
        foto: null,
        disponibilidad: 'disponible',
      },
      {
        nombre_producto: 'Ensalada César',
        descripcion: 'Ensalada fresca con aderezo césar y crutones',
        ingredientes: 'Lechuga romana, aderezo césar, queso parmesano, crutones',
        precio: 69.00,
        foto: null,
        disponibilidad: 'disponible',
      },
      {
        nombre_producto: 'Malteada de Chocolate',
        descripcion: 'Malteada cremosa de chocolate',
        ingredientes: 'Helado de chocolate, leche, jarabe de chocolate',
        precio: 49.00,
        foto: null,
        disponibilidad: 'disponible',
      },
    ]);
    console.log('✅ Products seeded');
  }

  console.log('🌱 Database seeding completed!');
}
