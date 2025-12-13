## ✅ TODO List

_Nota: se usa `PATCH` en lugar de `PUT` para actualizaciones parciales (corregir solo un dato). Los endpoints de Customer y Employee ya están terminados._

### 🔐 Autenticación

- [ ] Crear endpoint: `POST /auth/customer/login`
- [ ] Crear endpoint: `POST /auth/employee/login`

### 👤 Customer

- [x] `POST /customers`
- [x] `GET /customers`
- [x] `GET /customers/:id`
- [x] `PATCH /customers/:id`
- [x] `DELETE /customers/:id`

### 👨‍🍳 Employee

- [x] `POST /employees`
- [x] `GET /employees`
- [x] `GET /employees/:id`
- [x] `PATCH /employees/:id`
- [x] `DELETE /employees/:id`

### 🍔 Product

- [x] `POST /products`
- [x] `GET /products`
- [x] `GET /products/:id`
- [x] `PATCH /products/:id`
- [x] `DELETE /products/:id`
- [x] `GET /products/available`

### 🛒 Cart

- [x] `POST /carts`
- [x] `GET /carts`
- [x] `GET /carts/:id`
- [x] `PATCH /carts/:id`
- [x] `DELETE /carts/:id`
- [x] `POST /carts/:id/add`
- [x] `POST /carts/:id/remove`
- [x] `POST /carts/:id/clear`
- [x] `GET /carts/customer/:customerId`

### 📦 Order

- [x] `POST /orders`
- [x] `GET /orders`
- [x] `GET /orders/:id`
- [x] `PATCH /orders/:id`
- [x] `DELETE /orders/:id`
- [x] `POST /orders/from-cart/:cartId`
- [x] `GET /orders/customer/:customerId`
- [x] `GET /orders/employee/:employeeId`
- [x] `PATCH /orders/:id/status`

### 💳 Payment

- [x] `POST /payments`
- [x] `GET /payments`
- [x] `GET /payments/:id`
- [x] `PATCH /payments/:id`
- [x] `DELETE /payments/:id`
- [x] `POST /payments/process`
- [x] `GET /payments/order/:orderId`

### 🌱 Seed

- [ ] Generar seed para productos
