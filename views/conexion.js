 //conexion a la base de datos//
    let  mysql = require("mysql")
    let conexion = mysql.createConnection({
        host:"localhost",
        database:"unasspayj",
        user:"root",
        password:""
    });
// llamar los metodos de la libreria //
    const express= require("express");
    const app = express();
    app.set("view engine","ejs");
    app.use (express.json());
    app.use (express.static('views'));
    
    app.use (express.urlencoded({extended:false}));
    
    /*app.get ("/",function(req,res){
        res.render("Pagina_login_Registro");
    });

    
    app.post("/validar",function(req,res){
        const datos = req.body;
        console .log(datos);
        let nombre= datos.nombres;
        let email = datos.email;
        let celular= datos.celular;
        let validaremail= datos.confirmemail;
        let contraseña= datos.password;
        let validarcon= datos.confirmepassword

        let ingresar="INSERT INTO usuario(nombres,email,celular,confirmemail,password,confirmepassword)VALUES('"+nombre +"','"+email +"','"+celular +"','"+validaremail +"','"+contraseña +"','"+validarcon +"')";

        conexion.query(ingresar,function(error){
            if(error){
                throw error;
            }else{
                console.log("datos listos");
            }
        })
    });*/
    
    app.get ("/",function(req,res){
        res.render("Pagina_Agenda_Citas");
    });
    app.post("/cita",function(req,res){
        const datos = req.body;
        console .log(datos);
        let manicurista= datos.manicurista;
        let servicio = datos.servicio;
        let fecha= datos.fecha;
        let hora= datos.hora;
        
        let ingresar="INSERT INTO cita(manicurista,servicio,fecha,hora)VALUES('"+manicurista+"','"+servicio +"','"+fecha +"','"+hora +"')";

        conexion.query(ingresar,function(error){
            if(error){
                throw error;
            }else{
                console.log("datos listos");
            }
        })
    });

    //consulta a la base de datos para retornar las horas ya agendadas//
    app.get('/consulta/:manicurista/:servicio/:fecha', (req, res) => {
        const manicurista = req.params.manicurista;
        const servicio = req.params.servicio;
        const fecha = req.params.fecha;
    
        // Realiza la consulta a la base de datos utilizando codigo, servicio y fecha
        const query = 'SELECT * FROM cita WHERE manicurista = ? AND servicio = ? AND fecha = ?';
        conexion.query(query, [manicurista, servicio, fecha], (err, results) => {
            if (err) {
            console.error(err);
            res.status(500).send('Error al consultar la tabla');
            } else {
            res.json(results);
            }
        });
      });
    app.listen(3000, function(){
        console.log("servidor fue creado http://localhost:3000");
    })

//comprobacion de que la base de datos fue conectada con exito//
    conexion.connect(function(err){
        if (err){
            throw err;
        }else{
            console.log("tu conexion a tu base de datos fue exitosa");
        }
    })

