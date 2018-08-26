//var urlBase = "https://pulentapp.herokuapp.com/";
var urlBase = "http://localhost:5000/";

function fechaAnio() {
    var formulario = document.getElementById("formulario");
    var anio = formulario.anio;

    for(var i=2018; i >= 1970; i--) {
        var opAnio = document.createElement('option');
        opAnio.value = i;
        opAnio.innerText = i;
        anio.appendChild(opAnio);
    }
}
fechaAnio();

// Validando el formulario
function validacion() {
    var formulario = document.getElementById("formulario");
    if(formulario.titulo.value == null || formulario.titulo.value.length == 0 || /^\s+$/.test(formulario.titulo.value) ){
        alert('Complete el campo nombre');
        return false;
    }
    if(formulario.imagen.files.length == 0) {
        alert('Debes subir una imagen de tu obra');
        return false;
    }
    if(formulario.precio.value == null || formulario.precio.value.length == 0) {
        alert('Debes darle un precio a tu trabajo!');
        return false;
    }
    if(formulario.correo.value == null || formulario.correo.value.length == 0 
                || !(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(formulario.correo.value))) {
        alert('Complete el campo email con un formato válido');
        console.log("formulario.correo.value", formulario.correo.value);
        return false;
    }

    if(!formulario.terminos.checked) {
        alert("Debes aceptar los términos");
        return false;
    }
    alert('Los datos han sido enviados');

    vender();
}

function vender() {
    fetch(urlBase+"obra/crear", 
    { mode: 'cors', 
      method: 'POST',
      body: new FormData(document.getElementById('formulario'))
    })
    .then(function(response) {
        console.log(response);
        if(response.status == 501) {
            alert("Artista no encontrado, por favor registra tu correo.");
        }
        return response.json();
    }).then(function(registro){
        if(registro._id.length > 0) {
            // exitoso
            alert('Registro exitoso!');
        } else {
            alert(registro.mensaje);
        }
    });
}

function adjust_textarea(h) {
    h.style.height = "20px";
    h.style.height = (h.scrollHeight)+"px";
}