import {AZURE_CONFIG} from "./config.js";
import { obtenerMicrofono } from "./transcriber.js";
import { prepararConfiguracionTraduccion } from "./translator.js";
//Importación del sdk para navegador
import "./node_modules/microsoft-cognitiveservices-speech-sdk/distrib/browser/microsoft.cognitiveservices.speech.sdk.bundle.js";
const sdk = window.SpeechSDK;

//Dentro de este archivo ira todo el acoplamiento de las diferentes funciones que tenemos

const realizarTraduccion = async () => {
    //Obtenemos el idioma que el usaurio haya seleccionado desde la interfaz
    const idiomaDestino = document.getElementById("lang-select").value;
    //Enviamos los argumentos a la función preparar configuración
    const configTraduccion = prepararConfiguracionTraduccion(AZURE_CONFIG, idiomaDestino);
    //Configuración del micrófono
    const AudioConfig = obtenerMicrofono();
    //Acoplamiento
    const recognizer = new sdk.TranslationRecognizer(configTraduccion, AudioConfig);

    console.log("Habla para traducir...");
    //Usamos recognizeOnceAsync para capturar una sola frase
    recognizer.recognizeOnceAsync( result => {
        if(result.reason === sdk.ResultReason.TranslatedSpeech){
            //Impresión del texto en español
            document.getElementById("txt-spanish").value = result.text;
            //Impresión de la traducción
            //'result.translations' es un mapa que tiene el texto en el idioma destino.
            document.getElementById("txt-translated").value  = result.translations.get(idiomaDestino);
        }
        recognizer.close();
    });
};

const btnHablar = document.getElementById("btn-speak");

//Asignación al envento click
btnHablar.addEventListener("click", () => {
    realizarTraduccion();
});