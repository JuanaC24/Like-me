require('dotenv').config(); 

const express = require('express');
const { Pool } = require('pg');
const Joi = require('joi');
const path = require('path');

const app = express();

// Configuración del pool de PostgreSQL usando variables de entorno
const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE
});

// Middleware para parsear el cuerpo de las solicitudes en formato JSON
app.use(express.json());

// Middleware para servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));

// Ruta específica para la raíz que sirve index.html explícitamente
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
// Definición del esquema de Joi para la validación de los datos del post
const postSchema = Joi.object({
    usuario: Joi.string().max(25).required(),
    url: Joi.string().max(1000).required(),
    descripcion: Joi.string().max(255).required()
});
// Ruta POST para crear un nuevo post
app.post('/post', async (req, res) => {
    try {
        // Validación de los datos recibidos
        const { value, error } = postSchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        // Insertar en la base de datos
        const query = 'INSERT INTO posts (usuario, url, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING *';
        const values = [value.usuario, value.url, value.descripcion, 0]; // Inicializa likes en 0

        const result = await pool.query(query, values);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al crear el post');
    }
});
// Ruta PUT para incrementar los likes de un post específico
app.put('/post', async (req, res) => {
    const { id } = req.query; // Obteniendo el ID del post desde los parámetros de la consulta

    if (!id) {
        return res.status(400).send('Se requiere el ID del post.');
    }

    try {
        const query = 'UPDATE posts SET likes = likes + 1 WHERE id = $1 RETURNING *';
        const values = [id];

        const result = await pool.query(query, values);
        if (result.rows.length > 0) {
            res.status(200).json(result.rows[0]);
        } else {
            res.status(404).send('Post no encontrado.');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al actualizar el post');
    }
});
// Ruta GET para obtener todos los posts
app.get('/posts', async (req, res) => {
    try {
        const query = 'SELECT * FROM posts ORDER BY id DESC'; // Selecciona todos los posts y los ordena por ID de manera descendente
        const result = await pool.query(query);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al recuperar los posts');
    }
});
// Ruta DELETE para eliminar un post específico
app.delete('/post/:id', async (req, res) => {
    const { id } = req.params; // Obtener el ID del post desde los parámetros de la ruta

    if (!id) {
        return res.status(400).send('ID del post requerido.');
    }

    try {
        const query = 'DELETE FROM posts WHERE id = $1 RETURNING *';
        const values = [id];

        const result = await pool.query(query, values);
        if (result.rows.length > 0) {
            res.status(200).json({ message: "Post eliminado exitosamente", post: result.rows[0] });
        } else {
            res.status(404).send('Post no encontrado.');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al eliminar el post');
    }
});



// Configuración del puerto y arranque del servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});