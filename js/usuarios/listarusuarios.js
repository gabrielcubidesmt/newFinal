//$(document).ready(function () {
//carga la librería javascript de jquery cuando se carga la página barcos.html por completo
//cuando carga la página html se ejecuta la función: listar()
$(document).ready(function () {
    //configura el aspecto inicial de la pagina
    estadoInicial();
    //ejecuta función para enviar petición al ws
    listar();

    //si hizo clic en el enlace de cerrar sesion
    $("#cerrarSession").click(function (){
        sessionStorage.removeItem("user");
        location.href="index.html"
    });

    $("#identification").click(function (){
        $("#mensaje").html("");
        $("#alerta").hide(500);
    });
    $("#name").click(function (){
        $("#mensaje").html("");
        $("#alerta").hide(500);    
    });
    $("#category").click(function (){
        $("#mensaje").html("");
        $("#alerta").hide(500);
    });
    $("#objetivo").click(function (){
        $("#mensaje").html("");
        $("#alerta").hide(500);
    });
    $("#description").click(function (){
        $("#mensaje").html("");
        $("#alerta").hide(500);
    });
    $("#availability").click(function (){
        $("#mensaje").html("");
        $("#alerta").hide(500);
    });
    $("#price").click(function (){
        $("#mensaje").html("");
        $("#alerta").hide(500);
    });
    $("#quantity").click(function (){
        $("#mensaje").html("");
        $("#alerta").hide(500);
    });
    $("#photography").click(function (){
        $("#mensaje").html("");
        $("#alerta").hide(500);
    });
});

//Esta función ejecuta la petición asincrona al servidor de Oracle, envia una
//petición al ws de tipo GET
function listar() {
    $.ajax({
        // la URL para la petición (url: "url al recurso o endpoint")
        url: "http://155.248.195.17:8080/api/user/all",
        
        // especifica el tipo de petición http: POST, GET, PUT, DELETE
        type: 'GET',

        // el tipo de información que se espera de respuesta
        dataType: 'json',

        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success: function (respuesta) {
            //recibe el arreglo 'items' de la respuesta a la petición
            listarUsuarios(respuesta);
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

/* 
    Esta función se encarga de recorrer el listado de datos 'items' recibido como parametro,
    construir una tabla html en la variable javascript 'tabla',
    acceder al elemento elemento identificado con el id 'listado'
    y modificar su html agregando el contenido de la variable 'tabla'.
    
*/
function listarUsuarios(items) {
    $("#listado").html("");
    $("#listado").show(500);

    let tabla = `<table class="table table-dark table-hover mt-5">
                <thead>
                  <tr>
                    <th>Identification</th>
                    <th>Nombre</th>
                    <th>Dirección</th>
                    <th>Telefono</th>
                    <th>Email</th>
                    <th>Zona</th>
                    <th>Tipo</th>
                    <th colspan="2">Acciones</th>
                  </tr>`;
    //escribe en la consola del desarrollador para efectos de depuración
    console.log(items);

    //recorrer el arreglo de items de producto para pintarlos en la tabla
    for (let index = 0; index < items.length; index++) {

        let texto = `<strong>Identificación:</strong> ${items[index].identification}</br><strong>Nombre:</strong> ${items[index].name}</br><strong>Email:</strong> ${items[index].email}`;
        let typeUser;

        if (items[index].type=="ADM")
            typeUser="ADMINISTRADOR";
        else if(items[index].type=="ASE")
            typeUser="ASESOR";
        else if(items[index].type=="COORD")
            typeUser="COORDINADOR";
        

        tabla += `<tr>
                  <td>${items[index].identification}</td>
                   <td>${items[index].name}</td>
                   <td>${items[index].address}</td>
                   <td>${items[index].cellPhone}</td>
                   <td>${items[index].email}</td>
                   <td>${items[index].zone}</td>
                   <td>${typeUser}</td>
                   <td><button class="btn btn-outline-primary" onclick="editarRegistro(${items[index].id})">Editar</button></td>
                   <td><button class="btn btn-outline-danger" onclick="mostrarEliminar(${items[index].id},'${texto}')">Borrar</button></td>
                    </td>
                   </tr>`;
    }

    //cierra tabla agregando el tag adecuado
    tabla += `</thead></table>`;

    //accede al elemento con id 'listado' y adiciona la tabla de datos a su html
    $("#listado").html(tabla);

}

function estadoInicial() {
    $("#alerta").hide();
    $("#mensaje").html("");
    $("#nuevo").hide();
    $("#editar").hide();
    $("#listado").show(500);
    $("#nuevoRegistro").show(500)
    $("#eliminar").hide();
    $("#idDelete").hide();

    //limpia el contenido de los campos del formulario nuevo
    $("#identification").val("");
    $("#name").val("");
    $("#category").val("");
    $("#objetivo").val("");
    $("#description").val("");
    $("#availability").val("");
    $("#price").val("");
    $("#quantity").val("");
    $("#photography").val("");

    let user = sessionStorage.getItem("user");
    let userJS;
    let typeUser;

    if (user == null) location.href = "index.html";
    else {
        userJS = JSON.parse(user);

        if (userJS.type == 'ADM')
            typeUser = "ADMINISTRADOR";
        else location.href = "index.html";
    }
    $("#userName").html(userJS.name);
    $("#userEmail").html(userJS.email);
    $("#userType").html(typeUser);
    $("#titulo").html("Bienvenido(a): " + userJS.name);
}