let obj = [];
let indexProductoSeleccionado;

// Cargar los datos desde un archivo JSON
fetch("")
    .then(response => response.json())
    .then(jsondata => {
        obj = jsondata;
        actualizarTabla();
        console.log('Datos cargados:', obj); // Verificar que los datos se cargan correctamente
    })
    .catch(error => console.error('Error al obtener los datos:', error));

// Agregar una nueva bebida
function agregarBebida() {
    const nombre = document.getElementById('nombre').value;
    const categoria = document.getElementById('categoria').value;
    const descripcion = document.getElementById('descripcion').value;
    const precio = document.getElementById('precio').value;
    const descuento = document.getElementById('descuento').value;
    const fileInput = document.getElementById('inputImagenAgregar');
    let foto = '';

    if (!nombre || !categoria || !descripcion || NaN(precio) || NaN(descuento) || !fileInput) {
        alert("Por favor, complete todos los campos correctamente.");
        return;
    }

    if (fileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            foto = e.target.result;
            const nuevaBebida = {
                id: obj.length + 1,
                nombre: nombre,
                categoria: categoria,
                descripcion: descripcion,
                precio: parseFloat(precio),
                descuento: parseFloat(descuento),
                foto: foto,
                estatus: 'Activo'
            };
            obj.push(nuevaBebida);
            actualizarTabla();
            limpiarFormulario();
            cerrarFormAgregar();
            alert("Bebida registrada con éxito");
        };
        reader.readAsDataURL(fileInput.files[0]);
    } else {
        const nuevaBebida = {
            id: obj.length + 1,
            nombre: nombre,
            categoria: categoria,
            descripcion: descripcion,
            precio: parseFloat(precio),
            descuento: parseFloat(descuento),
            foto: foto,
            estatus: 'Activo'
        };
        obj.push(nuevaBebida);
        actualizarTabla();
        limpiarFormulario();
        cerrarFormAgregar();
        alert("Bebida registrada con éxito");
    }
}

// Limpiar el formulario de agregar
function limpiarFormulario() {
    document.getElementById('nombre').value = '';
    document.getElementById('categoria').value = '';
    document.getElementById('descripcion').value = '';
    document.getElementById('precio').value = '';
    document.getElementById('descuento').value = '';
    document.getElementById('inputImagenAgregar').value = '';
    document.getElementById('imagenPreviewAgregar').src = '';
    document.getElementById('imagenPreviewAgregar').style.display = 'none';
    indexProductoSeleccionado = null;
}

// Actualizar la tabla con los datos de las bebidas
function actualizarTabla() {
    let cuerpo = "";
    obj.forEach((elemento, index) => {
        let registro =
            `<tr onclick="selectProducto(${index});">
                <td>${elemento.id}</td>
                <td>${elemento.nombre}</td>
                <td>${elemento.categoria}</td>
                <td>${elemento.descripcion}</td>
                <td>${elemento.precio}</td>
                <td>${elemento.descuento}</td>
                <td><img src="${elemento.foto}" width="100"></td>
                <td>${elemento.estatus}</td>
            </tr>`;
        cuerpo += registro;
    });
    document.getElementById("tblProductos").innerHTML = cuerpo;
}

// Seleccionar una bebida para actualizar
function selectProducto(index) {
    const bebida = obj[index];
    document.getElementById('nombreActualizar').value = bebida.nombre;
    document.getElementById('categoriaActualizar').value = bebida.categoria;
    document.getElementById('descripcionActualizar').value = bebida.descripcion;
    document.getElementById('precioActualizar').value = bebida.precio;
    document.getElementById('descuentoActualizar').value = bebida.descuento;
    document.getElementById('imagenPreviewActualizar').src = bebida.foto;
    document.getElementById('imagenPreviewActualizar').style.display = bebida.foto ? 'block' : 'none';
    indexProductoSeleccionado = index;
    abrirFormActualizar();
}

// Modificar una bebida existente
function modificarBebida() {
    if (indexProductoSeleccionado !== null) {
        const fileInput = document.getElementById('inputImagenActualizar');
        const bebida = obj[indexProductoSeleccionado];

        if (fileInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                bebida.foto = e.target.result;
                actualizarBebida(bebida);
            };
            reader.readAsDataURL(fileInput.files[0]);
        } else {
            actualizarBebida(bebida);
        }
    }
}

function actualizarBebida() {
    const nombre = document.getElementById('nombreActualizar').value;
    const categoria = document.getElementById('categoriaActualizar').value;
    const descripcion = document.getElementById('descripcionActualizar').value;
    const precio = parseFloat(document.getElementById('precioActualizar').value);
    const descuento = parseFloat(document.getElementById('descuentoActualizar').value);

    if (!nombre || !categoria || !descripcion || isNaN(precio) || isNaN(descuento)) {
        alert("Por favor, complete todos los campos correctamente.");
        return;
    }

    actualizarTabla();
    cerrarFormActualizar();
    alert("Bebida actualizada con éxito");
}


// Cerrar formularios
function cerrarFormAgregar() {
    document.getElementById("formAgregar").style.display = "none";
}

function cerrarFormActualizar() {
    document.getElementById("formActualizar").style.display = "none";
}

function cerrarFormBuscar() {
    document.getElementById("formBuscar").style.display = "none";
}

function abrirFormActualizar() {
    document.getElementById("formActualizar").style.display = "block";
}

// Buscar una bebida
function buscarBebida() {
    const idBebida = document.getElementById('idBebidaBuscar').value;
    console.log('ID buscado:', idBebida); // Verificar que se obtiene el ID correctamente
    const bebida = obj.find(beb => beb.id == idBebida);
    if (bebida) {
        console.log('Bebida encontrada:', bebida); // Verificar que se encuentra la bebida
        selectProducto(obj.indexOf(bebida));
    } else {
        alert("Bebida no encontrada");
    }
}

// Eliminar (deshabilitar/habilitar) bebida
function eliminarBebida() {
    if (indexProductoSeleccionado !== undefined && indexProductoSeleccionado !== null && obj[indexProductoSeleccionado]) {
        const bebida = obj[indexProductoSeleccionado];
        bebida.estatus = bebida.estatus == 'Activo' ? 'Inactivo' : 'Activo';
        actualizarTabla();
        cerrarFormActualizar();
        alert(`Bebida cambiada a estatus ${bebida.estatus}`);
    } else {
        alert('Seleccione una bebida válida para eliminar');
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
    ventana.document.write("<html><head><title>Reporte Bebidas</title></head><body>");
    ventana.document.write("<h1>Reporte Bebidas " + fechaFormateada + "</h1>");
    ventana.document.write("<table border='1' cellpadding='5' cellspacing='0'>");
    ventana.document.write("<tr><th>#</th><th>Nombre</th><th>Categoria</th><th>Descripcion</th><th>Precio</th><th>Descuento</th><th>Imagen</th><th>Estatus</th></tr>");
    ventana.document.write(contenido);
    ventana.document.write("</table>");
    ventana.document.write("</body></html>");
    ventana.document.close();
    ventana.print();
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

// Previsualizar imagen al agregar bebida
document.getElementById('inputImagenAgregar').addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('imagenPreviewAgregar').src = e.target.result;
            document.getElementById('imagenPreviewAgregar').style.display = 'block';
        }
        reader.readAsDataURL(file);
    }
});

// Previsualizar imagen al actualizar bebida
document.getElementById('inputImagenActualizar').addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('imagenPreviewActualizar').src = e.target.result;
            document.getElementById('imagenPreviewActualizar').style.display = 'block';
        }
        reader.readAsDataURL(file);
    }
});
