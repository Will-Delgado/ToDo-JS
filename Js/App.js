console.log('conectados');
// Declaramos Variables
const nuevaTarea = document.getElementById('nuevaTarea');
const listaTareas = document.getElementById('listaTareas');
const addTareas = document.getElementById('addTarea');
const mensaje = document.getElementById('msg');
const msg = "Campo Vacio, Ingresa una tarea";

/* declaramos la funcion para añadir la tarea */
function addTarea(e) {
    e.preventDefault();

    const textoTarea = nuevaTarea.value;
    /* validamos si el texto esta vacio */
    if (textoTarea === '') {
        alert(msg);
    } else {
        const tarea = document.createElement("li");
        tarea.className = "list-group-item"; 
        //render que mostrara la lista
        tarea.innerHTML = `
        <span>${textoTarea}</span>
        <button class="btn btn-danger ms-2 float-end" id="btnEliminar">
        <i class="fa-regular fa-trash-can"></i>
        </button> 
        <button class="btn btn-success ms-2 float-end" id="btnCompletar" data-completed="false">
        <i class="fa-solid fa-check-double"></i>
        </button>
        <button class="btn btn-warning ms-2 float-end" id="btnEditar">
        <i class="fa-solid fa-pen-to-square"></i>
        </button>

        `;
        listaTareas.appendChild(tarea);
        nuevaTarea.value = '';
        const btnEliminar = tarea.querySelector("#btnEliminar");
        btnEliminar.addEventListener('click', eliminarTarea);
        const btnEditar = tarea.querySelector("#btnEditar");
        btnEditar.addEventListener('click', editarTarea);

        const btnCompletar = tarea.querySelector("#btnCompletar");
        btnCompletar.addEventListener("click", function (e) {
            if (btnCompletar.dataset.completed === "false") {
                tarea.classList.add("list-group-item-success");
                btnCompletar.dataset.completed = "true";
            } else {
                tarea.classList.remove("list-group-item-success");
                btnCompletar.dataset.completed = "false";
            }
        });

    }

}

/* funcion editar tarea y guardar */
function editarTarea(e) {
    const input = document.createElement("input");
    const btnGuardar = document.createElement("button");
    const tarea = e.target.closest("li");
    const tareaIndex = Array.from(listaTareas.children).indexOf(tarea);
    const span = tarea.querySelector("span");
    // creamos el nuevo input
    input.type = "text";
    input.value = span.textContent;
    input.className = "form-control m-2";
    btnGuardar.className = "btn btn-success ml-2";
    btnGuardar.textContent = "Guardar";
    const btnEditar = tarea.querySelector("#btnEditar");
    const btnEliminar = tarea.querySelector("#btnEliminar");
    const btnCompletar = tarea.querySelector("#btnCompletar");
    // Ocultamos los botones de editar, eliminar y completado mientras se está editando
    btnEditar.classList.add("d-none");
    btnEliminar.classList.add("d-none");
    btnCompletar.classList.add("d-none");
    //validamos la posicion del input para insertar la actualizacion
    const listaTareasArray = Array.from(listaTareas.children);
    if (tareaIndex < listaTareasArray.length - 1) {
        listaTareas.insertBefore(tarea, listaTareasArray[tareaIndex + 1]);
    } else {
        listaTareas.appendChild(tarea);
    }
    tarea.insertBefore(input, span); // insertar input antes del span
    tarea.appendChild(btnGuardar);

    btnGuardar.addEventListener("click", function (e) {
        span.textContent = input.value;
        tarea.removeChild(input);
        tarea.removeChild(btnGuardar);

        // Mostramos los botones de editar y eliminar después de guardar los cambios
        btnEditar.classList.remove("d-none");
        btnEliminar.classList.remove("d-none");
        btnCompletar.classList.remove("d-none")

    });
}


/* funcion para eliminar una tarea */
function eliminarTarea(e) {
    const tarea = e.target.closest("li");
    tarea.remove();
}


addTareas.addEventListener('click', addTarea);

