import "./node_modules/microsoft-cognitiveservices-speech-sdk/distrib/browser/microsoft.cognitiveservices.speech.sdk.bundle.js";

const sdk = window.SpeechSDK;

export const prepararConfiguracionTraduccion = (configBase, idiomas) => {
    //Generamos el objeto de configuración base (key/region)
    const translationConfig = sdk.SpeechTranslationConfig.fromSubscription(configBase.apiKey, configBase.region);

    //Español Méxicano como idioma de entrada o de reconocimiento
    translationConfig.speechRecognitionLanguage = "es-MX";

    // Recibe un array de idiomas y los agrega todos
    idiomas.forEach(idioma => translationConfig.addTargetLanguage(idioma));

    return translationConfig;
};


