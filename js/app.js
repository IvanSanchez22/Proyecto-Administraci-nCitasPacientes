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
        }, 5000)

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
}

function reiniciarObjeto (){
    
        citaObj.mascota = '';
        citaObj.propietario = '';
        citaObj.telefono = '';
        citaObj.fecha = '';
        citaObj.hora = '';
        citaObj.sintomas = '';
    
    
}