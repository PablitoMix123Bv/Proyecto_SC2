import "./node_modules/microsoft-cognitiveservices-speech-sdk/distrib/browser/microsoft.cognitiveservices.speech.sdk.bundle.js";
const sdk = window.SpeechSDK;

// Mapa de idioma de traducción a voz disponible en Azure
const VOCES_POR_IDIOMA = {
    "en-US": "en-US-JennyNeural",
    "fr-FR": "fr-FR-DeniseNeural",
    "el-GR": "el-GR-AthinaNeural",
    "zh-TW": "zh-TW-HsiaoChenNeural",
    "pt-BR": "pt-BR-FranciscaNeural",
    "it-IT": "it-IT-ElsaNeural",
    "de-DE": "de-DE-KatjaNeural",
    "ja-JP": "ja-JP-NanamiNeural",
    "ko-KR": "ko-KR-SunHiNeural",
    "ar-EG": "ar-EG-SalmaNeural",
    "ru-RU": "ru-RU-SvetlanaNeural"
};

export const reproducirTraduccion = (configBase, texto, idiomaDestino) => {
    const voz = VOCES_POR_IDIOMA[idiomaDestino] || idiomaDestino;

    const speechConfig = sdk.SpeechConfig.fromSubscription(configBase.apiKey, configBase.region);
    speechConfig.speechSynthesisVoiceName = voz;

    const synthesizer = new sdk.SpeechSynthesizer(speechConfig);

    synthesizer.speakTextAsync(
        texto,
        result => {
            if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
                console.log("Audio reproducido correctamente");
            }
            synthesizer.close();
        },
        error => {
            console.error("Error al reproducir:", error);
            synthesizer.close();
        }
    );
};