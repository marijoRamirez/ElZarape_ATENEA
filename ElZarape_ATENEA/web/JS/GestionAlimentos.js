let obj = [];
let indexProductoSeleccionado = null;

// Cargar los datos desde un archivo JSON
fetch("")
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la red');
        }
        return response.json();
    })
    .then(jsondata => {
        obj = jsondata;
        actualizarTabla();
    })
    .catch(error => console.error('Error al obtener los datos:', error));

// Agregar un nuevo alimento
function agregarAlimento() {
    const nombre = document.getElementById('nombre').value.trim();
    const categoria = document.getElementById('categoria').value.trim();
    const descripcion = document.getElementById('descripcion').value.trim();
    const precio = parseFloat(document.getElementById('precio').value);
    const descuento = parseFloat(document.getElementById('descuento').value);
    const fileInput = document.getElementById('inputImagenAgregar');
    const foto = fileInput.files[0] ? URL.createObjectURL(fileInput.files[0]) : '';

    if (!nombre || !categoria || !descripcion || isNaN(precio) || isNaN(descuento)) {
        alert("Por favor, complete todos los campos correctamente.");
        return;
    }

    const nuevoAlimento = {
        id: obj.length > 0 ? obj[obj.length - 1].id + 1 : 1, // Manejo del ID
        nombre: nombre,
        categoria: categoria,
        descripcion: descripcion,
        precio: precio,
        descuento: descuento,
        foto: foto,
        estatus: 'Activo'
    };

    obj.push(nuevoAlimento);
    actualizarTabla();
    limpiarFormulario();
    cerrarFormAgregar();
    alert("Alimento registrado con éxito");
}

// Limpiar el formulario de agregar
function limpiarFormulario() {
    document.getElementById('nombre').value = '';
    document.getElementById('categoria').value = '';
    document.getElementById('descripcion').value = '';
    document.getElementById('precio').value = '';
    document.getElementById('descuento').value = '';
    document.getElementById('inputImagenAgregar').value = ''; // Limpiar archivo
    indexProductoSeleccionado = null;
}

// Actualizar la tabla con los datos de los alimentos
function actualizarTabla() {
    const cuerpo = obj.map((elemento, index) => `
        <tr onclick="selectProducto(${index});">
            <td>${elemento.id}</td>
            <td>${elemento.nombre}</td>
            <td>${elemento.categoria}</td>
            <td>${elemento.descripcion}</td>
            <td><img src="${elemento.foto}" alt="Foto" style="width: 100px; height: auto;"></td>
            <td>${elemento.precio}</td>
            <td>${elemento.descuento}</td>
            <td>${elemento.estatus}</td>
        </tr>`
    ).join('');
    
    document.getElementById("tblAlimentos").innerHTML = cuerpo;
}

// Seleccionar un alimento para actualizar
function selectProducto(index) {
    const alimento = obj[index];
    document.getElementById('idAlimentoActualizar').value = alimento.id;
    document.getElementById('nombreActualizar').value = alimento.nombre;
    document.getElementById('categoriaActualizar').value = alimento.categoria;
    document.getElementById('descripcionActualizar').value = alimento.descripcion;
    document.getElementById('precioActualizar').value = alimento.precio;
    document.getElementById('descuentoActualizar').value = alimento.descuento;
    document.getElementById('imagenPreviewActualizar').src = alimento.foto;

    indexProductoSeleccionado = index;
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

// Modificar un alimento
function modificarAlimento() {
    if (indexProductoSeleccionado === null) {
        alert("Seleccione un alimento para modificar.");
        return;
    }

    const id = parseInt(document.getElementById('idAlimentoActualizar').value);
    const nombre = document.getElementById('nombreActualizar').value.trim();
    const categoria = document.getElementById('categoriaActualizar').value.trim();
    const descripcion = document.getElementById('descripcionActualizar').value.trim();
    const precio = parseFloat(document.getElementById('precioActualizar').value);
    const descuento = parseFloat(document.getElementById('descuentoActualizar').value);
    const fileInput = document.getElementById('inputImagenActualizar');
    const foto = fileInput.files[0] ? URL.createObjectURL(fileInput.files[0]) : document.getElementById('imagenPreviewActualizar').src;

    if (!nombre || !categoria || !descripcion || isNaN(precio) || isNaN(descuento)) {
        alert("Por favor, complete todos los campos correctamente.");
        return;
    }

    obj[indexProductoSeleccionado] = {
        id: id,
        nombre: nombre,
        categoria: categoria,
        descripcion: descripcion,
        precio: precio,
        descuento: descuento,
        foto: foto,
        estatus: 'Activo'
    };

    actualizarTabla();
    cerrarFormActualizar();
    alert("Alimento modificado con éxito");
}

// Eliminar un alimento
function eliminarAlimento() {
    if (indexProductoSeleccionado !== undefined && indexProductoSeleccionado !== null && obj[indexProductoSeleccionado]) {
        const alimento = obj[indexProductoSeleccionado];
        alimento.estatus = alimento.estatus === 'Activo' ? 'Inactivo' : 'Activo';
        actualizarTabla();
        cerrarFormActualizar();
        /*alert(`Alimento cambiado a estatus ${alimento.estatus}`);*/
    } else {
        alert('Seleccione un alimento válido para eliminar');
    }
}


// Buscar un alimento
function buscarAlimento() {
    const id = parseInt(document.getElementById('idAlimentoBuscar').value);
    const alimento = obj.find(a => a.id === id);

    if (alimento) {
        selectProducto(obj.indexOf(alimento));
    } else {
        alert("Alimento no encontrado.");
    }
}

// Generar reporte
function imprimir() {
    const fechaActual = new Date();
    const dia = fechaActual.getDate();
    const mes = fechaActual.getMonth() + 1;
    const anio = fechaActual.getFullYear();
    const fechaFormateada = `${dia}/${mes}/${anio}`;

    let contenido = document.getElementById("tblAlimentos").outerHTML;
    let ventana = window.open("", "", "width=800,height=600");
    ventana.document.write("<html><head><title>Reporte Alimentos</title></head><body>");
    ventana.document.write("<h1>Reporte Alimentos " + fechaFormateada + "</h1>");
    ventana.document.write("<table border='1' cellpadding='5' cellspacing='0'>");
    ventana.document.write("<tr><th>#</th><th>Nombre</th><th>Categoría</th><th>Descripción</th><th>Foto</th><th>Precio</th><th>Descuento</th><th>Estatus</th></tr>");
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
    reader.readAsDataURL(file); 
}

// Previsualización de la imagen en el formulario de actualización
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
