"use strict";

let formInputs = document.querySelectorAll("input"),
  dodajBtn = document.getElementById("dodajBtn"),
  addQuestionBtn = document.getElementById("addQuestionBtn"),
  form = document.getElementById("dodajForm"),
  questionsContainer = document.getElementById("questionsContainer"),
  nameInput = document.getElementById("name"),
  descriptionInput = document.getElementById("description");

let totalQuestions = 0;

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
      description: descriptionInput.value,
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
  descriptionInput.value = "";
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
  const newHtml = `
 <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-2">
              <label for="question${totalQuestions}" class="text-gray-700 font-medium"
                >${totalQuestions + 1}) Pitanje</label
              >
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
