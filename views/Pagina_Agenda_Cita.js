// costantes globales 
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
let texdia = "";
let texhora = "";
let Manicurista = "";
let Servicio = "";

let citaAgendada = true
// arreglos glovales los cuales almasenan los horarios de los servicios
let horario = [];
let horario2 =[]


encabezado.style.display = "none";
botonRetornar .style.display = "none";
agendarcita.style.display = "none";
mensaje2.style.display = "none";
mensaje3.style.display = "none";
Calendario.style.display = "none";


// horario tipo 1
horario.push(['7Am']);
horario.push(['8Am']);
horario.push(['9Am']);
horario.push(['10Am']);
horario.push(['11Am']);
horario.push(['12Am']);
horario.push(['2Pm']);
horario.push(['3Pm']);
horario.push(['4Pm']);
horario.push(['5Pm']);
horario.push(['6Pm']);
horario.push(['7Pm']);

//horario tipo 2
horario2.push(['7Am']);
horario2.push(['9Am']);
horario2.push(['11Am']);
horario2.push(['2Pm']);
horario2.push(['4Pm']);
horario2.push(['6Pm']);


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

//funcion que verifica que los campos manicurista y servicio fueron seleccionados correctamente
function camposSelect() {
    if (Manicurista && Servicio) {
        confirmarfechas();
        Calendario.style.display = "block";
        formulario.style.display = "none";
        bienvenida.style.display = "none";
        redesSociales.style.display = "none";
    }
}

// funcion que al seleccionar el dia se despliega el horario de servicio
function selecdia(dia) {
    texdia=dia
    console.log(dia)
    confirmarfechas();
    //se realiza el llamado  a la url end point de consulta de citas //
    const url = `http://localhost:3000/consulta/${Manicurista}/${Servicio}/${texdia}`;
    console.log(url)
    fetch(url)
.then(response => response.json())
.then(cita => {
    // se muestra la respuesta del servidor en cosola 
    console.log(cita);
    
    // se  crea un array para almacenar las horas que se obtienen de hacer la consulta 
    let horasconsultas = [];

    //  se Itera sobre cada consulta
    cita.forEach(consulta => {
        // Obtener la hora devuelta por la consulta y limpiar la cosulta para una nueva
        const horaConsulta = consulta.Hora.trim();
        // se envian las horas obtenidas de la consulta al arreglo 
        horasconsultas.push(horaConsulta);
    });

    // Filtrar las horas disponibles para que solo incluyan aquellas que no han sido agendadas
    const horasDisponibles = horario.filter(hora => ! horasconsultas.includes(hora[0]));

    // Limpiar el contenedor de botones antes de agregar los nuevos
    botonhoras1.innerHTML = '';
      // Agregar un encabezado h4
        const encabesadohoras = document.createElement('h4');
        encabesadohoras.textContent = 'Horas Disponibles';
        botonhoras1.appendChild(encabesadohoras);

    // Crear botones para las horas disponibles
    horasDisponibles.forEach(hora => {
        const botonHora = document.createElement('button');
        
        // Establecer el texto del botón como la hora
        botonHora.textContent = hora[0];
        
        // Agregar clase para estilización 
        botonHora.classList.add('botonH', 'botonH-success'); 
        //funcion que al hacer click activa los mensajes y el boton de agendar cita y muestra la hora selecciona en la consola 
        botonHora.addEventListener('click', function() {
            console.log(`Hora seleccionada: ${hora[0]}`);
            texhora = `${hora[0]}`;
            confirmarfechas();
            mensaje2.style.display = "block";
            agendarcita.style.display = "block";
        });
        
        //  se añaden los botones  al contenedor
        botonhoras1.appendChild(botonHora);
    });

        //se muestra en consola las horas que no han cido seleccionadas 
        console.log(horario)
        
    })

    //si mostrara en concola error si se genera alguno
    .catch(error => {
        console.error('Error:', error);
    });

    // Mostrar el horario correspondiente al servicio seleccionado
    if (servicio.value === "manicureBásico" || servicio.value === "pedicureBásico" || servicio.value === "esmaltadoPermanente" || servicio.value === "uñasAcrílicas" || servicio.value === "uñasDeGel") {
        botonhoras1.style.display = "none"; 
        //botonhoras2.style.display = "block"; 
    } else {
        botonhoras1.style.display = "block"; 
        //botonhoras2.style.display = "none"; 
    }
}

//funcion que almasena mensaje informativos 
function confirmarfechas() {
    mensaje1.innerHTML = `Tu cita será atendida por ${manicurista.options[manicurista.selectedIndex].text}.El servicio a realizar es ${servicio.options[servicio.selectedIndex].text} `
    mensaje2.innerHTML=`tu cita se llevara a cado el dia ${texdia} de Abril. A las ${texhora}.`
    mensaje3.innerHTML ='tu cita fue agendada con exito.'+"  "+
    'Recuerda llegar con 5 minutos de anterioridad'
}

//funcion que envia datos a la base de datos 
function confirmardatos() {
    //objeto que almacena los datos de la cita
    let datos = {
        manicurista: Manicurista,
        servicio: Servicio,
        fecha: texdia,
        hora: texhora
    };
    
    //metodo para enviar los datos a la base de datos por medio del metodo json
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

//funcion que recarga la pagina para agendar una nueva cita
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
    // Recargar la página
    else {
        window.location.href = "/";
    }
}
