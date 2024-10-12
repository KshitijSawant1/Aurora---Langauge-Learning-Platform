window.onload = function () {
  loadTimeline("English"); // Load English by default
};

let radarData = {
  Vocabulary: 0,
  Grammar: 0,
  Reading: 0,
  Speaking: 0,
  Listening: 0,
};

function loadTimeline(language) {
  const timeline = document.getElementById("timeline");
  let content = "";

  switch (language) {
    case "English":
      content = generateTimelineContent(language, [
        "Understand Basic Greetings and Introductions",
        "Learn the Alphabet and Pronunciation",
        "Understand Basic Grammar Concepts",
        "Learn Common Vocabulary",
        "Practice Simple Sentences",
        "Learn to Use Articles (A, An, The)",
        "Learn Present Tense Verbs",
        "Practice Question Words",
        "Learn Basic Conjunctions and Prepositions",
        "Master Plurals and Countable/Uncountable Nouns",
        "Understand Verb Conjugation in Past and Future",
        "Learn Pronouns and Possessives",
        "Focus on Listening Skills",
        "Practice Writing Short Paragraphs",
        "Learn English Idioms and Phrasal Verbs",
        "Practice Conversation and Speaking",
        "Understand Tenses and Complex Grammar",
        "Learn Advanced Vocabulary and Expressions",
        "Improve Reading Skills",
        "Consistent Practice and Immersion",
      ]);
      break;
    case "French":
      content = generateTimelineContent(language, [
        "Comprendre les salutations et les présentations de base",
        "Apprendre l'alphabet et la prononciation",
        "Comprendre les concepts de base de la grammaire",
        "Apprendre le vocabulaire commun",
        "Pratiquez des phrases simples",
        "Apprenez à utiliser les articles (A, An, The)",
        "Apprendre les verbes au présent",
        "Mots de questions pratiques",
        "Apprendre les conjonctions et prépositions de base",
        "Maîtres pluriels et noms dénombrables/indénombrables",
        "Comprendre la conjugaison des verbes au passé et au futur",
        "Apprendre les pronoms et les possessifs",
        "Concentrez-vous sur les capacités d'écoute",
        "Entraînez-vous à rédiger des paragraphes courts",
        "Apprendre les expressions idiomatiques et les verbes à particule anglais",
        "Pratiquer la conversation et la parole",
        "Comprendre les temps et la grammaire complexe",
        "Apprendre le vocabulaire et les expressions avancées",
        "Améliorer les compétences en lecture",
        "Pratique cohérente et immersion",
      ]);
      break;
    case "Spanish":
      content = generateTimelineContent(language, [
        "Comprensión de saludos y presentaciones básicos",
        "Aprende el alfabeto y la pronunciación",
        "Comprender los conceptos básicos de gramática",
        "Aprender vocabulario común",
        "Practicar oraciones simples",
        "Aprenda a utilizar los artículos (A, An, The)",
        "Aprenda los verbos en presente",
        "Practicar palabras interrogativas",
        "Aprenda conjunciones y preposiciones básicas",
        "Maestros plurales y sustantivos contables/incontables",
        "Comprender la conjugación de verbos en pasado y futuro",
        "Aprende pronombres y posesivos",
        "Céntrese en la capacidad de escuchar",
        "Practique la redacción de párrafos breves",
        "Aprende modismos y verbos compuestos en inglés",
        "Practicar la conversación y el habla",
        "Comprender tiempos verbales y gramática compleja",
        "Aprende vocabulario y expresiones avanzadas",
        "Mejorar las habilidades de lectura",
        "Práctica constante e inmersión",
      ]);
      break;
    case "German":
      content = generateTimelineContent(language, [
        "Grundlegende Begrüßungen und Einführungen verstehen",
        "Lernen Sie das Alphabet und die Aussprache",
        "Grundlegende Grammatikkonzepte verstehen",
        "Lernen Sie allgemeinen Wortschatz",
        "Einfache Sätze üben",
        "Lernen Sie, Artikel (A, An, The) zu verwenden",
        "Lernen Sie Präsensverben",
        "Fragewörter üben",
        "Grundlegende Konjunktionen und Präpositionen lernen",
        "Master-Pluralformen und zählbare/unzählbare Substantive",
        "Verbkonjugation in Vergangenheit und Zukunft verstehen",
        "Pronomen und Possessive lernen",
        "Fokus auf Zuhörfähigkeiten",
        "Üben Sie das Schreiben kurzer Absätze",
        "Lernen Sie englische Redewendungen und Phrasalverben",
        "Konversation und Sprechen üben",
        "Zeitformen und komplexe Grammatik verstehen",
        "Lernen Sie fortgeschrittene Vokabeln und Ausdrücke",
        "Lesefähigkeiten verbessern",
        "Konsequentes Üben und Eintauchen"
      ]);
      break;
  }

  timeline.innerHTML = content;
  loadProgress(language);
  addCollapsibleFeature(); // Ensure collapsible works after loading content
}

function generateTimelineContent(language, nodes) {
  return nodes
    .map(
      (node, index) => `
    <div class="milestone">
      <button class="collapsible">${index + 1}. ${node}</button>
      <div class="content">
        <p>Details about ${node}.</p>
        <input type="checkbox" class="progress-checkbox" id="${language}-node-${index}" data-category="${getCategory(
        node
      )}">
      </div>
    </div>
  `
    )
    .join("");
}

function getCategory(node) {
  if (node.includes("Vocabulary")) return "Vocabulary";
  if (node.includes("Grammar")) return "Grammar";
  if (node.includes("Listening")) return "Listening";
  if (node.includes("Speaking")) return "Speaking";
  if (node.includes("Reading")) return "Reading";
  return "General";
}

function loadProgress(language) {
  const checkboxes = document.querySelectorAll(".progress-checkbox");
  const totalTasks = checkboxes.length;

  checkboxes.forEach((checkbox) => {
    const id = checkbox.id;
    const isChecked = localStorage.getItem(id) === "true";
    checkbox.checked = isChecked;

    checkbox.addEventListener("change", () => {
      localStorage.setItem(id, checkbox.checked);
      calculateProgress(language, totalTasks);
      updateRadarChart(checkbox); // Update radar chart with respective completion category
    });
  });

  calculateProgress(language, totalTasks); // Calculate progress initially
}

function calculateProgress(language, totalTasks) {
  const checkboxes = document.querySelectorAll(
    `.progress-checkbox[id^="${language}"]`
  );
  let completedTasks = 0;

  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      completedTasks++;
    }
  });

  const progressPercent = (completedTasks / totalTasks) * 100;
  updateCharts(progressPercent); // Update the bar and pie charts with the progress percentage
}

function updateCharts(progressPercent) {
  // Update the Bar and Pie charts with the progress percentage
  barChart.data.datasets[0].data = [progressPercent];
  barChart.update();

  pieChart.data.datasets[0].data = [progressPercent, 100 - progressPercent];
  pieChart.update();
}

function addCollapsibleFeature() {
  const coll = document.getElementsByClassName("collapsible");
  for (let i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
      this.classList.toggle("active");
      const content = this.nextElementSibling;
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  }
}
