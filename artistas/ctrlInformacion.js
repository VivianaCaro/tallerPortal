var urlBase = "https://pulentapp.herokuapp.com/";
//var urlBase = "http://localhost:5000/";

function main() {

    fetch(urlBase+"artista/listar/"+ getParametros(), {method: 'GET'})
    .then(function(response) {
        return response.json();
    }).then(function(artista){
        console.log(artista);

        var imagenArtista = document.getElementById('imagen-artista');
        var informacion = document.getElementById('informacion');

        var contenedor = document.createElement('div');
        //contenedor.classList = "col-lg-3 col-md-4 col-xs-6";
        var nombre = document.createElement('h2');
        var img = document.createElement('img');
        var nacimiento = document.createElement("p");
        var label = document.createElement("label");
        label.innerHTML = "<b>Biografía del artista</b>"
        var biografia = document.createElement("p");
        var seccion = document.createElement("hr");

        var lContacto = document.createElement("label");
        lContacto.innerHTML = "<b>Datos de contacto</b>"
        var correo = document.createElement("p");
        var celular = document.createElement("p");
        var linea = document.createElement("hr");

        nombre.innerText = artista.nombre + " " + artista.apellido;

        img.setAttribute("style", "max-height: 100%; max-width: 100%");

        if(artista.imagen == null || artista.imagen.length == 0) {
            img.src = "http://placehold.it/400x300";   
        } else {
            img.src = artista.imagen;
        }

        img.classList.add("img-fluid");
        img.classList.add("img-thumbnail");

        if(typeof artista.nacimiento != 'undefined') {
            nacimiento.innerText = "Nació en: "+artista.nacimiento.substring(0, 10);
        }

        biografia.innerText = typeof artista.biografia != 'undefined'? artista.biografia : "No hay información";

        correo.innerHTML = "<b>Correo Electrónico: </b>&emsp;" + artista.contacto.correo;
        celular.innerHTML = "<b>Celular: </b> &emsp; &emsp; &emsp; &emsp; &emsp; " + artista.contacto.celular;

        imagenArtista.appendChild(img);
        contenedor.appendChild(nombre);
        contenedor.appendChild(nacimiento);
        contenedor.appendChild(label);
        contenedor.appendChild(seccion);
        contenedor.appendChild(biografia);
        contenedor.appendChild(linea);
        contenedor.appendChild(lContacto);
        contenedor.appendChild(correo);
        contenedor.appendChild(celular);

        var labelObras = document.createElement("label");
        labelObras.textContent = "Obras realizadas por el artista"

        informacion.appendChild(contenedor);
        
        fetch(urlBase+"obra/encontrar/artista/"+ artista._id, {mode: 'cors', method: 'GET'})
        .then(function(response) {
            return response.json();
        }).then(function(obras){
            mostrarObras(obras);
        });

    });
}

function getParametros() {
    var url = window.location.href;
    var params = url.split('?')[1];
    var id = params.split('=')[1];
    return id;

}

var mostrarObras = function(obras) {
    obras.forEach(obra => {
        var listadoObras = document.getElementById('obras');
        var contenedor = document.createElement('div');
        contenedor.classList = "col-lg-3 col-md-4 col-xs-6";
        var titulo = document.createElement('h1');
        var img = document.createElement('img');
        var precio = document.createElement('h3');

        if(obra.imagen == null || obra.imagen.length == 0) {
            img.src = "http://placehold.it/400x300";   
        } else {
            img.src = obra.imagen;
        }        
        img.classList.add("img-fluid");
        img.classList.add("img-thumbnail");

        titulo.innerText = obra.titulo;
        precio.innerText = "   $ " + obra.precio.toLocaleString("es");
        
        if(typeof obra.fecha != 'undefined') {
            var fecha = document.createElement('h4');
            fecha.innerText = obra.fecha;
            contenedor.appendChild(fecha);
        }

        contenedor.appendChild(titulo);
        contenedor.appendChild(img);
        contenedor.appendChild(precio);
        listadoObras.appendChild(contenedor);
    });

};

document.addEventListener("DOMContentLoaded", main);