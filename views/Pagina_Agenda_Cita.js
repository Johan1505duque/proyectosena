const formulario = document.getElementById("formulario");
const botonhoras1 = document.getElementById("bloques");
const botonhoras2 = document.getElementById("bloques2");
const mensaje1 = document.getElementById("mensaje1");
const mensaje2 = document.getElementById("mensaje2");
const mensaje3 = document.getElementById("confirmar");
const agendarcita = document.getElementById("AgendarCita");
const Calendario = document.getElementById("Calendario");
const bienvenida = document.getElementById("logo");
const redesSociales = document.getElementById("redes");
const botonRetornar = document.getElementById("retornar");
const portada= document.getElementById("encabezadoAgenda");
const encabezado = document.getElementById("gracias");

let conexion="";
let Dia = "";
let Hora = "";
let texhora = "";
let texdia = "";
let Manicurista = "";
let Servicio = "";
let citaAgendada = true

encabezado.style.display = "none";
botonRetornar .style.display = "none";
agendarcita.style.display = "none";
mensaje2.style.display = "none";
mensaje3.style.display = "none";
Calendario.style.display = "none";
botonhoras1.style.display = "none";
botonhoras2.style.display = "none";



function selecdia(dia) {
    Dia = dia; 
    texdia = dia; 
    confirmarfechas();
    //llamar end point de consulta de citas //
    // URL del endpoint
const url = 'http://localhost:3000/consulta/'+Manicurista+'/'+Servicio+'/'+texdia;
console.log(url)
fetch(url)
    .then(response => response.json())
    .then(data => {
    // Manejar la respuesta exitosa
    console.log(data);
    })
    .catch(error => {
    // Manejar el error
    console.error('Error:', error);
    });
    
    // Mostrar el horario correspondiente al servicio seleccionado
    if (servicio.value === "manicureBásico" || servicio.value === "pedicureBásico" || servicio.value === "esmaltadoPermanente" || servicio.value === "uñasAcrílicas" || servicio.value === "uñasDeGel") {
        botonhoras1.style.display = "none"; 
        botonhoras2.style.display = "block"; 
    } else {
        botonhoras1.style.display = "block"; 
        botonhoras2.style.display = "none"; 
    }
}

function selechora(hora) {
    Hora = hora;
    texhora = `${hora}`;
    confirmarfechas();
    mensaje2.style.display="block";
    agendarcita.style.display = "block";
    texhora.disabled = true;
    
}


function confirmarfechas() {
    mensaje1.innerHTML = `Tu cita será atendida por ${manicurista.options[manicurista.selectedIndex].text}.El servicio a realizar es ${servicio.options[servicio.selectedIndex].text} `
    mensaje2.innerHTML=`tu cita se llevara a cado el dia ${texdia} de Abril. A las ${texhora}.`
    mensaje3 . innerHTML ='tu cita fue agendada con exito.'+"  "+
    'Recuerda llegar con 5 minutos de anterioridad'
}

function confirmardatos() {
    var datos = {
        manicurista: Manicurista,
        servicio: Servicio,
        fecha: Dia,
        hora: Hora
    };
    
    
    fetch('/cita', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al enviar los datos al servidor');
        }
        return response.json();
    })
    retornar()
}
function retornar(){
    if (citaAgendada) {
        portada.style.display = "none";
        agendarcita.style.display = "none";
        mensaje1.style.display ="none"
        mensaje2.style.display ="none"
        Calendario.style.display ="none"
        encabezado.style.display = "block";
        botonRetornar.style.display = "block";
        mensaje3.style.display ="block"
        citaAgendada = false;
    } 
    else {
        // Recargar la página
        window.location.href = "/";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("manicurista").addEventListener("change", function() {
        Manicurista = manicurista.value;
        camposSelect();
    });
    document.getElementById("servicio").addEventListener("change", function() {
        Servicio = servicio.value;
        camposSelect();
    });
});

function camposSelect() {
    if (Manicurista && Servicio) {
        confirmarfechas();
        Calendario.style.display = "block";
        formulario.style.display = "none";
        bienvenida.style.display = "none";
        redesSociales.style.display = "none";
    }
}