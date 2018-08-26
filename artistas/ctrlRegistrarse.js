var urlBase = "https://pulentapp.herokuapp.com/";
//var urlBase = "http://localhost:5000/";


function fecha() {
    var formulario = document.getElementById("formulario");
    var dia = formulario.dia;
    var mes = formulario.mes;
    var anio = formulario.anio;

    for(var i=1; i <= 31; i++) {
        var option = document.createElement('option');
        option.value = i;
        option.innerText = i;
        dia.appendChild(option);
    }

    var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", 
                "Julio","Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    for(var i=1; i <= meses.length; i++) {
        var opMes = document.createElement('option');
        opMes.value = i;
        opMes.innerText = meses[i-1];
        mes.appendChild(opMes);
    }

    for(var i=1970; i <= 2018; i++) {
        var opAnio = document.createElement('option');
        opAnio.value = i;
        opAnio.innerText = i;
        anio.appendChild(opAnio);
    }
}
fecha();

// Validando el formulario
function validacion() {
    var formulario = document.getElementById("formulario");
    
    if(formulario.nombre.value == null || formulario.nombre.value.length == 0 || /^\s+$/.test(formulario.nombre.value) ){
        alert('Complete el campo nombre');
        return false;
    }  
    if(formulario.dia.selectedIndex == 0 || formulario.mes.selectedIndex == 0 || formulario.anio.selectedIndex == 0) {
        alert("Debes ingresar tu fecha de nacimiento");
        return false;
    }
    if(formulario.imagen.files.length == 0) {
        alert('Debes subir una foto');
        return false;
    }
    if(formulario.celular.value == null || formulario.celular.value.length == 0) {
        alert('Debes ingregar un teléfono celular de contacto');
        return false;
    }
    if(formulario.correo.value == null || formulario.correo.value.length == 0 
                || !(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(formulario.correo.value))) {
        alert('Complete el campo email con un formato válido');
        return false;
    }
    if(!formulario.terminos.checked) {
        alert("Debes aceptar los términos");
        return false;
    }
    
    alert('Los datos han sido enviados');

    registrarse();
}

function registrarse() {
    fetch(urlBase +"artista/crear", 
    { mode: 'cors', 
      method: 'POST',
      body: new FormData(document.getElementById('formulario'))
    })
    .then(function(response) {
        return response.json();
    }).then(function(registro){
        if(registro._id.length > 0) {
            // exitoso
            alert('Registro exitoso!');
        }
    });
}