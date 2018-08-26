
var urlBase = "https://pulentapp.herokuapp.com/";
//var urlBase = "http://localhost:5000/";

function main() {

    fetch(urlBase+ "artista/listar", {mode: 'cors', method: 'GET'})
    .then(function(response) {
        return response.json();
    }).then(function(artistas){

        console.log(artistas);
        artistas.forEach(element => {
            var listado = document.getElementById('listado');
            var contenedor = document.createElement('div');
            contenedor.classList = "col-lg-3 col-md-4 col-xs-6";
            var nombre = document.createElement('h4');
            var img = document.createElement('img');
            var btn = document.createElement("a");

            nombre.classList.add("card-header-gray");
            nombre.innerText = element.nombre + " " + element.apellido;

            if(element.imagen == null || element.imagen.length == 0) {
                img.src = "http://placehold.it/400x300";   
            } else {
                img.src = element.imagen;
            }
            img.classList.add("img-fluid");
            img.classList.add("img-thumbnail");

            btn.classList = "d-block mb-4 h-100 text-decoration: none;";
            btn.href = "informacion.html?id=" + element._id;

            btn.appendChild(img);
            
            contenedor.appendChild(nombre);
            contenedor.appendChild(btn);

            listado.appendChild(contenedor);
        });

    });
}

document.addEventListener("DOMContentLoaded", main);