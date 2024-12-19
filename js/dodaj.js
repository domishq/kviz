"use strict";

let formInputs = document.querySelectorAll("input"),
  dodajBtn = document.getElementById("dodajBtn"),
  addQuestionBtn = document.getElementById("addQuestionBtn"),
  form = document.getElementById("dodajForm"),
  questionsContainer = document.getElementById("questionsContainer"),
  nameInput = document.getElementById("name");

let totalQuestions = 0;

console.log("Form inputs", formInputs);

window.addEventListener("DOMContentLoaded", () => {
  dodajBtn.addEventListener("click", dodajKviz);
  addQuestionBtn.addEventListener("click", dodajPitanje);
});

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
  let kvizovi = provjeriLS();

  // Pronađi najveći postojeći ID i uvećaj ga
  let kvizID =
    kvizovi.length > 0 ? Math.max(...kvizovi.map((kviz) => kviz.id)) + 1 : 1;

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
      id: kvizID,
      name: nameInput.value,
      questions: questions,
      questionCount: questions.length,
      playedCount: 0,
    };
  } else {
    return null;
  }
}

// Reset forme
function resetform() {
  formInputs.forEach((input) => (input.value = ""));
  for (let i = 0; i < totalQuestions; i++) {
    document.getElementById("question" + i).value = "";

    document.getElementById("question" + i + "answer0").value = "";
    document.getElementById("question" + i + "answer1").value = "";
    document.getElementById("question" + i + "answer2").value = "";
    document.getElementById("question" + i + "answer3").value = "";
  }
}

function dodajKviz(e) {
  e.preventDefault();
  const kviz = prikupiPodatkeIzForme();
  if (kviz) {
    dodajKvizLS(kviz);
  }
  resetform();
}

function dodajKvizLS(kviz) {
  let kvizovi = provjeriLS();
  kvizovi.push(kviz);
  localStorage.setItem("kvizovi", JSON.stringify(kvizovi));
}

function dodajPitanje() {
  questionsContainer.innerHTML += `
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
                />
                <input
                  type="text"
                  class="border-2 border-red-600"
                  name="question${totalQuestions}answer1"
                  id="question${totalQuestions}answer1"
                />
                <input
                  type="text"
                  class="border-2 border-red-600"
                  name="question${totalQuestions}answer2"
                  id="question${totalQuestions}answer2"
                />
                <input
                  type="text"
                  class="border-2 border-red-600"
                  name="question${totalQuestions}answer3"
                  id="question${totalQuestions}answer3"
                />
              </div>
            </div>
          </div>
  `;
  totalQuestions++;
}
