import "./node_modules/microsoft-cognitiveservices-speech-sdk/distrib/browser/microsoft.cognitiveservices.speech.sdk.bundle.js";
const sdk = window.SpeechSDK;
//Configuración de la entrada de audio (Micrófono)

export const obtenerMicrofono = async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: {
                noiseSupression: true,
            echoCancellation: true,
            autoGainControll: true
            }
        });
        return sdk.AudioConfig.fromDefaultMicrophoneInput();
    } catch (error){
        handleMicError(error);
        throw error;
    }
    
}
function handleMicError(error){

    console.error("Error de micrófono:", error);
    let message = "Error desconocido con el micrófono";
    if (
        error.name === "NotAllowedError" ||
        error.name === "PermissionDeniedError"
    ) {
        message = "Acceso a micrófono denegado ";
    } else if (error.name === "NotFoundError") {
        message = "No se encontró el micrófono";
    } else if (error.name === "NotReadableError") {
        message = "El micrófono está en uso";
    }

    alert(message);
}