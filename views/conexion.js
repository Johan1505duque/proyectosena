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
            res.json(results);
        }
    });
});



app.listen(PORT, function() {
    console.log(`Servidor escuchando en el puerto http://localhost:3000`);
});

