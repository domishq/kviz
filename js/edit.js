"use strict";

let formInputs = document.querySelectorAll("input"),
  dodajBtn = document.getElementById("dodajBtn"),
  addQuestionBtn = document.getElementById("addQuestionBtn"),
  form = document.getElementById("dodajForm"),
  questionsContainer = document.getElementById("questionsContainer"),
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
          <div class="flex flex-col gap-4">
            <div class="flex gap-8">
              <label for="question${totalQuestions}">${
    totalQuestions + 1
  }) Pitanje </label>
              <textarea
                type="text"
                name="question${totalQuestions}"
                id="question${totalQuestions}"
                class="w-[300px] h-100px"
                placeholder="npr. 'Koliko je 2+2?'"
              ></textarea>
            </div>
            <div class="flex gap-8">
              <span>Odgovori</span>
              <div class="flex gap-1">
                <input
                  type="text"
                  class="border-2 border-green-600"
                  name="question${totalQuestions}answer0"
                  id="question${totalQuestions}answer0"
                  placeholder="4"
                />
                <input
                  type="text"
                  class="border-2 border-red-600"
                  name="question${totalQuestions}answer1"
                  id="question${totalQuestions}answer1"
                  placeholder="8"
                />
                <input
                  type="text"
                  class="border-2 border-red-600"
                  name="question${totalQuestions}answer2"
                  id="question${totalQuestions}answer2"
                  placeholder="2"
                />
                <input
                  type="text"
                  class="border-2 border-red-600"
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
