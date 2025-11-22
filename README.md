      <h1> 🚀 API Naves y Patrullas Espaciales </h1>

API RESTful construida con Node.js, Express y Mongoose. Implementa Autenticación (Bearer Token) y Autorización por Roles (admin).

🛠️ Configuración Rápida

-Requisitos:

Node.js (v18+)

MongoDB (Base de datos)

Mongoose (ORM/Librería de modelado para Node.js)

Nodemon (Para el desarrollo y recarga automática)

Postman o similar (Para probar los endpoints de la API)

Instalación: npm install

-Arranque:

Crea el archivo .env en la raíz del proyecto.

Define las variables esenciales:

    # .env

MONGO_URI="mongodb+srv://[usuario]:[password]@[cluster].mongodb.net/[db_name]"
PORT=6000

-Inicia el servidor:

npm start

El servidor se ejecuta en http://localhost:6000

-🔒 Seguridad y Acceso

Todas las rutas requieren la cabecera Authorization.

Token de Acceso

Para desarrollo, usa el token simulado:
Authorization: Bearer 123

Nota: El token 123 asigna el rol admin al usuario, necesario para las rutas protegidas.

🔑 Endpoints de la API

Base URL: http://localhost:6000

+Naves (/naves)

Método

Ruta

Descripción

Requiere Rol

GET

/naves

Lista todas las naves.

- POST

/naves

Crea una nueva nave.

- PUT

/naves/admin/fix-calidad

Corrige masivamente la calidad.

admin

+Patrullas (/patrol)

Método

Ruta

Descripción

Requiere Rol

-GET

/patrol

Lista todas las patrullas.

- POST

/patrol

Crea una nueva patrulla.

- PUT

/patrol/:id

Actualiza una patrulla por ID.

admin

💡 Ejemplo (Postman)

Para actualizar una patrulla protegida (PUT /patrol/:id):

Método: PUT

Headers:

Authorization: Bearer 123

Content-Type: application/json

Body (raw, JSON):

{
"price": 550000,
"size": "Colossal"
}
