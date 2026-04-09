import "./node_modules/microsoft-cognitiveservices-speech-sdk/distrib/browser/microsoft.cognitiveservices.speech.sdk.bundle.js";
const sdk = window.SpeechSDK;
//Configuración de la entrada de audio (Micrófono)

export const obtenerMicrofono = () => {
    return sdk.AudioConfig.fromDefaultMicrophoneInput();
}