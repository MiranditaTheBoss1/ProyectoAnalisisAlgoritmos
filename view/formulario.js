 //Importe de metodos de la base de datos
 import { guardarRespuesta, getRespuestas } from './database.js'




 //Metodo de prueba para la conexion a la base de datos
 window.addEventListener('DOMContentLoaded', async() => {
     const encuestas = await getRespuestas()

     encuestas.forEach(doc => {
         console.log(doc.data());
     })

 });

 //Referencia al elemento encuesta del documento html
 const encuesta = document.getElementById('encu');

 /*Este metodo se encarga de administrar el evento del boton de enviar encuestas en la base de datos
 */
 encuesta.addEventListener('submit', (e) => {

     const intentittos = document.getElementById('intentosNivel5');
     var prueba = intentittos.textContent.split(" ");
     if (prueba[1] != "0") {

         e.preventDefault();
         var name = encuesta['name'];
         var pregunta1 = encuesta['pregunta1'];
         var pregunta2 = encuesta['pregunta2'];
         var pregunta3 = encuesta['pregunta3'];
         var pregunta4 = encuesta['pregunta4'];
         var pregunta5 = encuesta['pregunta5'];

         var respuesta1 = pregunta1.options[pregunta1.selectedIndex].value;
         var respuesta2 = pregunta2.options[pregunta2.selectedIndex].value;;
         var respuesta3 = pregunta3.options[pregunta3.selectedIndex].value;;

         var respuesta4 = pregunta4.options[pregunta4.selectedIndex].value;;

         var respuesta5 = pregunta5.options[pregunta5.selectedIndex].value;;


         const puntajeNivel1 = document.getElementById('puntajeNivel1');
         var p1 = puntajeNivel1.textContent.split(" ");
         //console.log(parseInt(p1[8]));



         const puntajeNivel2 = document.getElementById('puntajeNivel2');
         var p2 = puntajeNivel2.textContent.split(" ");
         //console.log(parseInt(p2[8]));

         const puntajeNivel3 = document.getElementById('puntajeNivel3');
         var p3 = puntajeNivel3.textContent.split(" ");
         //console.log(parseInt(p3[8]));


         const puntajeNivel4 = document.getElementById('puntajeNivel4');
         var p4 = puntajeNivel4.textContent.split(" ");
         //console.log(parseInt(p4[8]));


         const puntajeNivel5 = document.getElementById('puntajeNivel5');
         var p5 = puntajeNivel5.textContent.split(" ");
         //console.log(parseInt(p5[8]));


         const intentosNivel1 = document.getElementById('intentosNivel1');
         var i1 = intentosNivel1.textContent.split(" ");
         //console.log(parseInt(i1[1]));

         const intentosNivel2 = document.getElementById('intentosNivel2');
         var i2 = intentosNivel2.textContent.split(" ");
         //console.log(parseInt(i2[1]));

         const intentosNivel3 = document.getElementById('intentosNivel3');
         var i3 = intentosNivel3.textContent.split(" ");
         //console.log(parseInt(i3[1]));

         const intentosNivel4 = document.getElementById('intentosNivel4');
         var i4 = intentosNivel4.textContent.split(" ");
         //console.log(parseInt(i4[1]));

         const intentosNivel5 = document.getElementById('intentosNivel5');
         var i5 = intentosNivel5.textContent.split(" ");


         guardarRespuesta(name.value, respuesta1, respuesta2, respuesta3, respuesta4, respuesta5, p1[8], p2[8], p3[8], p4[8], p5[8], i1[1], i2[1], i3[1], i4[1], i5[1]);
         swal("Encuesta guardada", "Gracias por jugar", "success");
     } else {
         swal("Completa el juego", "Completa el juego para llenar la encuesta", "error");
         e.preventDefault();
     }
 })