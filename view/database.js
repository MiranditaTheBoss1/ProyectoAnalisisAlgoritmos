// Importe de los metodos del servicio de base de datos firestore de firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getFirestore, 
        collection ,
        addDoc,
        getDocs,
} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//Conexion con el servicio de firesbase
const firebaseConfig = {
  apiKey: "AIzaSyDRptiiscxqAVDYEUNA47rNpMd4C1MZYEY",
  authDomain: "analisis-de-algoritmos-cc10a.firebaseapp.com",
  projectId: "analisis-de-algoritmos-cc10a",
  storageBucket: "analisis-de-algoritmos-cc10a.appspot.com",
  messagingSenderId: "671520544494",
  appId: "1:671520544494:web:adf711fb6ad3082b73c5ff",
  measurementId: "G-7K1LTXMBNM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

//Metodo para guardar todos los datos a la base de datos
export const guardarRespuesta = (nombre,respuesta1,respuesta2,respuesta3,respuesta4,respuesta5,puntajeNivel1,puntajeNivel2,puntajeNivel3,puntajeNivel4,puntajeNivel5,intentosNivel1,intentosNivel2,intentosNivel3,intentosNivel4,intentosNivel5) =>
    addDoc(collection(db,'Encuestas'),{nombre,respuesta1,respuesta2,respuesta3,respuesta4,respuesta5,puntajeNivel1,puntajeNivel2,puntajeNivel3,puntajeNivel4,puntajeNivel5,intentosNivel1,intentosNivel2,intentosNivel3,intentosNivel4,intentosNivel5});

//Metodo para conseguir los datos de la base de datos
export const getRespuestas = () => getDocs(collection(db,'Encuestas'))



