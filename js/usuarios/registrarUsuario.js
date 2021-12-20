/**
 * Configura el aspecto de la página para ingresar un nuevo registro
 */
function activaNuevo() {
    $("#nuevo").show(500);
    $("#identification").focus();
    $("#editar").hide();
    $("#nuevoRegistro").hide(500)
    $("#listado").hide(500);
    $("#availability option[value=true]").attr("selected",true);
}

/**
 * Esta función ejecuta la petición asincrona al servidor, envia una
 * petición al ws de tipo POST para insertar un producto
 */
function registrar() {

    let birthday= $("#birthtDay").val();
    let position = birthday.indexOf("-");
    let monthBirthtDay = birthday.substring(position+1,position+3)
    
    //crea un objeto javascript
    let datos = {
        identification: $("#identification").val(),
        name: $("#name").val(),
        birthtDay: $("#birthtDay").val(),
        monthBirthtDay:monthBirthtDay,
        address: $("#address").val(),
        cellPhone: $("#cellPhone").val(),
        email: $("#email").val(),
        password: $("#password").val(),
        zone: $("#zone").val(),
        type: $("#type").val()
    }

    if (validar()) {

        //convierte el objeto javascript a json antes de agregarlo a los datos de la petición
        let datosPeticion = JSON.stringify(datos);

        $.ajax({
            // la URL para la petición (url: "url al recurso o endpoint")
            url: "http://155.248.195.17:8080/api/user/new",
            // la información a enviar
            // (también es posible utilizar una cadena de datos)
            //si el metodo del servicio recibe datos, es necesario definir el parametro adicional
            data: datosPeticion,

            // especifica el tipo de petición http: POST, GET, PUT, DELETE
            type: 'POST',

            contentType: "application/JSON",

            // el tipo de información que se espera de respuesta
            //dataType: 'json',

            // código a ejecutar si la petición es satisfactoria;
            // la respuesta es pasada como argumento a la función
            success: function (respuesta) {
                //escribe en la consola del desarrollador para efectos de depuración
                console.table(respuesta);
                Swal.fire('Registro ingresado correctamente...');
                listar();
                estadoInicial();
            },

            // código a ejecutar si la petición falla;
            // son pasados como argumentos a la función
            // el objeto de la petición en crudo y código de estatus de la petición
            error: function (xhr, status) {
                $("#mensajes").show(1000);
                $("#mensajes").html("Error peticion POST..." + status);
            }
        });
    }
}