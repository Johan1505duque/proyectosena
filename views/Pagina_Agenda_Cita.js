// Constantes globales
const formulario = document.getElementById("formulario");
const botonhoras1 = document.getElementById("bloques");
const mensaje1 = document.getElementById("mensaje1");
const mensaje2 = document.getElementById("mensaje2");
const mensaje3 = document.getElementById("confirmar");
const agendarcita = document.getElementById("AgendarCita");
const Calendario = document.getElementById("Calendario");
const bienvenida = document.getElementById("logo");
const redesSociales = document.getElementById("redes");
const botonRetornar = document.getElementById("retornar");
const portada = document.getElementById("encabezadoAgenda");
const encabezado = document.getElementById("gracias");

let texdia = "";
let texhora = "";
let Manicurista = "";
let Servicio = "";
let fechaseleccionada = "";

let citaAgendada = true;
// Arreglos globales que almacenan los horarios de los servicios
let horario = ['7Am', '8Am', '9Am', '10Am', '11Am', '12Am', '2Pm', '3Pm', '4Pm', '5Pm', '6Pm', '7Pm'];
let horario2 = ['7Am', '9Am', '11Am', '2Pm', '4Pm', '6Pm'];

encabezado.style.display = "none";
botonRetornar.style.display = "none";
agendarcita.style.display = "none";
mensaje2.style.display = "none";
mensaje3.style.display = "none";
Calendario.style.display = "none";

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("manicurista").addEventListener("change", function () {
        Manicurista = manicurista.value;
        camposSelect();
    });
    document.getElementById("servicio").addEventListener("change", function () {
        Servicio = servicio.value;
        camposSelect();
    });
});

// Función que verifica que los campos manicurista y servicio fueron seleccionados correctamente
function camposSelect() {
    if (Manicurista && Servicio) {
        confirmarfechas();
        Calendario.style.display = "block";
        formulario.style.display = "none";
        bienvenida.style.display = "none";
        redesSociales.style.display = "none";
    }
}

// Calendario
const calendario = document.getElementById('Calendario');
let mesActual;
let anioActual;

// Función para mostrar el calendario de un mes específico de un año
function mostrarMes(mes, anio) {
    mesActual = mes;
    anioActual = anio;

    const encabezadoMesAnio = document.createElement('div');
    const contenedorBotones = document.createElement('div');
    contenedorBotones.classList.add('button-container');

    const botonAnterior = document.createElement('button');
    const botonSiguiente = document.createElement('button');
    botonAnterior.textContent = '<';

    encabezadoMesAnio.textContent = `${obtenerNombreMes(mes)} ${anio} `;
    calendario.innerHTML = '';
    encabezadoMesAnio.classList.add('month-year');
    calendario.appendChild(contenedorBotones);
    botonAnterior.addEventListener('click', mesAnterior);

    botonSiguiente.textContent = '>';
    botonSiguiente.addEventListener('click', mesSiguiente);

    contenedorBotones.appendChild(botonAnterior);
    contenedorBotones.appendChild(encabezadoMesAnio);
    contenedorBotones.appendChild(botonSiguiente);

    const tabla = document.createElement('table');
    tabla.classList.add('month-table');

    const diasDeLaSemana = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const filaEncabezado = document.createElement('tr');
    diasDeLaSemana.forEach(dia => {
        const th = document.createElement('th');
        th.textContent = dia;
        filaEncabezado.appendChild(th);
    });
    tabla.appendChild(filaEncabezado);

    const primerDiaDelMes = new Date(anio, mes, 1);
    const ultimoDiaDelMes = new Date(anio, mes + 1, 0);
    const diaDeInicio = primerDiaDelMes.getDay();
    const totalDias = ultimoDiaDelMes.getDate();

    let fecha = 1;
    for (let i = 0; i < 6; i++) {
        const fila = document.createElement('tr');
        for (let j = 0; j < 7; j++) {
            const td = document.createElement('td');
            if (i === 0 && j < diaDeInicio) {
                td.textContent = '';
                td.classList.add('past-day');
            } else if (fecha > totalDias) {
                td.textContent = "";
                td.classList.add('past-day');
            } else {
                td.textContent = fecha;
                if (anio < new Date().getFullYear() || (anio === new Date().getFullYear() && mes < new Date().getMonth()) || (anio === new Date().getFullYear() && mes === new Date().getMonth() && fecha < new Date().getDate())) {
                    td.classList.add('past-day');
                } else {
                    td.textContent = fecha;
                    td.addEventListener('click', (function (fechaActual) {
                        return function () {
                            fechaseleccionada = `${anio}/${mes + 1}/${fechaActual}`;
                            texdia = fechaseleccionada;
                            selecdia();
                        }
                    })(fecha));
                }
                fecha++;
            }
            fila.appendChild(td);
        }
        tabla.appendChild(fila);
    }

    calendario.appendChild(tabla);
}

// Función para obtener el nombre del mes
function obtenerNombreMes(mes) {
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return meses[mes];
}

// Función para ir al mes anterior
function mesAnterior() {
    mesActual--;
    if (mesActual < 0) {
        mesActual = 11;
        anioActual--;
    }
    mostrarMes(mesActual, anioActual);
}

// Función para ir al mes siguiente
function mesSiguiente() {
    mesActual++;
    if (mesActual > 11) {
        mesActual = 0;
        anioActual++;
    }
    mostrarMes(mesActual, anioActual);
}

// Mostrar el calendario del mes actual al cargar la página
const hoy = new Date();
mostrarMes(hoy.getMonth(), hoy.getFullYear());

// Función que al seleccionar el día despliega el horario de servicio
function selecdia() {
    texdia = fechaseleccionada;
    confirmarfechas();

    fetch("/consulta", {
        method: "POST",
        body: JSON.stringify({
            manicurista: Manicurista,
            servicio: Servicio,
            fecha: texdia
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al obtener los datos');
        }
        return response.json();
    })
    .then(cita => {
        console.log(cita);

        let horasconsultas = [];

        cita.forEach(consulta => {
            const horaConsulta = consulta.hora.trim();  // Asegurarse de que coincida con el campo de la base de datos
            horasconsultas.push(horaConsulta);
        });
        
        // Remover la clase 'selected-day' de todos los elementos td (días) del calendario
        const allDays = document.querySelectorAll('#Calendario td');
        allDays.forEach(day => {
        day.classList.remove('selected-day');
        });

    // Agregar la clase 'selected-day' al día seleccionado
    const selectedDay = document.querySelector(`#Calendario td[data-date="${fechaseleccionada}"]`);
    if (selectedDay) {
        selectedDay.classList.add('selected-day');
    }


        // Filtrar las horas disponibles
        const horasDisponibles = horario.filter(hora => !horasconsultas.includes(hora));

        // Limpiar el contenido anterior
        botonhoras1.innerHTML = ''; // Limpiar el contenido antes de agregar los nuevos botones
        const tituloHorasDisponibles = document.createElement('h4');
        tituloHorasDisponibles.textContent = 'Horas disponibles';
        botonhoras1.appendChild(tituloHorasDisponibles);

        // Crear botones para cada hora disponible
        horasDisponibles.forEach(hora => {
            const botonHora = document.createElement('button');
            botonHora.textContent = hora;
            botonHora.classList.add('botonH'); // Clase actualizada para coincidir con la clase en el CSS
          // Event listener para el clic en una hora disponible
botonHora.addEventListener('click', function () {
    console.log(`Hora seleccionada: ${hora}`);
    texhora = hora;
    mensaje2.innerHTML = `Tu cita se llevará a cabo el día ${texdia}. A las ${texhora}.`;
    mensaje2.style.display = "block";
    agendarcita.style.display = "block";
});
            botonhoras1.appendChild(botonHora);
        });

        console.log(horasDisponibles);
    })
    .catch(error => {
        console.error('Error:', error);
    });

    // Mostrar u ocultar el contenedor de botones de horas según el tipo de servicio seleccionado
    if (Servicio === "manicure Básico" || Servicio === "pedicure Básico" || Servicio === "esmaltado Permanente" || Servicio === "uñas Acrílicas" || Servicio === "uñas De Gel") {
        botonhoras1.style.display = "none"; // Ocultar el contenedor si no se requieren horas
    } else {
        botonhoras1.style.display = "block"; // Mostrar el contenedor si se requieren horas
    }
}

// Función que almacena mensajes informativos 
function confirmarfechas() {
    mensaje1.innerHTML = `Tu cita será atendida por ${manicurista.options[manicurista.selectedIndex].text}. El servicio a realizar es ${servicio.options[servicio.selectedIndex].text}.`;
    mensaje2.innerHTML = `Tu cita se llevará a cabo el día ${texdia}. A las ${texhora}.`;
    mensaje3.innerHTML = 'Tu cita fue agendada con éxito. Recuerda llegar con 5 minutos de anterioridad.';
}

// Función que envía datos a la base de datos
function confirmardatos() {
    let datos = {
        manicurista: Manicurista,
        servicio: Servicio,
        fecha: texdia,
        hora: texhora
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
            throw new Error('Error en la solicitud de agendar cita');
        }
        return response.text(); // Obtener la respuesta como texto sin procesar
    })
    .then(data => {
        console.log('Respuesta recibida:', data); // Imprimir la respuesta recibida
        if (data.includes('Datos insertados correctamente')) {
            console.log('Cita registrada correctamente');
            retornar();
        } else {
            throw new Error('Error al agendar la cita: ' + data); // Lanzar un error con la respuesta recibida
        }
    })
    .catch(error => {
        console.error('Error:', error);
        // Mostrar un mensaje de error al usuario
        alert('Error al agendar la cita. Por favor, inténtalo de nuevo más tarde.');
    });
}

// Función que recarga la página para agendar una nueva cita
function retornar() {
    if (citaAgendada) {
        portada.style.display = "none";
        agendarcita.style.display = "none";
        mensaje1.style.display = "none";
        mensaje2.style.display = "none";
        botonhoras1.style.display= "none";
        Calendario.style.display = "none";
        encabezado.style.display = "block";
        botonRetornar.style.display = "block";
        mensaje3.style.display = "block";
        citaAgendada = false;
    } else {
        window.location.href = "/";
    }
}
