document
  .getElementById("translate-btn")
  .addEventListener("click", translateText);
document.getElementById("mic-btn").addEventListener("click", showModal);
document.getElementById("speak-btn").addEventListener("click", speakOutput);
document.getElementById("closeModal").addEventListener("click", closeModal);

function translateText() {
  const fromLang = document.getElementById("from-language").value;
  const toLang = document.getElementById("to-language").value;
  const inputText = document.getElementById("input-text").value.toLowerCase(); // Normalize input

  let translatedText = "";

  // Simulate some predefined translations
  const translations = {
    hello: {
      en: "Hello",
      fr: "Bonjour",
      es: "Hola",
      de: "Hallo",
    },
    goodbye: {
      en: "Goodbye",
      fr: "Au revoir",
      es: "Adiós",
      de: "Auf Wiedersehen",
    },
    "thank you": {
      en: "Thank you",
      fr: "Merci",
      es: "Gracias",
      de: "Danke",
    },
    yes: {
      en: "Yes",
      fr: "Oui",
      es: "Sí",
      de: "Ja",
    },
    no: {
      en: "No",
      fr: "Non",
      es: "No",
      de: "Nein",
    },
    please: {
      en: "Please",
      fr: "S'il vous plaît",
      es: "Por favor",
      de: "Bitte",
    },
    sorry: {
      en: "Sorry",
      fr: "Désolé",
      es: "Lo siento",
      de: "Entschuldigung",
    },
    "excuse me": {
      en: "Excuse me",
      fr: "Excusez-moi",
      es: "Perdón",
      de: "Entschuldigen Sie",
    },
    "how are you": {
      en: "How are you?",
      fr: "Comment ça va?",
      es: "¿Cómo estás?",
      de: "Wie geht's?",
    },
    "i am fine": {
      en: "I am fine",
      fr: "Je vais bien",
      es: "Estoy bien",
      de: "Mir geht's gut",
    },
    "what is your name": {
      en: "What is your name?",
      fr: "Comment vous appelez-vous?",
      es: "¿Cómo te llamas?",
      de: "Wie heißt du?",
    },
    "my name is": {
      en: "My name is",
      fr: "Je m'appelle",
      es: "Me llamo",
      de: "Ich heiße",
    },
    "i don't understand": {
      en: "I don't understand",
      fr: "Je ne comprends pas",
      es: "No entiendo",
      de: "Ich verstehe nicht",
    },
    "do you speak english": {
      en: "Do you speak English?",
      fr: "Parlez-vous anglais?",
      es: "¿Hablas inglés?",
      de: "Sprechen Sie Englisch?",
    },
    "where is the bathroom": {
      en: "Where is the bathroom?",
      fr: "Où sont les toilettes?",
      es: "¿Dónde está el baño?",
      de: "Wo ist die Toilette?",
    },
    "how much is this": {
      en: "How much is this?",
      fr: "Combien ça coûte?",
      es: "¿Cuánto cuesta esto?",
      de: "Wie viel kostet das?",
    },
    "i love you": {
      en: "I love you",
      fr: "Je t'aime",
      es: "Te quiero",
      de: "Ich liebe dich",
    },
    "help me": {
      en: "Help me",
      fr: "Aidez-moi",
      es: "Ayúdame",
      de: "Hilf mir",
    },
    "good morning": {
      en: "Good morning",
      fr: "Bonjour",
      es: "Buenos días",
      de: "Guten Morgen",
    },
    "good night": {
      en: "Good night",
      fr: "Bonne nuit",
      es: "Buenas noches",
      de: "Gute Nacht",
    },
    "see you later": {
      en: "See you later",
      fr: "À plus tard",
      es: "Hasta luego",
      de: "Bis später",
    },
    "where are you from": {
      en: "Where are you from?",
      fr: "D'où venez-vous?",
      es: "¿De dónde eres?",
      de: "Woher kommst du?",
    },
    "i am from": {
      en: "I am from",
      fr: "Je viens de",
      es: "Soy de",
      de: "Ich komme aus",
    },
    "what time is it": {
      en: "What time is it?",
      fr: "Quelle heure est-il?",
      es: "¿Qué hora es?",
      de: "Wie spät ist es?",
    },
    "can you help me": {
      en: "Can you help me?",
      fr: "Pouvez-vous m'aider?",
      es: "¿Puedes ayudarme?",
      de: "Können Sie mir helfen?",
    },
    "i am lost": {
      en: "I am lost",
      fr: "Je suis perdu",
      es: "Estoy perdido",
      de: "Ich habe mich verlaufen",
    },
    "do you understand": {
      en: "Do you understand?",
      fr: "Comprenez-vous?",
      es: "¿Entiendes?",
      de: "Verstehst du?",
    },
    "what is this": {
      en: "What is this?",
      fr: "Qu'est-ce que c'est?",
      es: "¿Qué es esto?",
      de: "Was ist das?",
    },
    "i am hungry": {
      en: "I am hungry",
      fr: "J'ai faim",
      es: "Tengo hambre",
      de: "Ich habe Hunger",
    },
    "i am thirsty": {
      en: "I am thirsty",
      fr: "J'ai soif",
      es: "Tengo sed",
      de: "Ich habe Durst",
    },
    "where is the restaurant": {
      en: "Where is the restaurant?",
      fr: "Où est le restaurant?",
      es: "¿Dónde está el restaurante?",
      de: "Wo ist das Restaurant?",
    },
    "what is the weather like": {
      en: "What is the weather like?",
      fr: "Quel temps fait-il?",
      es: "¿Qué tiempo hace?",
      de: "Wie ist das Wetter?",
    },
    "can i have the bill": {
      en: "Can I have the bill?",
      fr: "L'addition, s'il vous plaît",
      es: "La cuenta, por favor",
      de: "Kann ich die Rechnung haben?",
    },
  };

  // Translate if available
  if (translations[inputText] && translations[inputText][toLang]) {
    translatedText = translations[inputText][toLang];
  } else {
    translatedText = "Translation not available";
  }

  document.getElementById("output-text").value = translatedText;
}

// Show modal for mic button
function showModal() {
  const modal = document.getElementById("voiceModal");
  modal.style.display = "block";
}

// Close modal
function closeModal() {
  const modal = document.getElementById("voiceModal");
  modal.style.display = "none";
}

// Simulate speak output
function speakOutput() {
  alert("Voice output activated!");
}
