var urlBase = "https://pulentapp.herokuapp.com/";
//var urlBase = "http://localhost:5000/";

function main() {

    fetch(urlBase+ "obra/listar", {mode: 'cors', method: 'GET'})
    .then(function(response) {
        return response.json();
    }).then(function(obras){
        console.log(obras);
        var listadoObras = document.getElementById('obras');
        obras.forEach( (obra,index) => {

            var imagen;
            if(obra.imagen == null || obra.imagen.length == 0) {
                imagen = "http://placehold.it/400x300";   
            } else {
                imagen = obra.imagen;
            }

            if(typeof obra.fecha != 'undefined') {
                var fecha = document.createElement('h4');
                fecha.innerText = obra.fecha;
                contenedor.appendChild(fecha);
            }

            var contenedor = document.createElement('div');
            contenedor.classList = "col-lg-3 col-md-4 col-xs-6 thumb";

            var a = document.createElement('a');
            a.classList.add("thumbnail");
            a.href = "#";
            a.setAttribute("data-image-id","4");
            a.setAttribute("data-toggle", "modal");
            a.setAttribute("data-title", obra.titulo);
            a.setAttribute("data-price", "   $ " + obra.precio.toLocaleString("es"));
            a.setAttribute("data-tags", " Tags: " + obra.tags);
            a.setAttribute("data-image",imagen+"?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260");
            a.setAttribute("data-target", "#image-gallery");

            var img = document.createElement('img');
            img.classList.add("img-thumbnail");
            img.src = imagen+"?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";

            a.appendChild(img);
            contenedor.appendChild(a);
            listadoObras.appendChild(contenedor);

        });

        cargarGaleria();
    });
    
}

document.addEventListener("DOMContentLoaded", main);
