const express = require("express");
const mysql = require("mysql");
const app = express();
const PORT = 3000;

const conexion = mysql.createConnection({
    host: "localhost",
    database: "unasspayj",
    user: "root",
    password: ""
});


conexion.connect(function(err) {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        throw err;
    } else {
        console.log("Conexión exitosa a la base de datos");
    }
});

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static('views'));
app.use(express.urlencoded({ extended: false }));


app.get("/", function(req, res) {
    res.render("Pagina_Agenda_Citas");
});

app.post("/cita", function(req, res) {
    const { manicurista, servicio, fecha, hora } = req.body;

    const query = "INSERT INTO citas (manicurista, servicio, fecha, hora) VALUES (?, ?, ?, ?)";
    conexion.query(query, [manicurista, servicio, fecha, hora], function(error, results) {
        if (error) {
            console.error('Error al insertar datos en la base de datos:', error);
            res.status(500).send('Error al insertar los datos en la base de datos');
        } else {
            console.log("Datos insertados correctamente");
            res.status(200).send('Datos insertados correctamente');
        }
    });
});

app.post('/consulta', (req, res) => {
    const { manicurista, servicio, fecha } = req.body;

    const query = 'SELECT * FROM citas WHERE manicurista = ? AND servicio = ? AND fecha = ?';
    conexion.query(query, [manicurista, servicio, fecha], (error, results) => {
        if (error) {
            console.error('Error al consultar la base de datos:', error);
            res.status(500).send('Error al consultar la base de datos');
        } else {
            console.log(results);
            res.json(results);
        }
    });
});
app.get("/citas", function(req, res) {
    conexion.query("SELECT * FROM citas", function(error, results) {
        if (error) {
            console.error('Error al obtener las citas:', error);
            res.status(500).send('Error al obtener las citas');
        } else {
            res.json(results);
        }
    });
});

app.delete("/eliminar-cita/:id", function(req, res) {
    const id = req.params.id;

    conexion.query("DELETE FROM citas WHERE id = ?", [id], function(error, results) {
        if (error) {
            console.error('Error al eliminar la cita:', error);
            res.status(500).send('Error al eliminar la cita en el servidor: ' + error.message);
        } else {
            res.status(200).send('Cita eliminada correctamente');
        }
    });
});

app.put('/actualizar-cita/:id', (req, res) => {
    const idCita = req.params.id;
    const { manicurista, servicio, fecha, hora } = req.body;

    // Construir la consulta SQL para actualizar la cita
    const query = 'UPDATE citas SET manicurista = ?, servicio = ?, fecha = ?, hora = ? WHERE id = ?';
    conexion.query(query, [manicurista, servicio, fecha, hora, idCita], (error, results) => {
        if (error) {
            console.error('Error al actualizar la cita:', error);
            res.status(500).json({ success: false, message: 'Error al actualizar la cita' });
        } else {
            console.log('Cita actualizada correctamente');
            res.json({ success: true, message: 'Cita actualizada correctamente' });
        }
    });
});


app.listen(PORT, function() {
    console.log(`Servidor escuchando en el puerto http://localhost:3000`);
});

