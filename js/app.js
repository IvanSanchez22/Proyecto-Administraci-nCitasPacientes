//Campos del formulario
const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');
//UI
const formulario = document.querySelector('#nueva-cita');
const contenedorCitas = document.querySelector('#citas');

class Citas {
    constructor() {
        this.citas = [];
    }

    agregarCitas(cita) {
        this.citas = [...this.citas, cita];
    }

    eliminarCitas(id) { 
        this.citas = this.citas.filter(cita => cita.id !== id);
    }

}

class UI {
    imprimirAlerta(message, tipo) {
        //Crea el div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');

        //Agrega una clase u otra en función del tipo de mensaje
        if (tipo === 'error') {
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-success');
        }

        //Mensaje de error
        divMensaje.textContent = message;

        //Añadir el mensaje al DOM
        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));

        //Quitar el mensaje de alerta a los 5 seg
        setTimeout(() => {
            divMensaje.remove();
        }, 3000)

    }

    imprimirCitas({ citas }) { //Distructing desde la zona de los parámetros para extraer el array de citas de la clase citas ya que en la llamada le pasamos el objeto
        this.limpiarHtml();

        citas.forEach(cita => {
            const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

            const divCita = document.createElement('div');
            divCita.classList.add('cita', 'p-3');
            divCita.dataset.id = id;

            //Scripting de los elementos
            const mascotaParrafo = document.createElement('h2');
            mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
            mascotaParrafo.textContent = mascota;

            const propietarioParrafo = document.createElement('p');
            propietarioParrafo.innerHTML = `
            <span class="font-weight-bolder"> Propietario: </span> ${propietario}
            `;
            const telefonoParrafo = document.createElement('p');
            telefonoParrafo.innerHTML = `
            <span class="font-weight-bolder"> Teléfono: </span> ${telefono}
            `;

            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML = `
            <span class="font-weight-bolder"> Fecha: </span> ${fecha}
            `;

            const horaParrafo = document.createElement('p');
            horaParrafo.innerHTML = `
            <span class="font-weight-bolder"> Hora: </span> ${hora}
            `;

            const sintomasParrafo = document.createElement('p');
            sintomasParrafo.innerHTML = `
            <span class="font-weight-bolder"> Síntomas: </span> ${sintomas}
            `;

            //Botón para eliminar citas
            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('btn', 'btn-danger', 'mr-2'); //Clases de boostrap
            btnEliminar.innerHTML = 'Eliminar'
            btnEliminar.onclick = () => eliminarCitas(id);


            //Añadiendo los párrafos a divCita
            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);
            divCita.appendChild(btnEliminar);


            //Añadiendo las citas al html
            contenedorCitas.appendChild(divCita);

        })
    }

    limpiarHtml() {
        while (contenedorCitas.firstChild) {
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        }
    }
}

const ui = new UI();
const administrarCitas = new Citas();

//Registrar eventos
eventListeners();
function eventListeners() {
    mascotaInput.addEventListener('input', datosCita);
    propietarioInput.addEventListener('input', datosCita);
    telefonoInput.addEventListener('input', datosCita);
    fechaInput.addEventListener('input', datosCita);
    horaInput.addEventListener('input', datosCita);
    sintomasInput.addEventListener('input', datosCita);
    formulario.addEventListener('submit', nuevaCita);

}

//Objeto con la información de la cita
const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''

}

//Agrega los datos al objeto de cita
function datosCita(e) {
    citaObj[e.target.name] = e.target.value; //El e.target.name es posible gracias a la etiqueta name del html que tiene cada input y se llama igual que las propiedades del objeto
}

//Valida y añade una nueva cita a la clase de citas
function nuevaCita(e) {
    e.preventDefault();
    //Extraemos la información del objeto de cita
    const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;

    //Validación
    if (mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '') {
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');
        return; //Para que no siga ejecutando código
    }

    //Generando un ID único para cada cita
    citaObj.id = Date.now();

    //Creando una nueva cita 
    administrarCitas.agregarCitas({ ...citaObj }); //Le pasamos una copia del objeto

    //Reiniciamos el objeto
    reiniciarObjeto();

    //Reiniciamos el formulario
    formulario.reset();

    ui.imprimirCitas(administrarCitas);

}

function reiniciarObjeto() {

    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';

}

function eliminarCitas(id) {
    //Eliminar la cita
    administrarCitas.eliminarCitas(id);
    //Muestra un mensaje
    ui.imprimirAlerta('La cita se eliminó correctamente');
    //Refresca las citas
    ui.imprimirCitas(administrarCitas); // Le pasamos el objeto entero

}