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
const calendar = document.getElementById('Calendario');
let currentMonth;
let currentYear;

// Función para mostrar el calendario de un mes específico de un año
function showMonth(month, year) {
    currentMonth = month;
    currentYear = year;

    const monthYearHeader = document.createElement('div');
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');

    const previousButton = document.createElement('button');
    const nextButton = document.createElement('button');
    previousButton.textContent = '<';

    monthYearHeader.textContent = `${getMonthName(month)} ${year} `;
    calendar.innerHTML = '';
    monthYearHeader.classList.add('month-year');
    calendar.appendChild(buttonContainer);
    previousButton.addEventListener('click', previousMonth);

    nextButton.textContent = '>';
    nextButton.addEventListener('click', nextMonth);

    buttonContainer.appendChild(previousButton);
    buttonContainer.appendChild(monthYearHeader);
    buttonContainer.appendChild(nextButton);

    const table = document.createElement('table');
    table.classList.add('month-table');

    const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const headerRow = document.createElement('tr');
    daysOfWeek.forEach(day => {
        const th = document.createElement('th');
        th.textContent = day;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const startingDay = firstDayOfMonth.getDay();
    const totalDays = lastDayOfMonth.getDate();

    let date = 1;
    for (let i = 0; i < 6; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < 7; j++) {
            const td = document.createElement('td');
            if (i === 0 && j < startingDay) {
                td.textContent = '';
                td.classList.add('past-day');
            } else if (date > totalDays) {
                td.textContent = "";
                td.classList.add('past-day');
            } else {
                td.textContent = date;
                if (year < new Date().getFullYear() || (year === new Date().getFullYear() && month < new Date().getMonth()) || (year === new Date().getFullYear() && month === new Date().getMonth() && date < new Date().getDate())) {
                    td.classList.add('past-day');
                } else {
                    td.textContent = date;
                    td.addEventListener('click', (function (currentDate) {
                        return function () {
                            fechaseleccionada = `${year}-${month + 1}-${currentDate}`;
                            texdia = fechaseleccionada;
                            selecdia();
                        }
                    })(date));
                }
                date++;
            }
            row.appendChild(td);
        }
        table.appendChild(row);
    }

    calendar.appendChild(table);
}

// Función para obtener el nombre del mes
function getMonthName(month) {
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return months[month];
}

// Función para ir al mes anterior
function previousMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    showMonth(currentMonth, currentYear);
}

// Función para ir al mes siguiente
function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    showMonth(currentMonth, currentYear);
}

// Mostrar el calendario del mes actual al cargar la página
const today = new Date();
showMonth(today.getMonth(), today.getFullYear());

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
