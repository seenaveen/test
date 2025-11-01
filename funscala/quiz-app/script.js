const COUNTRY_DATA = [
  {
    name: "Australia",
    capital: "Canberra",
    continent: "Oceania",
    hint: "Island continent famed for the Great Barrier Reef.",
    fact: "Australia is home to the Great Barrier Reef, the world's largest coral reef system stretching over 2,300 kilometers.",
    viewBox: "0 0 120 120",
    path: "M15 60 L30 35 L55 25 L85 35 L100 55 L95 75 L75 90 L50 85 L35 95 L20 80 Z",
  },
  {
    name: "Brazil",
    capital: "Brasília",
    continent: "South America",
    hint: "The largest country in South America, home to the Amazon.",
    fact: "Brazil's Amazon rainforest produces about 20% of the world's oxygen and hosts unparalleled biodiversity.",
    viewBox: "0 0 120 120",
    path: "M45 15 L75 25 L95 55 L80 95 L50 105 L25 80 L20 55 L30 35 Z",
  },
  {
    name: "India",
    capital: "New Delhi",
    continent: "Asia",
    hint: "A South Asian country shaped by the Himalayas to the north.",
    fact: "India's Kumbh Mela gathering is the largest peaceful gathering of people on Earth.",
    viewBox: "0 0 120 120",
    path: "M50 10 L65 20 L60 35 L70 50 L55 60 L65 80 L45 105 L35 80 L25 70 L40 55 L25 45 L35 25 Z",
  },
  {
    name: "Italy",
    capital: "Rome",
    continent: "Europe",
    hint: "A boot-shaped peninsula extending into the Mediterranean Sea.",
    fact: "Italy is home to more UNESCO World Heritage Sites than any other country in the world.",
    viewBox: "0 0 120 120",
    path: "M45 10 L60 15 L70 25 L65 40 L75 50 L60 65 L55 85 L40 80 L45 60 L35 50 L30 35 L35 20 Z",
  },
  {
    name: "Japan",
    capital: "Tokyo",
    continent: "Asia",
    hint: "An island nation east of China known for cherry blossoms.",
    fact: "Japan is made up of over 6,800 islands, though four main islands make up 97% of its land area.",
    viewBox: "0 0 120 120",
    path: "M60 10 L70 30 L65 45 L75 60 L70 80 L55 95 L45 85 L50 70 L40 55 L45 40 Z",
  },
  {
    name: "United Kingdom",
    capital: "London",
    continent: "Europe",
    hint: "Comprised of England, Scotland, Wales, and Northern Ireland.",
    fact: "London's Underground, opened in 1863, is the world's first underground railway system.",
    viewBox: "0 0 120 120",
    path: "M40 15 L55 20 L60 35 L50 45 L55 60 L45 75 L30 70 L35 55 L25 45 L30 25 Z",
  },
  {
    name: "United States",
    capital: "Washington, D.C.",
    continent: "North America",
    hint: "This country's outline includes Alaska and Hawaii only on maps, not silhouettes like this mainland shape.",
    fact: "The United States spans six time zones from Maine to Hawaii and hosts nearly every climate type.",
    viewBox: "0 0 120 120",
    path: "M15 35 L40 25 L80 25 L105 40 L100 70 L75 80 L45 75 L25 85 L15 65 Z",
  },
  {
    name: "France",
    capital: "Paris",
    continent: "Europe",
    hint: "Hexagon-shaped Western European country.",
    fact: "France is the most visited country in the world, attracting over 80 million travelers annually.",
    viewBox: "0 0 120 120",
    path: "M30 20 L60 15 L85 35 L80 70 L55 95 L25 80 L20 50 Z",
  },
  {
    name: "South Africa",
    capital: "Pretoria (administrative)",
    continent: "Africa",
    hint: "A southern African nation with coastlines on both the Atlantic and Indian Oceans.",
    fact: "South Africa has 11 official languages and three capital cities.",
    viewBox: "0 0 120 120",
    path: "M30 60 L45 45 L70 40 L95 60 L85 90 L55 100 L35 85 Z",
  },
  {
    name: "Argentina",
    capital: "Buenos Aires",
    continent: "South America",
    hint: "South American country stretching along the Andes down to Patagonia.",
    fact: "Argentina's Patagonia region is home to Perito Moreno, one of the few glaciers in the world that is still growing.",
    viewBox: "0 0 120 120",
    path: "M50 10 L65 25 L60 45 L70 60 L60 95 L45 110 L35 90 L40 70 L30 55 L40 35 Z",
  },
];

const TOTAL_QUESTIONS = 10;
const TIME_PER_QUESTION = 22; // seconds

const svg = document.getElementById("country-shape");
const hintCaption = document.getElementById("country-hint");
const scoreValue = document.getElementById("score");
const streakValue = document.getElementById("streak");
const questionNumber = document.getElementById("question-number");
const totalQuestions = document.getElementById("total-questions");
const progressBar = document.getElementById("progress-bar");
const choicesContainer = document.getElementById("choices");
const choiceTemplate = document.getElementById("choice-template");
const factText = document.getElementById("fact-text");
const hintButton = document.getElementById("hint-button");
const skipButton = document.getElementById("skip-button");
const restartButton = document.getElementById("restart-button");
const timerFill = document.getElementById("timer-fill");
const badgeSpeed = document.getElementById("badge-speed");
const badgeStreak = document.getElementById("badge-streak");
const badgePerfection = document.getElementById("badge-perfection");

const numberFormatter = new Intl.NumberFormat("en-US");

let questionSet = [];
let currentQuestionIndex = 0;
let score = 0;
let streak = 0;
let bestStreak = 0;
let correctAnswers = 0;
let timerId = null;
let timeLeft = TIME_PER_QUESTION;
let hintUsed = false;
let acceptingAnswers = true;

function shuffle(array) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function setupGame() {
  totalQuestions.textContent = TOTAL_QUESTIONS;
  questionSet = shuffle(COUNTRY_DATA).slice(0, TOTAL_QUESTIONS);
  currentQuestionIndex = 0;
  score = 0;
  streak = 0;
  bestStreak = 0;
  correctAnswers = 0;
  hintUsed = false;
  acceptingAnswers = true;
  factText.textContent = "Ready to explore? Identify the country silhouette to unlock surprising facts.";
  resetBadges();
  updateScoreboard();
  loadQuestion();
}

function resetBadges() {
  [badgeSpeed, badgeStreak, badgePerfection].forEach((badge) => {
    badge.classList.remove("earned");
  });
}

function loadQuestion() {
  clearInterval(timerId);
  if (currentQuestionIndex >= questionSet.length) {
    finishGame();
    return;
  }

  acceptingAnswers = true;
  hintUsed = false;
  hintCaption.textContent = "";
  hintButton.textContent = "Show hint";
  hintButton.setAttribute("aria-expanded", "false");

  const question = questionSet[currentQuestionIndex];
  questionNumber.textContent = currentQuestionIndex + 1;
  renderShape(question);
  renderChoices(question);
  updateProgressBar(currentQuestionIndex);
  startTimer();
}

function renderShape(question) {
  svg.setAttribute("viewBox", question.viewBox || "0 0 100 100");
  svg.innerHTML = `
    <defs>
      <linearGradient id="shape-gradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#38bdf8" />
        <stop offset="50%" stop-color="#6366f1" />
        <stop offset="100%" stop-color="#f472b6" />
      </linearGradient>
    </defs>
    <path d="${question.path}"/>
  `;
  svg.classList.remove("animate");
  requestAnimationFrame(() => {
    requestAnimationFrame(() => svg.classList.add("animate"));
  });
}

function renderChoices(question) {
  choicesContainer.innerHTML = "";
  const wrongChoices = shuffle(
    COUNTRY_DATA.filter((country) => country.name !== question.name)
  ).slice(0, 3);
  const options = shuffle([question, ...wrongChoices]);

  options.forEach((option) => {
    const button = choiceTemplate.content.firstElementChild.cloneNode(true);
    button.textContent = option.name;
    button.dataset.answer = option.name;
    button.addEventListener("click", () => handleAnswer(button, option.name === question.name));
    choicesContainer.appendChild(button);
  });
}

function handleAnswer(button, isCorrect) {
  if (!acceptingAnswers) return;
  acceptingAnswers = false;
  clearInterval(timerId);

  const buttons = choicesContainer.querySelectorAll(".choice");
  buttons.forEach((choice) => choice.setAttribute("disabled", "true"));

  const question = questionSet[currentQuestionIndex];

  if (isCorrect) {
    button.classList.add("correct");
    const bonus = Math.max(0, Math.round(timeLeft * 5));
    const hintPenalty = hintUsed ? 15 : 0;
    const points = Math.max(100 + bonus - hintPenalty, 50);
    score += points;
    streak += 1;
    bestStreak = Math.max(bestStreak, streak);
    correctAnswers += 1;
    factText.innerHTML = `<strong>${question.name} • ${question.capital}</strong><br/>${question.fact}`;
    if (timeLeft >= TIME_PER_QUESTION * 0.6) {
      badgeSpeed.classList.add("earned");
    }
    if (streak >= 3) {
      badgeStreak.classList.add("earned");
    }
  } else {
    button.classList.add("incorrect");
    revealCorrectOption(question.name);
    factText.innerHTML = `<strong>${question.name} • ${question.capital}</strong><br/>${question.fact}`;
    streak = 0;
  }

  updateScoreboard();
  scheduleNextQuestion();
}

function revealCorrectOption(correctName) {
  const correctButton = [...choicesContainer.children].find(
    (choice) => choice.dataset.answer === correctName
  );
  if (correctButton) {
    correctButton.classList.add("correct");
  }
}

function startTimer() {
  timeLeft = TIME_PER_QUESTION;
  updateTimerVisual();
  timerId = setInterval(() => {
    timeLeft -= 1;
    updateTimerVisual();
    if (timeLeft <= 0) {
      clearInterval(timerId);
      handleTimeout();
    }
  }, 1000);
}

function updateTimerVisual() {
  const ratio = Math.max(0, timeLeft) / TIME_PER_QUESTION;
  timerFill.style.transform = `scaleX(${ratio})`;
}

function handleTimeout() {
  if (!acceptingAnswers) return;
  acceptingAnswers = false;

  const question = questionSet[currentQuestionIndex];
  revealCorrectOption(question.name);
  [...choicesContainer.children].forEach((button) => button.setAttribute("disabled", "true"));

  factText.innerHTML = `<strong>${question.name} • ${question.capital}</strong><br/>Time's up! ${question.fact}`;
  streak = 0;
  updateScoreboard();
  scheduleNextQuestion();
}

function scheduleNextQuestion() {
  updateProgressBar(currentQuestionIndex + 1);
  setTimeout(() => {
    currentQuestionIndex += 1;
    loadQuestion();
  }, 1800);
}

function updateProgressBar(answeredCount = currentQuestionIndex) {
  const progress = (answeredCount / TOTAL_QUESTIONS) * 100;
  progressBar.style.width = `${Math.min(progress, 100)}%`;
  progressBar.parentElement.setAttribute("aria-valuenow", progress.toFixed(0));
}

function updateScoreboard() {
  scoreValue.textContent = numberFormatter.format(score);
  streakValue.textContent = streak;
}

hintButton.addEventListener("click", () => {
  if (!acceptingAnswers) return;
  const question = questionSet[currentQuestionIndex];
  hintUsed = !hintUsed;
  hintCaption.textContent = hintUsed
    ? `${question.hint} (Capital: ${question.capital})`
    : "";
  hintButton.textContent = hintUsed ? "Hide hint" : "Show hint";
  hintButton.setAttribute("aria-expanded", hintUsed ? "true" : "false");
});

skipButton.addEventListener("click", () => {
  if (!acceptingAnswers) return;
  hintCaption.textContent = "";
  acceptingAnswers = false;
  clearInterval(timerId);
  const question = questionSet[currentQuestionIndex];
  revealCorrectOption(question.name);
  [...choicesContainer.children].forEach((button) => button.setAttribute("disabled", "true"));
  factText.innerHTML = `<strong>${question.name} • ${question.capital}</strong><br/>Skipped! ${question.fact}`;
  streak = 0;
  updateScoreboard();
  scheduleNextQuestion();
});

restartButton.addEventListener("click", () => {
  clearInterval(timerId);
  setupGame();
});

function finishGame() {
  clearInterval(timerId);
  acceptingAnswers = false;
  updateProgressBar(TOTAL_QUESTIONS);

  if (correctAnswers === TOTAL_QUESTIONS) {
    badgePerfection.classList.add("earned");
  }

  const accuracy = Math.round((correctAnswers / TOTAL_QUESTIONS) * 100);
  const highlight = bestStreak >= 3 ? ` Longest streak: ${bestStreak} in a row!` : "";
  factText.innerHTML = `You explored all destinations!<br/><strong>${correctAnswers}/${TOTAL_QUESTIONS}</strong> correct (${accuracy}% accuracy).<br/>Final score: ${score}.${highlight}`;
  hintCaption.textContent = "";
  choicesContainer.innerHTML = "";
  svg.innerHTML = "";
}

setupGame();
