const express = require('express')
const cors = require('cors')

const mysql = require('mysql2/promise')
const app = express()

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'imperio-gym',
    waitForConnections: true,
    connectionLimit: 10
});

app.use(cors())
app.use(express.json())



app.post('/register', async (req, res) => {
    const { name, pass, email } = req.body;

    try {
        if (!name || !pass || !email) {
            return res.status(400).json({ succes: false, menssage: 'Complete all fields' })
        }
        const sql = "INSERT INTO users (name, password, email) VALUES (?, ?, ?)";
        await db.execute(sql, [name, pass, email]);

        res.status(201).json({
            succes: true,
            menssage: 'Successfully registered user'
        });

    } catch (error) { // Cambia 'errpr' por 'error'
        console.error(error);
        res.status(500).json({
            succes: false,
            menssage: 'Error registering user'
        });
    }
});

app.post('/login', async (req, res) => {
    const { name, pass } = req.body;

    try {
        const sql = 'SELECT * FROM users WHERE name = ? AND password = ?';
        const [rows] = await db.execute(sql, [name, pass]);

        if (rows.length > 0) {
            res.status(200).json({
                success: true,
                user: rows[0].name,
                admin: rows[0].admin,
                id: rows[0].id
            });
        } else {
            res.status(401).json({ success: false, menssage: 'Invalid credentials' })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, menssage: "Server error" })
    }
})

app.get('/rutinas', async (req, res) => {
    try {
        const sql = `SELECT 
            r.id, -- <--- AGREGAMOS EL ID AQUÍ
            r.nombre_rutina, 
            r.nivel, 
            CONCAT('[', 
                GROUP_CONCAT(
                    JSON_OBJECT(
                        'nombre', e.nombre, 
                        'series', rd.series, 
                        'repeticiones', rd.repeticiones
                    )
                ), 
            ']') AS ejercicios
        FROM rutinas r
        JOIN rutina_detalle rd ON r.id = rd.rutina_id
        JOIN ejercicios e ON rd.ejercicio_id = e.id
        GROUP BY r.id, r.nombre_rutina, r.nivel
        ORDER BY r.nombre_rutina;`;

        const [rows] = await db.execute(sql);

        const dataFormateada = rows.map(row => ({
            ...row,
            ejercicios: typeof row.ejercicios === 'string' ? JSON.parse(row.ejercicios) : row.ejercicios
        }));

        res.status(200).json({
            success: true,
            data: dataFormateada
        });
    } catch (error) {
        console.error("Error en el servidor:", error);
        res.status(500).json({ success: false, message: "Error interno" });
    }
});

app.get('/ejercicios', async (req, res) => {
    try {
        const sql = `SELECT * FROM ejercicios`
        const [rows] = await db.execute(sql)
        res.status(200).json({
            success: true,
            data: rows
        });

    } catch (error) {
        console.error('Error en el servidor', error)
        res.status(500).json({
            success: false,
            menssage: 'Error interno del servidor'
        })
    }
})

app.post('/nuevaRutina', async (req, res) => {
    const { nombreRutina, nivel, creador, ejercicios } = req.body;
    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        // 1. Insertar la rutina general
        const [resRutina] = await connection.execute(
            'INSERT INTO rutinas (nombre_rutina, nivel, creador) VALUES (?, ?, ?)',
            [nombreRutina, nivel, creador]
        );
        const rutinaId = resRutina.insertId;

        // 2. Insertar cada ejercicio del array
        const sqlDetalle = 'INSERT INTO rutina_detalle (rutina_id, ejercicio_id, series, repeticiones, orden) VALUES (?, ?, ?, ?, ?)';

        for (let i = 0; i < ejercicios.length; i++) {
            const { ejercicio_id, series, repeticiones } = ejercicios[i];
            await connection.execute(sqlDetalle, [rutinaId, ejercicio_id, series, repeticiones, i + 1]);
        }

        await connection.commit();
        res.status(200).json({ success: true, message: 'Rutina creada!' });

    } catch (error) {
        await connection.rollback();
        console.error(error);
        res.status(500).json({ success: false, message: 'Error al guardar' });
    } finally {
        connection.release();
    }
});

app.listen(3001, () => console.log("Servidor corriendo en el puerto 3001"));