"use strict";

let formInputs = document.querySelectorAll("input"),
  dodajBtn = document.getElementById("dodajBtn"),
  addQuestionBtn = document.getElementById("addQuestionBtn"),
  form = document.getElementById("dodajForm"),
  questionsContainer = document.getElementById("questionsContainer"),
  descriptionInput = document.getElementById("description"),
  nameInput = document.getElementById("name");
let totalQuestions = 0;

let params = new URLSearchParams(window.location.search);
let kvizId = params.get("id");
let kvizIndex = -1;

window.addEventListener("DOMContentLoaded", () => {
  initPage();
  dodajBtn.addEventListener("click", dodajKviz);
  addQuestionBtn.addEventListener("click", dodajPitanje);
});

function initPage() {
  let kvizovi = provjeriLS();
  kvizIndex = kvizovi.findIndex((kviz) => kviz.id == kvizId);
  let kviz = kvizovi[kvizIndex];

  nameInput.value = kviz.name;
  descriptionInput.value = kviz.description;

  kviz.questions.forEach((question, index) => {
    dodajPitanje();
    document.getElementById("question" + index).value = question.title;

    document.getElementById("question" + index + "answer0").value =
      question.answers[0];
    document.getElementById("question" + index + "answer1").value =
      question.answers[1];
    document.getElementById("question" + index + "answer2").value =
      question.answers[2];
    document.getElementById("question" + index + "answer3").value =
      question.answers[3];
  });

  totalQuestions = kviz.questions.length;
}

// Provjera inputa
function provjeriInpute() {
  let sviPopunjeni = Array.from(formInputs).every(
    (input) => input.value.trim() !== ""
  );
  return sviPopunjeni;
}

// Prikupljanje podataka iz forme
function prikupiPodatkeIzForme() {
  // Preuzmi laptope iz LocalStorage
  let questions = [];
  for (let i = 0; i < totalQuestions; i++) {
    questions.push({
      title: document.getElementById("question" + i).value,
      answers: [
        document.getElementById("question" + i + "answer0").value,
        document.getElementById("question" + i + "answer1").value,
        document.getElementById("question" + i + "answer2").value,
        document.getElementById("question" + i + "answer3").value,
      ],
    });
  }

  if (provjeriInpute()) {
    return {
      id: kvizId,
      name: nameInput.value,
      description: descriptionInput.value,
      questions: questions,
      questionCount: questions.length,
      playedCount: 0,
    };
  } else {
    return null;
  }
}

function dodajKviz(e) {
  e.preventDefault();
  const kviz = prikupiPodatkeIzForme();
  if (kviz) {
    dodajKvizLS(kviz);
  }
}

function dodajKvizLS(kviz) {
  let kvizovi = provjeriLS();
  kvizovi[kvizIndex] = kviz;
  localStorage.setItem("kvizovi", JSON.stringify(kvizovi));
}

function dodajPitanje() {
  const newHtml = `
      <div id="questionContainer${totalQuestions}" class="flex flex-col gap-4 border-b border-gray-300 pb-4">
        <div class="flex justify-between items-center">
          <label for="question${totalQuestions}" class="text-gray-700 font-medium">${
    totalQuestions + 1
  }) Pitanje</label>
          <button 
            type="button" 
            class="text-red-600 hover:text-red-800 font-medium" 
            onclick="izbrisiPitanje(${totalQuestions})">
            Izbriši
          </button>
        </div>
        
        <div class="flex flex-col gap-2">
          <textarea
            type="text"
            name="question${totalQuestions}"
            id="question${totalQuestions}"
            class="border border-gray-300 rounded-md px-3 py-2 h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
  
        <div class="flex flex-col gap-2">
          <span class="text-gray-700 font-medium">Odgovori</span>
          <div class="grid grid-cols-2 gap-3">
            <input
              type="text"
              class="border border-green-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              name="question${totalQuestions}answer0"
              id="question${totalQuestions}answer0"
              placeholder="4"
            />
            <input
              type="text"
              class="border border-red-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              name="question${totalQuestions}answer1"
              id="question${totalQuestions}answer1"
              placeholder="8"
            />
            <input
              type="text"
              class="border border-red-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              name="question${totalQuestions}answer2"
              id="question${totalQuestions}answer2"
              placeholder="2"
            />
            <input
              type="text"
              class="border border-red-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              name="question${totalQuestions}answer3"
              id="question${totalQuestions}answer3"
              placeholder="3"
            />
          </div>
        </div>
      </div>
    `;

  questionsContainer.insertAdjacentHTML("beforeend", newHtml);
  totalQuestions++;
}

function izbrisiPitanje(index) {
  const questionToRemove = document.getElementById(`questionContainer${index}`);
  if (questionToRemove) {
    questionToRemove.remove();
  }

  totalQuestions--;
  const questionElements = questionsContainer.querySelectorAll(
    "[id^=questionContainer]"
  );
  questionElements.forEach((questionEl, i) => {
    questionEl.id = `questionContainer${i}`;
    questionEl.querySelector("label").textContent = `${i + 1}) Pitanje`;

    const inputs = questionEl.querySelectorAll("textarea, input");
    inputs.forEach((input) => {
      if (input.name.startsWith("question")) {
        input.name = input.name.replace(/\d+/, i);
        input.id = input.id.replace(/\d+/, i);
      }
    });

    const deleteButton = questionEl.querySelector("button");
    deleteButton.setAttribute("onclick", `izbrisiPitanje(${i})`);
  });
}
