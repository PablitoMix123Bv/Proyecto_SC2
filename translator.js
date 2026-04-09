import "./node_modules/microsoft-cognitiveservices-speech-sdk/distrib/browser/microsoft.cognitiveservices.speech.sdk.bundle.js";

const sdk = window.SpeechSDK;

export const prepararConfiguracionTraduccion = (configBase, idiomaDestino) => { //Recibimos los parametros de configuracion base (API key/region) además del idioma al que será traducido.
    //Generamos el objeto de configuración base (key/region)
    const translationConfig = sdk.SpeechTranslationConfig.fromSubscription(configBase.apiKey, configBase.region);

    //Español Méxicano como idioma de entrada o de reconocimiento
    translationConfig.speechRecognitionLanguage = "es-MX";

    //Apllicamos la traducción del lenguaje de origen al idioma de destino
    translationConfig.addTargetLanguage(idiomaDestino);
    
    return translationConfig;
}
