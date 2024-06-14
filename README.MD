# Like Me - Social Media Platform

## Descripción
Like Me es una plataforma de redes sociales centrada en compartir y valorar posts a través de likes. Esta aplicación permite a los usuarios crear posts con imágenes y descripciones, visualizarlos, darles "likes" y eliminarlos.

## Características
- **Crear Posts**: Los usuarios pueden crear posts con su nombre, una URL de imagen y una descripción.
- **Visualizar Posts**: Los posts se muestran en la página principal donde todos los usuarios pueden ver los últimos posts agregados.
- **Likes**: Los usuarios pueden dar likes a los posts utilizando un ícono de corazón.
- **Eliminar Posts**: Los posts pueden ser eliminados por los usuarios.

## Tecnologías Utilizadas
- **Frontend**:
  - HTML5
  - CSS3
  - JavaScript
  - jQuery
  - Bootstrap para el diseño responsivo
  - Axios para peticiones HTTP
- **Backend**:
  - Node.js
  - Express.js para manejar las rutas del servidor
  - PostgreSQL para la base de datos
  - Joi para la validación de datos

## Configuración del Proyecto
Para ejecutar este proyecto localmente, debes seguir los siguientes pasos:

### Prerrequisitos
Asegúrate de tener Node.js y PostgreSQL instalados en tu máquina. Además, necesitarás tener acceso a una instancia de PostgreSQL.

### Instalación
1. Clona el repositorio en tu máquina local:

git clone https://github.com/JuanaC24/like-me.git
cd like-me

2. Instala las dependencias necesarias:

npm install

3. Configura las variables de entorno creando un archivo `.env` en la raíz del proyecto con el siguiente contenido (ajusta según tu configuración):

DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=likeme
PORT=3000

4. Ejecuta las migraciones de la base de datos (asegúrate de tener PostgreSQL corriendo):

psql -U tu_usuario -d likeme -a -f path/a/tu/archivo.sql

5. Inicia el servidor:

npm start

El servidor estará disponible en `http://localhost:3000`.

# Detalles del Servidor
El servidor backend, construido con Node.js y Express, gestiona varias rutas API para la interacción con una base de datos PostgreSQL. A continuación se describen las rutas principales:

## Rutas del API

- **POST /post**: Permite a los usuarios crear nuevos posts con datos como el nombre del usuario, URL de la imagen y descripción.
- **GET /posts**: Devuelve todos los posts almacenados en la base de datos, mostrando detalles como ID, usuario, URL, descripción y likes.
- **PUT /post**: Incrementa los likes de un post especificado por su ID.
- **DELETE /post/:id**: Elimina un post basado en su ID.

### Características y Seguridad

Validación de Datos: Emplea Joi para asegurar que todos los datos de entrada cumplan con los formatos requeridos antes de ser procesados o almacenados.
Manejo de Errores: Implementa un manejo de errores robusto para responder adecuadamente a errores de entrada o problemas de servidor.
Tecnologías Utilizadas: Utiliza tecnologías como PostgreSQL para la gestión de datos y pg para interactuar con la base de datos.


## Uso
Una vez que el servidor esté corriendo, puedes acceder a la aplicación a través de `http://localhost:3000` en tu navegador.

## Contribuciones
Las contribuciones son lo que hacen a la comunidad de código abierto un lugar tan increíble para aprender, inspirar y crear. Cualquier contribución que hagas será **muy apreciada**.

## Autores

- **Juana Cortez** - Desarrollador Principal - [Perfil de GitHub](https://github.com/JuanaC24)


## Agradecimientos
- [FontAwesome](https://fontawesome.com/)
- [Bootstrap](https://getbootstrap.com/)
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
