/**
 * Invoca peticion WS GET con parametro (id) para recuperar información del registro
 * y pintar información en el formulario de edición
 */
 function editarRegistro(llaveRegistro) {
    //crea un objeto javascript
    let datos = {
        id: llaveRegistro
    }

    //convierte el objeto javascript a json antes de agregarlo a los datos de la petición
    let datosPeticion = JSON.stringify(datos);

    $.ajax({
        // la URL para la petición (url: "url al recurso o endpoint")
        url: "http://155.248.195.17:8080/api/user/" + llaveRegistro,

        // la información a enviar
        // (también es posible utilizar una cadena de datos)
        //si el metodo del servicio recibe datos, es necesario definir el parametro adicional
        //data: datosPeticion,

        // especifica el tipo de petición http: POST, GET, PUT, DELETE
        type: 'GET',

        contentType: "application/JSON",

        // el tipo de información que se espera de respuesta
        dataType: 'json',

        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success: function (respuesta) {
            //escribe en la consola del desarrollador para efectos de depuración
            console.log(respuesta);
            $("#alerta").show(1000);
            $("#mensaje").html("Información recuperada...");
            $("#alerta").hide(1000);
            editarRespuesta(respuesta);
            activaEditar();
        },

        // código a ejecutar si la petición falla;
        // son pasados como argumentos a la función
        // el objeto de la petición en crudo y código de estatus de la petición
        error: function (xhr, status) {
            $("#alerta").show(500);
            $("#mensaje").html("Error peticion PUT..." + status);
            $("#mensaje").hide(1000);
        }
        
    });
}

/* 
    Esta función se encarga de recorrer el listado de datos 'items' recibido como parametro,
    construir una tabla html en la variable javascript 'tabla',
    acceder al elemento elemento identificado con el id 'listado'
    y modificar su html agregando el contenido de la variable 'tabla'.
    
*/
function editarRespuesta(items) {

    let birthtDay = items.birthtDay;
    birthtDay = birthtDay.substring(0, birthtDay.indexOf("T", birthtDay));

    $("#idEdit").val(items.id);
    $("#identificationEdit").val(items.identification);
    $("#nameEdit").val(items.name);
    $("#birthtDayEdit").val(birthtDay);
    $("#addressEdit").val(items.address);
    $("#cellPhoneEdit").val(items.cellPhone);
    $("#emailEdit").val(items.email);
    $("#passwordEdit").val(items.password);
    $("#zoneEdit").val(items.zone);
    $("#typeEdit").val(items.type);

}

//Esta función ejecuta la petición asincrona al servidor de Oracle, envia una
//petición al ws de tipo PUT
function actualizar() {

    let birthday= $("#birthtDayEdit").val();
    let position = birthday.indexOf("-");
    let monthBirthtDay = birthday.substring(position+1,position+3)

    //crea un objeto javascript
    let datos = {
        id: $("#idEdit").val(),
        identification: $("#identificationEdit").val(),
        name: $("#nameEdit").val(),
        birthtDay: $("#birthtDayEdit").val(),
        monthBirthtDay:monthBirthtDay,
        address: $("#addressEdit").val(),
        cellPhone: $("#cellPhoneEdit").val(),
        email: $("#emailEdit").val(),
        password: $("#passwordEdit").val(),
        zone: $("#zoneEdit").val(),
        type: $("#typeEdit").val()
    }

    //convierte el objeto javascript a json antes de agregarlo a los datos de la petición
    let datosPeticion = JSON.stringify(datos);

    if (validarEditar()) {
        $.ajax({
            // la URL para la petición (url: "url al recurso o endpoint")
            url: "http://155.248.195.17:8080/api/user/update",

            // la información a enviar
            // (también es posible utilizar una cadena de datos)
            //si el metodo del servicio recibe datos, es necesario definir el parametro adicional
            data: datosPeticion,

            // especifica el tipo de petición http: POST, GET, PUT, DELETE
            type: 'PUT',

            contentType: "application/JSON",

            // el tipo de información que se espera de respuesta
            //dataType: 'json',

            // código a ejecutar si la petición es satisfactoria;
            // la respuesta es pasada como argumento a la función
            success: function (respuesta) {
                //escribe en la consola del desarrollador para efectos de depuración
                console.log(respuesta);
                Swal.fire('Registro actualizado correctamente...');
                listar();
                estadoInicial();
            },

            // código a ejecutar si la petición falla;
            // son pasados como argumentos a la función
            // el objeto de la petición en crudo y código de estatus de la petición
            error: function (xhr, status) {
                Swal.fire("Error peticion Post..." + status);
                //$("#mensaje").hide(1000);
            }
        });
    }
}

/**
 * Configura el aspecto de la página para actualizar el registro
 */
function activaEditar() {
    $("#editar").show(500);
    $("#identificationEdit").focus();
    $("#nuevo").hide();
    $("#nuevoRegistro").hide(500)
    $("#listado").hide(500);
}