"use strict";

let formInputs = document.querySelectorAll('input'),
    dodajBtn = document.getElementById('dodajBtn'),
    form = document.getElementById('dodajForm'),
    nameInput = document.getElementById('name')

console.log("Form inputs",formInputs)

window.addEventListener("DOMContentLoaded", () => {
    dodajBtn.addEventListener("click", dodajKviz);
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
      kvizovi.length > 0
        ? Math.max(...kvizovi.map((kviz) => kviz.id)) + 1
        : 1;
  
    if (provjeriInpute()) {
      return {
        id: kvizID,
        name: nameInput.value,
        questionCount: 0,
        playedCount: 0
      };
    } else {
      return null;
    }
}
  
  // Reset forme
function resetform() {
    formInputs.forEach(input => input.value="")
}

function dodajKviz(e) {
    e.preventDefault();
    const kviz = prikupiPodatkeIzForme();
    if (kviz) {
      dodajKvizLS(kviz);
      console.log(name.value)
    }
    resetform();
}

function dodajKvizLS(kviz) {
    let kvizovi = provjeriLS();
    kvizovi.push(kviz);
    localStorage.setItem("kvizovi", JSON.stringify(kvizovi));
}