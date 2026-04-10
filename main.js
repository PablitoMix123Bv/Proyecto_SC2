import { AZURE_CONFIG } from "./config.js";
import { obtenerMicrofono } from "./transcriber.js";
import { prepararConfiguracionTraduccion } from "./translator.js";
import { reproducirTraduccion } from "./synthesizer.js";
import "./node_modules/microsoft-cognitiveservices-speech-sdk/distrib/browser/microsoft.cognitiveservices.speech.sdk.bundle.js";
const sdk = window.SpeechSDK;

// Lista de todos los idiomas disponibles (deben coincidir con los values del select)
const IDIOMAS_DISPONIBLES = ["en-US", "fr-FR", "el-GR", "zh-TW", "pt-BR", "it-IT", "de-DE", "ja-JP", "ko-KR", "ar-EG", "ru-RU"];

let recognizer = null;
let escuchando = false;
let traduccionesGuardadas = {}; // Aquíse guardan todas las traducciones, agregue algunos idiomas mas

const btnHablar = document.getElementById("btn-speak");
const langSelect = document.getElementById("lang-select");
const btnPlay = document.getElementById("btn-play");

// Cuando el usuario cambia el idioma, muestra la traducción guardada
langSelect.addEventListener("change", () => {
    const idiomaSeleccionado = langSelect.value;
    if (traduccionesGuardadas[idiomaSeleccionado]) {
        document.getElementById("txt-translated").value = traduccionesGuardadas[idiomaSeleccionado];
    }
});

btnHablar.addEventListener("click", () => {
    if (!escuchando) {
        iniciarEscucha();
    } else {
        detenerEscucha();
    }
});

btnPlay.addEventListener("click", () => {
    const texto = document.getElementById("txt-translated").value;
    const idiomaDestino = document.getElementById("lang-select").value;

    if (!texto) {
        alert("No hay texto traducido para reproducir");
        return;
    }

    reproducirTraduccion(AZURE_CONFIG, texto, idiomaDestino);
});

const iniciarEscucha = () => {
    // Pasamos todos los idiomas disponibles
    const configTraduccion = prepararConfiguracionTraduccion(AZURE_CONFIG, IDIOMAS_DISPONIBLES);
    const AudioConfig = obtenerMicrofono();

    recognizer = new sdk.TranslationRecognizer(configTraduccion, AudioConfig);

    recognizer.recognizing = (s, e) => {
        if (e.result.reason === sdk.ResultReason.TranslatingSpeech) {
            const idiomaActual = langSelect.value;
            document.getElementById("txt-spanish").value = e.result.text;
            // Muestra en vivo solo el idioma seleccionado actualmente
            document.getElementById("txt-translated").value = e.result.translations.get(idiomaActual) || "";
        }
    };

    recognizer.recognized = (s, e) => {
        if (e.result.reason === sdk.ResultReason.TranslatedSpeech) {
            const idiomaActual = langSelect.value;
            document.getElementById("txt-spanish").value = e.result.text;

            // Guardamos TODAS las traducciones recibidas
            IDIOMAS_DISPONIBLES.forEach(idioma => {
                const traduccion = e.result.translations.get(idioma);
                if (traduccion) {
                    traduccionesGuardadas[idioma] = traduccion;
                }
            });

            // Mostramos la del idioma actualmente seleccionado
            document.getElementById("txt-translated").value = traduccionesGuardadas[idiomaActual] || "";
        }
    };

    recognizer.startContinuousRecognitionAsync();
    escuchando = true;
    btnHablar.textContent = "Detener";
    btnHablar.style.backgroundColor = "#555";
};

const detenerEscucha = () => {
    if (recognizer) {
        recognizer.stopContinuousRecognitionAsync(() => {
            recognizer.close();
            recognizer = null;
        });
    }
    escuchando = false;
    btnHablar.textContent = "Hablar";
    btnHablar.style.backgroundColor = "";
};