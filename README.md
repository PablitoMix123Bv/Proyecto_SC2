# Instalación por Plataforma/Lenguaje (SDK de Voz)
- python: pip install azure-cognitiveservices-speech
- Node.js / JavaScript: npm install microsoft-cognitiveservices-speech-sdk

## 👥 Roles del Proyecto
Para maximizar el aprendizaje, el código se ha dividido en módulos independientes:

Módulo de Transcripción (transcriber.js): Responsabilidad de la Persona 1. Se encarga del flujo de entrada de audio y la captura de voz en el idioma origen (es-MX).

Módulo de Traducción (translator.js): Responsabilidad de la Persona 2 (PablitoMixBv). Gestiona la conexión con el motor de traducción de Azure y la configuración de los idiomas destino (Inglés, Francés, Griego).

Módulo de Síntesis (synthesizer.js): Responsabilidad de la Persona 3. (Isaac) Encargado de tomar el texto traducido y convertirlo en audio para la reproducción final (Fase pendiente).

**El traductor permite traducir del español a 11 diferentes idiomas**

>[!NOTE]
>Mejoras para el módulo de transcripción: manejar errores si el usuario deniega el permiso del micrófono, investigar y aplicar filtros de ruidoo o configuraciones de audio avanzado.

>[!CAUTION]
>Debes renombrar el archivo config.example.js por config.js ya que ahí se almacenan la apikey y la región
