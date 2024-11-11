document.addEventListener('DOMContentLoaded', function () {
    // Abrir formularios
    document.querySelectorAll('.abrirForm').forEach(button => {
        button.addEventListener('click', function () {
            const formId = this.getAttribute('data-form');
            const formElement = document.getElementById(formId);
            if (formElement) {
                formElement.style.display = 'flex';
            } else {
                console.error(`Elemento con id ${formId} no encontrado.`);
            }
        });
    });

    // Cerrar formularios
    document.querySelectorAll('.cerrarForm').forEach(button => {
        button.addEventListener('click', function () {
            const popupForm = this.closest('.popupForm');
            if (popupForm) {
                popupForm.style.display = 'none';
            } else {
                console.error('Elemento .popupForm no encontrado.');
            }
        });
    });

    // Cerrar formularios al hacer clic fuera
    window.addEventListener('click', function (event) {
        document.querySelectorAll('.popupForm').forEach(form => {
            if (event.target == form) {
                form.style.display = 'none';
            }
        });
    });

    const buscarButton = document.querySelector('.buscarForm');
    const formBuscar = document.getElementById('formBuscar');
    const botonModificar = document.querySelector('.modificarForm');
    const formActualizar = document.getElementById('formActualizar');
    const botonEliminar = document.querySelector('.eliminarForm');
    const formEliminar = document.getElementById('formEliminar');
    const botonReporte = document.getElementById('botonReporte');
    const formResultado = document.getElementById('formResultado');

    function mostrarResultado() {
        formResultado.style.display = 'flex';
    }

    function mostrarActualizar() {
        formActualizar.style.display = 'flex';
    }

    function mostrarEliminar() {
        formEliminar.style.display = 'flex';
    }

    if (buscarButton) {
        buscarButton.addEventListener('click', function (event) {
            event.preventDefault();
            if (formBuscar) {
                formBuscar.style.display = 'none';
                mostrarResultado();
            }
        });
    } else {
        console.error('Elemento .buscarForm no encontrado.');
    }

    if (botonModificar) {
        botonModificar.addEventListener('click', function (event) {
            event.preventDefault();
            if (formResultado) {
                formResultado.style.display = 'none';
                mostrarActualizar();
            }
        });
    } else {
        console.error('Elemento .modificarForm no encontrado.');
    }

    if (botonEliminar) {
        botonEliminar.addEventListener('click', function (event) {
            event.preventDefault();
            if (formResultado) {
                formResultado.style.display = 'none';
                mostrarEliminar();
            }
        });
    } else {
        console.error('Elemento .eliminarForm no encontrado.');
    }
});