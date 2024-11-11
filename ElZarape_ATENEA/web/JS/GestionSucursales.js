let obj = [];
let indexProductoSeleccionado;
let ruta = 'IMG/Sucursales/';

// Futura api
fetch("")
    .then(response => response.json())
    .then(jsondata => {
        obj = jsondata;
        actualizarTabla();
    })
    .catch(error => console.error('Error al obtener los datos:', error));

// Agregar una nueva sucursal
function agregarSucursal() {
    const nombre = document.getElementById('nomSucursal').value;
    const ubicacion = document.getElementById('ubi').value;
    const horarioInicio = document.getElementById('horarioInicio').value;
    const horarioCierre = document.getElementById('horarioCierre').value;
    const fileInput = document.getElementById('inputImagenAgregar');
    const foto = fileInput.files[0] ? URL.createObjectURL(fileInput.files[0]) : '';

    // Validar campos
    /*if (!nombre || !ubicacion || !horarioInicio || !horarioCierre) {
        alert("Por favor, complete todos los campos correctamente.");
        return;
    }*/

    const nuevaSucursal = {
        id: obj.length + 1,
        nombre: nombre,
        ubicacion: ubicacion,
        horarioInicio: horarioInicio,
        horarioCierre: horarioCierre,
        foto: foto,
        estatus: 'Activo'
    };

    obj.push(nuevaSucursal);
    actualizarTabla();
    limpiarFormulario();
    cerrarFormAgregar();
    alert("Sucursal registrada con éxito");
}

// Limpiar el formulario de agregar
function limpiarFormulario() {
    document.getElementById('nomSucursal').value = '';
    document.getElementById('ubi').value = '';
    document.getElementById('horarioInicio').value = '';
    document.getElementById('horarioCierre').value = '';
    indexProductoSeleccionado = null;
}

// Actualizar la tabla con los datos de las sucursales
function actualizarTabla() {
    let cuerpo = "";
    obj.forEach((elemento, index) => {
        let registro =
            `<tr onclick="selectProducto(${index});">
                <td>${elemento.id}</td>
                <td>${elemento.nombre}</td>
                <td>${elemento.ubicacion}</td>
                <td>${elemento.horarioInicio}</td>
                <td>${elemento.horarioCierre}</td>
                <td><img src="${elemento.foto}" width="100"></td>
                <td>${elemento.estatus}</td>
            </tr>`;
        cuerpo += registro;
    });
    document.getElementById("tblProductos").innerHTML = cuerpo;
}

// Seleccionar una sucursal para actualizar
function selectProducto(index) {
    const sucursal = obj[index];
    document.getElementById('idSucursalActualizar').value = sucursal.id;
    document.getElementById('nomSucursalActualizar').value = sucursal.nombre;
    document.getElementById('ubiActualizar').value = sucursal.ubicacion;
    document.getElementById('horarioInicioActualizar').value = sucursal.horarioInicio;
    document.getElementById('horarioCierreActualizar').value = sucursal.horarioCierre;
    document.getElementById('imagenPreviewActualizar').src = sucursal.foto;

    indexProductoSeleccionado = index;
    abrirFormActualizar();
}

// Abrir el formulario de actualización
/*function abrirFormActualizar() {
    document.getElementById('formActualizar').style.display = 'block';
}*/

// Cerrar el formulario de actualización
function cerrarFormActualizar() {
    document.getElementById('formActualizar').style.display = 'none';
}

// Cerrar el formulario de agregar
function cerrarFormAgregar() {
    document.getElementById('formAgregar').style.display = 'none';
}

// Modificar una sucursal
/*function modificarSucursal() {
    const id = parseInt(document.getElementById('idSucursalActualizar').value);
    const nombre = document.getElementById('nomSucursalActualizar').value;
    const ubicacion = document.getElementById('ubiActualizar').value;
    const horarioInicio = document.getElementById('horarioInicioActualizar').value;
    const horarioCierre = document.getElementById('horarioCierreActualizar').value;
    const archivoImagen = document.getElementById('inputImagenActualizar').files[0];

    // Validar campos
    /*if (!nombre || !ubicacion || !horarioInicio || !horarioCierre) {
        alert("Por favor, complete todos los campos correctamente.");
        return;
    }*/

// Función para buscar una sucursal por su ID
function buscarSucursal() {
    const idSucursal = parseInt(document.getElementById('idSucursal').value); // Obtén el valor del campo de texto
    const sucursalEncontrada = obj.find(sucursal => sucursal.id == idSucursal); // Encuentra la sucursal con el ID

    if (sucursalEncontrada) {
        // Mostrar la sucursal encontrada en el formulario de actualización
        document.getElementById('idSucursalActualizar').value = sucursalEncontrada.id;
        document.getElementById('nomSucursalActualizar').value = sucursalEncontrada.nombre;
        document.getElementById('ubiActualizar').value = sucursalEncontrada.ubicacion;
        document.getElementById('horarioInicioActualizar').value = sucursalEncontrada.horarioInicio;
        document.getElementById('horarioCierreActualizar').value = sucursalEncontrada.horarioCierre;

        // Actualiza la imagen en el formulario de actualización
        const imagenPreviewActualizar = document.getElementById('imagenPreviewActualizar');
        if (sucursalEncontrada.foto) {
            imagenPreviewActualizar.src = sucursalEncontrada.foto;
            imagenPreviewActualizar.style.display = 'block'; // Asegúrate de que la imagen sea visible
        } else {
            imagenPreviewActualizar.src = '';
            imagenPreviewActualizar.style.display = 'none';
        }

        abrirFormActualizar();
    } else {
        alert('Sucursal no encontrada');
    }
}

// Función para eliminar una sucursal
function eliminarSucursal() {
    if (indexProductoSeleccionado !== undefined && indexProductoSeleccionado !== null && obj[indexProductoSeleccionado]) {
        const sucursal = obj[indexProductoSeleccionado];
        sucursal.estatus = sucursal.estatus === 'Activo' ? 'Inactivo' : 'Activo';
        actualizarTabla();
        cerrarFormActualizar();
        alert(`Sucursal cambiada a estatus ${sucursal.estatus}`);
    } else {
        alert('Seleccione una sucursal válida para eliminar');
    }
}

// Generar reporte
function imprimir() {
    var fechaActual = new Date();
    var dia = fechaActual.getDate();
    var mes = fechaActual.getMonth() + 1;
    var anio = fechaActual.getFullYear();
    var fechaFormateada = dia + '/' + mes + '/' + anio;

    let contenido = document.getElementById("tblProductos").outerHTML;
    let ventana = window.open("", "", "width=800,height=600");
    ventana.document.write("<html><head><title>Reporte Sucursales</title></head><body>");
    ventana.document.write("<h1>Reporte Sucursales " + fechaFormateada + "</h1>");
    ventana.document.write("<table border='1' cellpadding='5' cellspacing='0'>");
    ventana.document.write("<tr><th>#</th><th>Nombre</th><th>Ubicación</th><th>Horario Inicio</th><th>Horario Cierre</th><th>Foto</th><th>Estatus</th></tr>");
    ventana.document.write(contenido);
    ventana.document.write("</table>");
    ventana.document.write("</body></html>");
    ventana.document.close();
    ventana.print();
}

// Configurar evento para el botón de reporte
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

// Convertir archivo a base64
function convertirArchivoABase64(file, callback) {
    const reader = new FileReader();
    reader.onload = function (event) {
        callback(event.target.result);
    };
    reader.readAsDataURL(file); // Asegúrate de usar readAsDataURL para convertir a base64
}

// Mostrar imagen seleccionada en el formulario de actualización
document.addEventListener('DOMContentLoaded', function () {
    const inputImagenActualizar = document.getElementById('inputImagenActualizar');
    const imagenPreviewActualizar = document.getElementById('imagenPreviewActualizar');

    inputImagenActualizar.addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                imagenPreviewActualizar.src = e.target.result;
                imagenPreviewActualizar.style.display = 'block';
            };
            reader.readAsDataURL(file);
        } else {
            imagenPreviewActualizar.src = '';
            imagenPreviewActualizar.style.display = 'none';
        }
    });
});

// Previsualización de la imagen en el formulario de agregar
document.getElementById('inputImagenAgregar').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('imagenPreviewAgregar').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});
