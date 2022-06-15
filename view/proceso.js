import { guardarRespuesta, getRespuestas } from './database.js'

export { array };

//Busca en el html la etiqueta con id 'coeficiente' la cual pregunta que nivel y que pregunta hacerle coeficiente de correlacion
var encuesta = document.getElementById('coeficiente');

//Array con los registros del juego
var array = new Array();

//Variables que guardara el promedio de cada pregunta de satisfacción
var promedioPrimeraPregunta = 0;
var promedioSegundaPregunta = 0;
var promedioTerceraPregunta = 0;
var promedioCuartaPregunta = 0;
var promedioQuintaPregunta = 0;

//Variables que guardara el promedio de cada nivel del test
var promedioPuntajeTest1 = 0;
var promedioPuntajeTest2 = 0;
var promedioPuntajeTest3 = 0;
var promedioPuntajeTest4 = 0;
var promedioPuntajeTest5 = 0;

//Variables que guardara el promedio de intentos por nivel
var promedioIntentosNivel1 = 0;
var promedioIntentosNivel2 = 0;
var promedioIntentosNivel3 = 0;
var promedioIntentosNivel4 = 0;
var promedioIntentosNivel5 = 0;

//Variables que guardara la cantidad de fallos por nivel
var cantidadFallosNivel1 = 0;
var cantidadFallosNivel2 = 0;
var cantidadFallosNivel3 = 0;
var cantidadFallosNivel4 = 0;
var cantidadFallosNivel5 = 0;

//Un metodo que espera cuando se presione el botón de calcular coeficiente
encuesta.addEventListener('submit', (e) => {

    var nivel = encuesta['nivel'];
    var nivelito = nivel.options[nivel.selectedIndex].value

    var pregunta = encuesta['pregunta'];
    var preguntita = pregunta.options[pregunta.selectedIndex].value

    var arrayNiveles = new Array();
    var arrayPreguntas = new Array();

    console.log("Eligio: " + nivelito);
    console.log("Eligio: " + preguntita);

    var mediaNivel = 0;
    if (nivelito == 1) {
        for (var i = 0; i < array.length; i++) {
            mediaNivel += parseFloat(array[i].puntajeNivel1);
            arrayNiveles.push(array[i].puntajeNivel1);
        }
    }
    if (nivelito == 2) {
        for (var i = 0; i < array.length; i++) {
            mediaNivel += parseFloat(array[i].puntajeNivel2);
            arrayNiveles.push(array[i].puntajeNivel2);
        }
    }
    if (nivelito == 3) {
        for (var i = 0; i < array.length; i++) {
            mediaNivel += parseFloat(array[i].puntajeNivel3);
            arrayNiveles.push(array[i].puntajeNivel3);
        }
    }
    if (nivelito == 4) {
        for (var i = 0; i < array.length; i++) {
            mediaNivel += parseFloat(array[i].puntajeNivel4);
            arrayNiveles.push(array[i].puntajeNivel4);
        }
    }
    if (nivelito == 5) {
        for (var i = 0; i < array.length; i++) {
            mediaNivel += parseFloat(array[i].puntajeNivel5);
            arrayNiveles.push(array[i].puntajeNivel5);
        }
    }
    mediaNivel /= arrayNiveles.length;
    console.log(mediaNivel);

    var mediaPregunta = 0;
    if (preguntita == 1) {
        for (var i = 0; i < array.length; i++) {
            mediaPregunta += parseFloat(array[i].respuesta1);
            arrayPreguntas.push(array[i].respuesta1);
        }
    }
    if (preguntita == 2) {
        for (var i = 0; i < array.length; i++) {
            mediaPregunta += parseFloat(array[i].respuesta2);
            arrayPreguntas.push(array[i].respuesta2);
        }
    }
    if (preguntita == 3) {
        for (var i = 0; i < array.length; i++) {
            mediaPregunta += parseFloat(array[i].respuesta3);
            arrayPreguntas.push(array[i].respuesta3);
        }
    }
    if (preguntita == 4) {
        for (var i = 0; i < array.length; i++) {
            mediaPregunta += parseFloat(array[i].respuesta4);
            arrayPreguntas.push(array[i].respuesta4);
        }
    }
    if (preguntita == 5) {
        for (var i = 0; i < array.length; i++) {
            mediaPregunta += parseFloat(array[i].respuesta5);
            arrayPreguntas.push(array[i].respuesta5);
        }
    }
    mediaPregunta /= arrayPreguntas.length;
    console.log(mediaPregunta);

    var sumatoria = 0;
    for (var i = 0; i < arrayNiveles.length; i++) {
        sumatoria += ((parseFloat(arrayNiveles[i]) - mediaNivel) * (parseFloat(arrayPreguntas[i]) - mediaPregunta));
    }

    var totalX = 0;
    for (var i = 0; i < arrayNiveles.length; i++) {
        totalX += Math.pow(parseFloat(arrayNiveles[i] - mediaNivel), 2);
    }
    totalX = Math.sqrt(totalX);

    var totalY = 0;
    for (var i = 0; i < arrayPreguntas.length; i++) {
        totalY += Math.pow(parseFloat(arrayPreguntas[i] - mediaPregunta), 2);
    }
    totalY = Math.sqrt(totalY);

    var resultado = sumatoria / (totalX * totalY);

    console.log("Sx: " + totalX);
    console.log("Sy: " + totalY);

    swal("Coeficiente de correlación", "" + resultado, "success");
    document.getElementById('resultado').innerHTML = "El coeficiente de correlación es de: " + resultado;
    e.preventDefault()
});

//Esto se ejecuta al importar el script y carga todos los datos de los usuarios, promedios que esten guardasos
window.addEventListener('DOMContentLoaded', async() => {
    const encuestas = await getRespuestas()

    encuestas.forEach(doc => {
        array.push(doc.data());
        console.log(doc.data());
    })

    for (var i = 0; i < array.length; i++) {
        con.innerHTML = con.innerHTML +
            '<td>' + array[i].nombre + '</td>' +

            '<td>' + array[i].intentosNivel1 + '</td>' +
            '<td>' + array[i].intentosNivel2 + '</td>' +
            '<td>' + array[i].intentosNivel3 + '</td>' +
            '<td>' + array[i].intentosNivel4 + '</td>' +
            '<td>' + array[i].intentosNivel5 + '</td>' +

            '<td>' + array[i].puntajeNivel1 + '</td>' +
            '<td>' + array[i].puntajeNivel2 + '</td>' +
            '<td>' + array[i].puntajeNivel3 + '</td>' +
            '<td>' + array[i].puntajeNivel4 + '</td>' +
            '<td>' + array[i].puntajeNivel5 + '</td>' +

            '<td>' + (Number(array[i].puntajeNivel1) + Number(array[i].puntajeNivel2) + Number(array[i].puntajeNivel3) + Number(array[i].puntajeNivel4) + Number(array[i].puntajeNivel5)) + '</td>' +

            '<td>' + array[i].respuesta1 + '</td>' +
            '<td>' + array[i].respuesta2 + '</td>' +
            '<td>' + array[i].respuesta3 + '</td>' +
            '<td>' + array[i].respuesta4 + '</td>' +
            '<td>' + array[i].respuesta5 + '</td>';

        promedioPrimeraPregunta += Number(array[i].respuesta1);
        promedioSegundaPregunta += Number(array[i].respuesta2);
        promedioTerceraPregunta += Number(array[i].respuesta3);
        promedioCuartaPregunta += Number(array[i].respuesta4);
        promedioQuintaPregunta += Number(array[i].respuesta5);

        promedioPuntajeTest1 += Number(array[i].puntajeNivel1);
        promedioPuntajeTest2 += Number(array[i].puntajeNivel2);
        promedioPuntajeTest3 += Number(array[i].puntajeNivel3);
        promedioPuntajeTest4 += Number(array[i].puntajeNivel4);
        promedioPuntajeTest5 += Number(array[i].puntajeNivel5);

        promedioIntentosNivel1 += Number(array[i].intentosNivel1);
        promedioIntentosNivel2 += Number(array[i].intentosNivel2);
        promedioIntentosNivel3 += Number(array[i].intentosNivel3);
        promedioIntentosNivel4 += Number(array[i].intentosNivel4);
        promedioIntentosNivel5 += Number(array[i].intentosNivel5);

        cantidadFallosNivel1 += Number(array[i].intentosNivel1) - 1;
        cantidadFallosNivel2 += Number(array[i].intentosNivel2) - 1;
        cantidadFallosNivel3 += Number(array[i].intentosNivel3) - 1;
        cantidadFallosNivel4 += Number(array[i].intentosNivel4) - 1;
        cantidadFallosNivel5 += Number(array[i].intentosNivel5) - 1;

    }

    promedioPrimeraPregunta /= array.length;
    promedioSegundaPregunta /= array.length;
    promedioTerceraPregunta /= array.length;
    promedioCuartaPregunta /= array.length;
    promedioQuintaPregunta /= array.length;

    promedioPuntajeTest1 /= array.length;
    promedioPuntajeTest2 /= array.length;
    promedioPuntajeTest3 /= array.length;
    promedioPuntajeTest4 /= array.length;
    promedioPuntajeTest5 /= array.length;

    promedioIntentosNivel1 /= array.length;
    promedioIntentosNivel2 /= array.length;
    promedioIntentosNivel3 /= array.length;
    promedioIntentosNivel4 /= array.length;
    promedioIntentosNivel5 /= array.length;

    document.getElementById("promedioCadaPreguntaTest").innerHTML = "Promedio global de puntaje para el primer nivel: " + promedioPuntajeTest1 +
        "<br/> Promedio global de puntaje para el segundo nivel: " + promedioPuntajeTest2 +
        "<br/> Promedio global de puntaje para el tercer nivel: " + promedioPuntajeTest3 +
        "<br/> Promedio global de puntaje para el cuarto nivel: " + promedioPuntajeTest4 +
        "<br/> Promedio global de puntaje para el quinto nivel: " + promedioPuntajeTest5;

    document.getElementById("promedioIntentosTest").innerHTML = "Promedio global de intentos para el primer nivel: " + promedioIntentosNivel1 +
        "<br/> Promedio global de intentos para el segundo nivel: " + promedioIntentosNivel2 +
        "<br/> Promedio global de intentos para el tercer nivel: " + promedioIntentosNivel3 +
        "<br/> Promedio global de intentos para el cuarto nivel: " + promedioIntentosNivel4 +
        "<br/> Promedio global de intentos para el quinto nivel: " + promedioIntentosNivel5;

    document.getElementById("promedioCadaPreguntaOpinion").innerHTML = "Promedio global para la primera pregúnta: " + promedioPrimeraPregunta +
        "<br/> Promedio global para la segunda pregúnta  : " + promedioSegundaPregunta +
        "<br/> Promedio global para la tercera pregúnta  : " + promedioTerceraPregunta +
        "<br/> Promedio global para la cuarta pregúnta  : " + promedioCuartaPregunta +
        "<br/> Promedio global para la quinta pregúnta  : " + promedioQuintaPregunta;

    document.getElementById("cantidadFallosPorNivel").innerHTML = "Total de errores en el nivel 1: " + cantidadFallosNivel1 +
        "<br/> Total de errores en el nivel 2: " + cantidadFallosNivel2 +
        "<br/> Total de errores en el nivel 3: " + cantidadFallosNivel3 +
        "<br/> Total de errores en el nivel 4: " + cantidadFallosNivel4 +
        "<br/> Total de errores en el nivel 5: " + cantidadFallosNivel5;


    ordenarArrayPuntajeMayorMenor();

    for (var i = 0; i < array.length; i++) {
        conOrdenado.innerHTML = conOrdenado.innerHTML +
            '<td>' + array[i].nombre + '</td>' +
            '<td>' + array[i].puntajeNivel1 + '</td>' +
            '<td>' + array[i].puntajeNivel2 + '</td>' +
            '<td>' + array[i].puntajeNivel3 + '</td>' +
            '<td>' + array[i].puntajeNivel4 + '</td>' +
            '<td>' + array[i].puntajeNivel5 + '</td>' +

            '<td>' + (Number(array[i].puntajeNivel1) + Number(array[i].puntajeNivel2) + Number(array[i].puntajeNivel3) + Number(array[i].puntajeNivel4) + Number(array[i].puntajeNivel5)) + '</td>';
    }

    ordenarArrayPuntajeMenorMayor();

    for (var i = 0; i < array.length; i++) {
        conOrdenadoMenor.innerHTML = conOrdenadoMenor.innerHTML +
            '<td>' + array[i].nombre + '</td>' +
            '<td>' + array[i].puntajeNivel1 + '</td>' +
            '<td>' + array[i].puntajeNivel2 + '</td>' +
            '<td>' + array[i].puntajeNivel3 + '</td>' +
            '<td>' + array[i].puntajeNivel4 + '</td>' +
            '<td>' + array[i].puntajeNivel5 + '</td>' +

            '<td>' + (Number(array[i].puntajeNivel1) + Number(array[i].puntajeNivel2) + Number(array[i].puntajeNivel3) + Number(array[i].puntajeNivel4) + Number(array[i].puntajeNivel5)) + '</td>';
    }


});

//Metodo de ordenamiento de mayor a menor
function ordenarArrayPuntajeMayorMenor() {
    for (var j = 1; j < array.length; j++) {
        for (var i = 0; i < array.length - 1; i++) {

            var cantidadI = Number(array[i].puntajeNivel1) + Number(array[i].puntajeNivel2) + Number(array[i].puntajeNivel3) + Number(array[i].puntajeNivel4) + Number(array[i].puntajeNivel5);
            var cantidadI2 = Number(array[i + 1].puntajeNivel1) + Number(array[i + 1].puntajeNivel2) + Number(array[i + 1].puntajeNivel3) + Number(array[i + 1].puntajeNivel4) + Number(array[i + 1].puntajeNivel5)
            if (cantidadI < cantidadI2) {

                var temp = array[i];
                array[i] = array[i + 1];
                array[i + 1] = temp;
            }
        }
    }
}

//Metodo de ordenamiento de menor a mayor
function ordenarArrayPuntajeMenorMayor() {
    for (var j = 1; j < array.length; j++) {
        for (var i = 0; i < array.length - 1; i++) {

            var cantidadI = Number(array[i].puntajeNivel1) + Number(array[i].puntajeNivel2) + Number(array[i].puntajeNivel3) + Number(array[i].puntajeNivel4) + Number(array[i].puntajeNivel5);
            var cantidadI2 = Number(array[i + 1].puntajeNivel1) + Number(array[i + 1].puntajeNivel2) + Number(array[i + 1].puntajeNivel3) + Number(array[i + 1].puntajeNivel4) + Number(array[i + 1].puntajeNivel5)
            if (cantidadI > cantidadI2) {

                var temp = array[i];
                array[i] = array[i + 1];
                array[i + 1] = temp;
            }
        }
    }
}