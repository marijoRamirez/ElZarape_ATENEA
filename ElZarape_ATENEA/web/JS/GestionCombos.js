let combos = [];
let detalles = [];
let ultimoComboId = null;

// Cargar los datos desde el archivo JSON
fetch("")
    .then(response => response.json())
    .then(data => {
        combos = data.combos;
        detalles = data.detalles;
        actualizarTabla();
    })
    .catch(error => console.error('Error al obtener los datos:', error));

// Función para actualizar la tabla con los combos
function actualizarTabla() {
    let cuerpo = "";    
    combos.forEach((combo, index) => {
        let registro =
            `<tr onclick="selectCombo(${index});">
                <td>${combo.id}</td>
                <td>${combo.nombre}</td>
                <td>${combo.descripcion}</td>
                <td><img src="${combo.foto}" width="100"></td>
                <td>$${combo.Precio}</td>
                <td>${combo.estatus}</td>
            </tr>`;
        cuerpo += registro;
    });
    document.getElementById("tblCombo").innerHTML = cuerpo;
}

function mostrarDetallesCombo(combo) {
    const detallesTableBody = document.getElementById('tblDetalleCombo');
    let cuerpo = "";

    const detallesCombo = detalles.filter(detalle => detalle.idCombo === combo.id);
    detallesCombo.forEach((detalle,index) => {
        let registro =
            `<tr>
                <td>${detalle.id}</td>
                <td>${detalle.nombre}</td>
                <td>${detalle.cantidad}</td>
                <td><img src="${detalle.foto}" width="100"></td>
                <td>${detalle.estatus}</td>
                <td>
                <input type="button" value="+" onclick="incrementarCantidad(${detalle.id},${detalle.idCombo})">
                <input type="button" value="-" onclick="decrementarCantidad(${detalle.id},${detalle.idCombo})">
                </td>
                <td>
                <input type="button" value="habilitar/desabilitar" onclick="cambiarEstatus(${detalle.id},${detalle.idCombo})">
                </td>
                
            </tr>`;
        cuerpo += registro;
    });
    detallesTableBody.innerHTML = cuerpo;
}

// Función para incrementar la cantidad
function incrementarCantidad(id,idCombo) {
    const detalle = detalles.find(detalle => detalle.id === id);
    if (detalle) {
        detalle.cantidad += 1;
    const combo = combos.find(combo => combo.id == idCombo);
    if (combo) {
        mostrarDetallesCombo(combo);
    }
    }   
}

function decrementarCantidad(id,idCombo) {
    const detalle = detalles.find(detalle => detalle.id === id);
    if (detalle && detalle.cantidad > 0) {
        detalle.cantidad -= 1;
        const combo = combos.find(combo => combo.id == idCombo);
        if (combo) {
            mostrarDetallesCombo(combo);
        }
    } else {
        alert('La cantidad no puede ser menor a 0');
    }
}

function cambiarEstatus(id,idCombo) {
    const detalle = detalles.find(detalle => detalle.id === id);
    if (detalle) {
        detalle.estatus = detalle.estatus === 'Activo' ? 'Inactivo' : 'Activo';
    
    const combo = combos.find(combo => combo.id == idCombo);
    if (combo) {
        mostrarDetallesCombo(combo);
    }
    }
}

// Función para seleccionar un combo para actualizar
function selectCombo(index) {
    const combo = combos[index];
    document.getElementById('idComboActualizar').value = combo.id;
    document.getElementById('nombreComboActualizar').value = combo.nombre;
    document.getElementById('descripcionComboActualizar').value =combo.descripcion;
    document.getElementById('precioComboActualizar').value = combo.Precio;
    
    const imagenPreviewActualizar = document.getElementById('imagenPreviewActualizar');
    
    // Mostrar la imagen existente al abrir el formulario
    if (combo.foto) {
        imagenPreviewActualizar.src = combo.foto;
        imagenPreviewActualizar.style.display = 'block';
    } else {
        imagenPreviewActualizar.src = '';
        imagenPreviewActualizar.style.display = 'none';
    }

    indexComboSeleccionado = index;
    abrirFormActualizar();
    mostrarDetallesCombo(combo);
}



// Función para agregar un nuevo combo
function agregarCombo() {
    const nombre = document.getElementById('nombreCombo').value;
    const foto = document.getElementById('fotoCombo').value;
    const descripcion = document.getElementById('descripcionCombo').value;
    const precio = parseInt(document.getElementById('precioCombo').value);

// Validar que todos los campos estén completos
    if (!nombre || !foto || !descripcion || !precio) {
        alert("Todos los campos son obligatorios");
        return;
        }
    const nuevoCombo = {
        id: (combos.length)+1,
        nombre: nombre,
        descripcion: descripcion,
        foto: foto,
        Precio : precio,
        estatus: 'Activo'
    };

    combos.push(nuevoCombo);
    ultimoComboId = nuevoCombo.id;
    actualizarTabla();
    limpiarFormulario();
    cerrarFormAgregar();
    alert("Combo registrado con éxito");
    mostrarAgregarProducto();
}

// Limpiar el formulario de agregar
function limpiarFormulario() {
    document.getElementById('nombreCombo').value = '';
    document.getElementById('fotoCombo').value = '';
    document.getElementById('descripcionCombo').value = '';
    document.getElementById('imagenPreviewAgregar').src = 'IMG/nada.jpg';
    document.getElementById('precioCombo').value = '';
    
    indexComboSeleccionado = null;
}

// Abrir el formulario de actualización
function abrirFormActualizar() {
    document.getElementById('formActualizar').style.display = 'flex';
}

// Cerrar el formulario de actualización
function cerrarFormActualizar() {
    document.getElementById('formActualizar').style.display = 'none';
}

// Cerrar el formulario de agregar
function cerrarFormAgregar() {
    document.getElementById('formAgregar').style.display = 'none';
}

// Función para modificar un combo
function modificarCombo() {
    const id = parseInt(document.getElementById('idComboActualizar').value);
    const nombre = document.getElementById('nombreComboActualizar').value;
    const descripcion = document.getElementById('descripcionComboActualizar').value;
    const fileInput = document.getElementById('fotoComboActualizar');
    const foto = fileInput.files[0] ? URL.createObjectURL(fileInput.files[0]) : document.getElementById('imagenPreviewActualizar').src;
    const precio = parseInt(document.getElementById('precioComboActualizar').value);
    
    // Validar que todos los campos estén completos
    if (!nombre || !foto || !descripcion || !precio) {
        alert("Todos los campos son obligatorios");
        return;
    }
    
    const combo = combos.find(combo => combo.id == id);
    if (combo) {
        combo.nombre = nombre;
        combo.foto = foto;
        combo.descripcion = descripcion;
        combo.precio = precio;
        actualizarTabla();
        cerrarFormActualizar();
        alert("Combo actualizado");
    } else {
        alert('Combo no encontrado');
    }
}

// Función para buscar un combo por su ID
function buscarCombo() {
    const idCombo = parseInt(document.getElementById('idCombo').value);
    const comboEncontrado = combos.find(combo => combo.id == idCombo);

// Validar que todos los campos estén completos
    if (!idCombo) {
        alert("Todos los campos son obligatorios");
        return;
    }
    
    if (comboEncontrado) {
        document.getElementById('idComboActualizar').value = comboEncontrado.id;
        document.getElementById('nombreComboActualizar').value = comboEncontrado.nombre;
        document.getElementById('precioComboActualizar').value = comboEncontrado.Precio;
        document.getElementById('descripcionComboActualizar').value = comboEncontrado.descripcion;
        
        const imagenPreviewActualizar = document.getElementById('imagenPreviewActualizar');
    
    // Mostrar la imagen existente al abrir el formulario
    if (comboEncontrado.foto) {
        imagenPreviewActualizar.src = comboEncontrado.foto;
        imagenPreviewActualizar.style.display = 'block';
    } else {
        imagenPreviewActualizar.src = '';
        imagenPreviewActualizar.style.display = 'none';
    }
        

        indexComboSeleccionado = combos.findIndex(combo => combo.id == idCombo);
        abrirFormActualizar();
        mostrarDetallesCombo(comboEncontrado);
    } else {
        alert('Combo no encontrado');
    }
}

// Función para eliminar un combo
function eliminarCombo() {
    if (indexComboSeleccionado !== undefined && indexComboSeleccionado !== null && combos[indexComboSeleccionado]) {
        const combo = combos[indexComboSeleccionado];
        combo.estatus = combo.estatus == 'Activo' ? 'Inactivo' : 'Activo';
        actualizarTabla();
        cerrarFormActualizar();
        alert(`Combo cambiado a estatus ${combo.estatus}`);
    } else {
        alert('Seleccione un combo válido para eliminar');
    }
}

// Espera a que el contenido del DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // Ya no es necesario cargar los datos aquí, ya que los datos se cargan al inicio
});

function mostrarDetallesNuevoCombo(combo) {
    const detallesTableBody = document.getElementById('tblDetalleCombo2');
    let cuerpo = "";

    const detallesCombo = detalles.filter(detalle => detalle.idCombo === combo);
    detallesCombo.forEach((detalle) => {
        let registro =
            `<tr>
                <td>${detalle.id}</td>
                <td>${detalle.nombre}</td>
                <td>${detalle.cantidad}</td>
                <td><img src="${detalle.foto}" width="100"></td>
                <td>${detalle.estatus}</td>
                <td>
                <input type="button" value="+" onclick="incrementarCantidad(${detalle.id},${detalle.idCombo})">
                <input type="button" value="-" onclick="decrementarCantidad(${detalle.id},${detalle.idCombo})">
                </td>
                <td>
                <input type="button" value="habilitar/desabilitar" onclick="cambiarEstatus(${detalle.id},${detalle.idCombo})">
                </td>
                
            </tr>`;
        cuerpo += registro;
    });
    detallesTableBody.innerHTML = cuerpo;
}



function mostrarAgregarProducto(){
    const formAgregarProductos = document.getElementById('formAgregarProductos');
    formAgregarProductos.style.display = 'flex';
    mostrarDetallesNuevoCombo(ultimoComboId);
}


// Función para agregar un nuevo detalle
function agregarDetalle() {
    const nombre = document.getElementById('nombreProducto').value;
    const cantidad = parseInt(document.getElementById('cantidadProducto').value);

// Validar que todos los campos estén completos
    if (!nombre || !cantidad ) {
        alert("Todos los campos son obligatorios");
        return;
    }

    const nuevoDetalle = {
        id: detalles.length,
        nombre: nombre,
        cantidad: cantidad,
        estatus: 'Activo',
        idCombo: ultimoComboId
    };

     detalles.push(nuevoDetalle);
    const ultimoCombo = combos.find(combo => combo.id == ultimoComboId);
    if (ultimoCombo) {
        mostrarDetallesNuevoCombo(ultimoComboId);  
    }
    alert("Detalle registrado con éxito");
}

function mostrarAgregarOtroProducto(){
    ultimoComboId = parseInt(document.getElementById('idComboActualizar').value);
    formActualizar.style.display = 'none';
    formAgregarProductos.style.display = 'flex';
    mostrarDetallesNuevoCombo(ultimoComboId);
}

// Generar reporte
function imprimir() {
    const fechaActual = new Date();
    const dia = fechaActual.getDate();
    const mes = fechaActual.getMonth() + 1;
    const anio = fechaActual.getFullYear();
    const fechaFormateada = `${dia}/${mes}/${anio}`;

    let contenido = document.getElementById("tblCombo").outerHTML;
    let ventana = window.open("", "", "width=800,height=600");
    ventana.document.write("<html><head><title>Reporte Combos</title></head><body>");
    ventana.document.write("<h1>Reporte Combos " + fechaFormateada + "</h1>");
    ventana.document.write("<table border='1' cellpadding='5' cellspacing='0'>");
    ventana.document.write("<tr><th>#</th><th>Nombre</th><th>Descripción</th><th>Foto</th><th>Estatus</th></tr>");
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

function convertirArchivoABase64(file, callback) {
    const reader = new FileReader();
    reader.onload = function (event) {
        callback(event.target.result);
    };
    reader.readAsDataURL(file); // Asegúrate de usar readAsDataURL para convertir a base64
}

// Previsualización de la imagen en el formulario de agregar
document.getElementById('fotoCombo').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('imagenPreviewAgregar').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// Previsualización de la imagen en el formulario de actualización
document.addEventListener('DOMContentLoaded', function () {
    const inputImagenActualizar = document.getElementById('fotoComboActualizar');
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

