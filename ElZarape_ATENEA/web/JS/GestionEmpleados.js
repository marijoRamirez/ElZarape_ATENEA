/*
    Título: GestionUsuarios 
    Nombre desarrolladora: ATENEA 
    Nombre autor: Emmanuel Ortiz 
    Fecha: 12-06-24
    Versión: 2.6 
    Descripción: CRUD Para la gestion de los usuarios
*/


let obj = [];
let indexEmpleadoSeleccionado;

// Cargar los datos desde un archivo JSON
fetch("")
    .then(response => response.json())
    .then(jsondata => {
        obj = jsondata;
        actualizarTabla();
    })
    .catch(error => console.error('Error al obtener los datos:', error));

// Agregar un nuevo empleado
function agregarEmpleado() {
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const estatus = document.getElementById('estatus').value;
    const puesto = document.getElementById('puesto').value;
    const RFC = document.getElementById('RFC').value;
    const rol = document.getElementById('rol').value;
    const IdEmpleado = document.getElementById('IdEmpleado').value;

    if (!nombre || !apellido || !puesto || !RFC || !rol || !IdEmpleado) {
        alert("Por favor, complete todos los campos correctamente.");
        return;
    }
    
    const nuevoEmpleado = {
        id: obj.length + 1,
        nombre: nombre,
        apellido: apellido,
        estatus: estatus,
        puesto: puesto,
        RFC: RFC,
        rol: rol,
        IdEmpleado: IdEmpleado
    };

    obj.push(nuevoEmpleado);
    actualizarTabla();
    limpiarFormulario();
    cerrarFormAgregar();
    alert("Empleado registrado con éxito");
}

// Limpiar el formulario de agregar
function limpiarFormulario() {
    document.getElementById('nombre').value = '';
    document.getElementById('apellido').value = '';
    document.getElementById('estatus').value = 'Activo';
    document.getElementById('puesto').value = '';
    document.getElementById('RFC').value = '';
    document.getElementById('rol').value = '';
    document.getElementById('IdEmpleado').value = '';
    indexEmpleadoSeleccionado = null;
}

// Actualizar la tabla con los datos de los empleados
function actualizarTabla() {
    let cuerpo = "";
    obj.forEach((elemento, index) => {
        let registro =
            `<tr onclick="selectEmpleado(${index});">
                <td>${elemento.id}</td>
                <td>${elemento.nombre}</td>
                <td>${elemento.apellido}</td>
                <td>${elemento.estatus}</td>
                <td>${elemento.puesto}</td>
                <td>${elemento.RFC}</td>
                <td>${elemento.rol}</td>
                <td>${elemento.IdEmpleado}</td>
            </tr>`;
        cuerpo += registro;
    });
    document.getElementById("tblEmpleados").innerHTML = cuerpo;
}

// Seleccionar un empleado para actualizar
function selectEmpleado(index) {
    const empleado = obj[index];
    document.getElementById('idEmpleadoActualizar').value = empleado.id;
    document.getElementById('nombreActualizar').value = empleado.nombre;
    document.getElementById('apellidoActualizar').value = empleado.apellido;
    document.getElementById('estatusActualizar').value = empleado.estatus;
    document.getElementById('puestoActualizar').value = empleado.puesto;
    document.getElementById('RFCActualizar').value = empleado.RFC;
    document.getElementById('rolActualizar').value = empleado.rol;
    document.getElementById('IdEmpleadoActualizar').value = empleado.IdEmpleado;

    indexEmpleadoSeleccionado = index;
    abrirFormActualizar();
}

// Abrir el formulario de actualización
function abrirFormActualizar() {
    document.getElementById('formActualizar').style.display = 'block';
}

// Cerrar el formulario de actualización
function cerrarFormActualizar() {
    document.getElementById('formActualizar').style.display = 'none';
}

// Cerrar el formulario de agregar
function cerrarFormAgregar() {
    document.getElementById('formAgregar').style.display = 'none';
}

// Modificar un empleado
function modificarEmpleado() {
    const id = parseInt(document.getElementById('idEmpleadoActualizar').value);
    const nombre = document.getElementById('nombreActualizar').value;
    const apellido = document.getElementById('apellidoActualizar').value;
    const estatus = document.getElementById('estatusActualizar').value;
    const puesto = document.getElementById('puestoActualizar').value;
    const RFC = document.getElementById('RFCActualizar').value;
    const rol = document.getElementById('rolActualizar').value;
    const IdEmpleado = document.getElementById('IdEmpleadoActualizar').value;

    if (!nombre || !apellido || !puesto || !RFC || !rol || !IdEmpleado) {
        alert("Por favor, complete todos los campos correctamente.");
        return;
    }
    
    const empleado = obj.find(emp => emp.id == id);
    if (empleado) {
        empleado.nombre = nombre;
        empleado.apellido = apellido;
        empleado.estatus = estatus;
        empleado.puesto = puesto;
        empleado.RFC = RFC;
        empleado.rol = rol;
        empleado.IdEmpleado = IdEmpleado;
        actualizarTabla();
        cerrarFormActualizar();
        alert("Empleado actualizado");
    } else {
        alert('Empleado no encontrado');
    }
}

// Función para buscar un empleado por su ID
function buscarEmpleado() {
    const idEmpleado = parseInt(document.getElementById('idEmpleado').value);
    const empleadoEncontrado = obj.find(emp => emp.id == idEmpleado);

    if (empleadoEncontrado) {
        // Mostrar el empleado encontrado en el formulario de resultado
        document.getElementById('idEmpleadoActualizar').value = empleadoEncontrado.id;
        document.getElementById('nombreActualizar').value = empleadoEncontrado.nombre;
        document.getElementById('apellidoActualizar').value = empleadoEncontrado.apellido;
        document.getElementById('estatusActualizar').value = empleadoEncontrado.estatus;
        document.getElementById('puestoActualizar').value = empleadoEncontrado.puesto;
        document.getElementById('RFCActualizar').value = empleadoEncontrado.RFC;
        document.getElementById('rolActualizar').value = empleadoEncontrado.rol;
        document.getElementById('IdEmpleadoActualizar').value = empleadoEncontrado.IdEmpleado;

        // Actualizar indexEmpleadoSeleccionado con el índice correcto
        indexEmpleadoSeleccionado = obj.findIndex(emp => emp.id == idEmpleado);

        abrirFormActualizar();
    } else {
        alert('Empleado no encontrado');
    }
}

// Función para eliminar (desactivar) un empleado
function eliminarEmpleado() {
    if (indexEmpleadoSeleccionado !== undefined && indexEmpleadoSeleccionado !== null && obj[indexEmpleadoSeleccionado]) {
        const empleado = obj[indexEmpleadoSeleccionado];
        empleado.estatus = empleado.estatus == 'Activo' ? 'Inactivo' : 'Activo';
        actualizarTabla();
        cerrarFormActualizar();
        alert(`Empleado cambiado a estatus ${empleado.estatus}`);
    } else {
        alert('Seleccione un empleado válido para eliminar');
    }
}

   //Generar reporte
   function imprimir() {
    // Obtener fecha del día en el reporte
    var fechaActual = new Date();
    var dia = fechaActual.getDate();
    var mes = fechaActual.getMonth() + 1;
    var anio = fechaActual.getFullYear();
    var fechaFormateada = dia + '/' + mes + '/' + anio;

    // Obtener contenido de la tabla de empleados
    let contenido = document.getElementById("tblEmpleados").outerHTML;
    let ventana = window.open("", "", "width=800,height=600");

    // Nombre del reporte
    ventana.document.write("<html><head><title>Reporte Empleados</title></head><body>");
    ventana.document.write("<h1>Reporte Empleados " + fechaFormateada + "</h1>");
    ventana.document.write("<table border='1' cellpadding='5' cellspacing='0'>");
    // Se agregan los <th></th> de la tabla
    ventana.document.write("<tr><th>ID</th><th>Nombre</th><th>Apellido</th><th>Estatus</th><th>Puesto</th><th>RFC</th><th>Rol</th><th>ID Empleado</th></tr>");
    ventana.document.write(contenido);
    ventana.document.write("</table>");
    ventana.document.write("</body></html>");
    ventana.print();
    ventana.document.close();
}

document.addEventListener('DOMContentLoaded', function () {
    const botonReporte = document.getElementById('botonReporte');
    if (botonReporte) {
        botonReporte.addEventListener('click', function (event) {
            event.preventDefault();
            imprimir();
        });
    } else {
        console.error('Elemento botonReporte no encontrado.');
    }
});
