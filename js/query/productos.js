//Esta función ejecuta la petición asincrona al servidor de Oracle, envia una
//petición al ws de tipo GET
function listar() {
    $.ajax({
        // la URL para la petición (url: "url al recurso o endpoint")
        url: "http://155.248.195.17:8080/api/supplements/all",

        // especifica el tipo de petición http: POST, GET, PUT, DELETE
        type: 'GET',

        // el tipo de información que se espera de respuesta
        dataType: 'json',

        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success: function (respuesta) {
            //recibe el arreglo 'items' de la respuesta a la petición
            listarProductos(respuesta);
        },

        // código a ejecutar si la petición falla;
        // son pasados como argumentos a la función
        // el objeto de la petición en crudo y código de estatus de la petición
        error: function (xhr, status) {
            $("#mensajes").html("Ocurrio un problema al ejecutar la petición..." + status);
            //$("#mensajes").hide(1000);
        },

        // código a ejecutar sin importar si la petición falló o no
        complete: function (xhr, status) {
            $("#mensajes").html("Obteniendo listado productos...");
            $("#mensajes").hide(1000);
        }
    });
}

//Esta función ejecuta la petición asincrona al servidor de Oracle, envia una
//petición al ws de tipo GET
function listarxPrecio() {
    let precio = $("#byPrice").val();

    if(!validaesVacio(precio)) {

        $.ajax({
            // la URL para la petición (url: "url al recurso o endpoint")
            url: `http://155.248.195.17:8080/api/supplements/price/${precio}`,

            // especifica el tipo de petición http: POST, GET, PUT, DELETE
            type: 'GET',

            // el tipo de información que se espera de respuesta
            dataType: 'json',

            // código a ejecutar si la petición es satisfactoria;
            // la respuesta es pasada como argumento a la función
            success: function (respuesta) {
                //recibe el arreglo 'items' de la respuesta a la petición
                listarProductos(respuesta);
            },

            // código a ejecutar si la petición falla;
            // son pasados como argumentos a la función
            // el objeto de la petición en crudo y código de estatus de la petición
            error: function (xhr, status) {
                $("#mensajes").html("Ocurrio un problema al ejecutar la petición..." + status);
                //$("#mensajes").hide(1000);
            },

            // código a ejecutar sin importar si la petición falló o no
            complete: function (xhr, status) {
                $("#mensajes").html("Obteniendo listado productos...");
                $("#mensajes").hide(1000);
            }
        });
    }else{
        $("#byPrice").focus();
        Swal.fire("Debe  ingresar el precio, por favor verifique...");        
    }
}


//Esta función ejecuta la petición asincrona al servidor de Oracle, envia una
//petición al ws de tipo GET
function listarxDescripcion() {
    let descripcion = $("#byDescription").val();

    if(!validaesVacio(descripcion)) {
        $.ajax({
            // la URL para la petición (url: "url al recurso o endpoint")
            url: `http://155.248.195.17:8080/api/supplements/description/${descripcion}`,

            // especifica el tipo de petición http: POST, GET, PUT, DELETE
            type: 'GET',

            // el tipo de información que se espera de respuesta
            dataType: 'json',

            // código a ejecutar si la petición es satisfactoria;
            // la respuesta es pasada como argumento a la función
            success: function (respuesta) {
                //recibe el arreglo 'items' de la respuesta a la petición
                listarProductos(respuesta);
            },

            // código a ejecutar si la petición falla;
            // son pasados como argumentos a la función
            // el objeto de la petición en crudo y código de estatus de la petición
            error: function (xhr, status) {
                $("#mensajes").html("Ocurrio un problema al ejecutar la petición..." + status);
                //$("#mensajes").hide(1000);
            },

            // código a ejecutar sin importar si la petición falló o no
            complete: function (xhr, status) {
                $("#mensajes").html("Obteniendo listado productos...");
                $("#mensajes").hide(1000);
            }
        });
    }else{
        $("#byDescription").focus();
        Swal.fire("Debe  ingresar una descripción, por favor verifique...");        
    }
}

/* 
    Esta función se encarga de recorrer el listado de datos 'items' recibido como parametro,
    construir una tabla html en la variable javascript 'tabla',
    acceder al elemento elemento identificado con el id 'listado'
    y modificar su html agregando el contenido de la variable 'tabla'.
    
*/
function listarProductos(items) {

    let opcionConsultaSeleccionada = $("#opcionConsulta").val();
    $("#listado").html("");
    $("#listadoxprecio").html("");
    $("#listadoxdescripcion").html("");

    if (opcionConsultaSeleccionada=="0"){
        $("#listado").show()
        $("#listadoxprecio").hide()
        $("#listadoxdescripcion").hide()
    }else if (opcionConsultaSeleccionada=="1"){
        $("#listadoxprecio").show()
        $("#listado").hide()
        $("#listadoxdescripcion").hide()
    }else if (opcionConsultaSeleccionada=="2"){
        $("#listadoxdescripcion").show()
        $("#listado").hide()
        $("#listadoxprecio").hide()
    }

    let tabla = `<table class="table table-dark table-hover mt-5">
                <thead>
                  <tr>
                    <th>Referencia</th>
                    <th>Categoría</th>
                    <th>Marca</th>
                    <th>Descripción</th>
                    <th>Disponibilidad</th>
                    <th>Precio</th>
                    <th>Imagen</th>
                  </tr>`;
    //escribe en la consola del desarrollador para efectos de depuración
    console.log(items);

    //recorrer el arreglo de items de producto para pintarlos en la tabla
    for (let index = 0; index < items.length; index++) {

        let texto = `<strong>Referencia:</strong> ${items[index].reference}</br><strong>Descripción:</strong> ${items[index].description}`;
        let availability = items[index].availability ? 'SI' : 'NO';
        tabla += `<tr>
                  <td>${items[index].reference}</td>
                   <td>${items[index].category}</td>
                   <td>${items[index].brand}</td>
                   <td>${items[index].description}</td>
                   <td>${availability}</td>
                   <td>${items[index].price}</td>
                   <td><img class="img-thumbnail" src="${items[index].photography}" class="img-fluid"/></td>
                    </td>
                   </tr>`;
    }

    //cierra tabla agregando el tag adecuado
    tabla += `</thead></table>`;

    //accede al elemento con id 'listado' y adiciona la tabla de datos a su html
    if (opcionConsultaSeleccionada=="0"){
        $("#listado").html(tabla);
    }else if (opcionConsultaSeleccionada=="1"){
        $("#listadoxprecio").html(tabla);
    }else if (opcionConsultaSeleccionada=="2"){
        $("#listadoxdescripcion").html(tabla);
    }
}



function estadoInicial() {
    $("#alerta").hide();
    $("#mensaje").html("");
}

function verImagen(img) {
    let imagen = `${img}`;
    Swal.fire({
        title: 'Sweet!',
        text: 'Modal with a custom image.',
        imageUrl: `'${imagen}'`,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
      })
}