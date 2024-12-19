"use strict";
/* ZADATAK 1 */
let marka = document.getElementById("marka"),
  model = document.getElementById("model"),
  slika = document.getElementById("slika"),
  godina = document.getElementById("godina"),
  brzina = document.getElementById("brzina"),
  tocak = document.getElementById("tocak"),
  cijena = document.getElementById("cijena"),
  dodaj = document.getElementById("dodaj"),
  formbicikl = document.getElementById("form-1"),
  rezultat = document.getElementById("rezultat"),
  uredi = document.getElementById("uredi");

// Definiranje niza za pohranu igraca
let bicikla = [];

window.addEventListener("DOMContentLoaded", () => {
  dodaj.addEventListener("click", dodajBiciklUI);
  ispisBiciklLS();
});

// Provjera inputa
function provjeriInpute() {
  let inputs = formbicikl.querySelectorAll("input.form-chack");
  let sviPopunjeni = Array.from(inputs).every(
    (input) => input.value.trim() !== ""
  );
  return sviPopunjeni;
}

// Prikupljanje podataka iz forme
function prikupiPodatkeIzFormeBicikala() {
  // Preuzmi laptope iz LocalStorage
  let bicikla = provjeriLS();

  // Pronađi najveći postojeći ID i uvećaj ga
  let biciklaD =
    bicikla.length > 0
      ? Math.max(...bicikla.map((bicikl) => bicikl.id)) + 1
      : 1;

  if (provjeriInpute()) {
    return {
      id: biciklaD,
      marka: marka.value,
      model: model.value,
      slika: slika.value.replace(/C:\\fakepath\\/i, ""),
      godina: godina.value,
      brzina: brzina.value,
      tocak: tocak.value,
      cijena: cijena.value,
    };
  } else {
    return null;
  }
}

// Reset forme
function resetformBicikl() {
  marka.value = "";
  model.value = "";
  slika.value = "";
  godina.value = "";
  brzina.value = "";
  tocak.value = "";
  cijena.value = "";
}

function provjeriLS() {
  const bicikla = localStorage.getItem("bicikla");
  return bicikla ? JSON.parse(bicikla) : [];
}

function dodajBiciklLS(bicikl) {
  let bicikla = provjeriLS();
  bicikla.push(bicikl);
  localStorage.setItem("bicikla", JSON.stringify(bicikla));
}

function ispisBiciklLS() {
  const bicikla = provjeriLS();
  bicikla.forEach(
    (bicikl) =>
      (rezultat.innerHTML += `
  <div class="col-md-3" id="bicikl-${bicikl.id}">
   <div class="card mb-3">
     <h5 class="card-header">${bicikl.model}</h5>
     <div class="card-body">
       <p class="card-text">${bicikl.godina}</p>
     </div>
     <div class="card-body">
       <img src="img/${bicikl.slika}" alt="${bicikl.model}" class="d-block user-select-none" style="width: 100%; height: 337px; object-fit: fill; margin-bottom: 20px;">
     <ul class="list-group list-group-flush">
       <li class="list-group-item d-flex justify-content-between">Brzina <span class="badge bg-dark">${bicikl.brzina}</span></li>
       <li class="list-group-item d-flex justify-content-between">Veličina točka <span class="badge bg-dark">${bicikl.tocak}</span></li>
       <li class="list-group-item d-flex justify-content-between">Cijena <span class="badge bg-dark">${bicikl.cijena} KM</span></li>
     </ul>
     <div class="card-footer text-muted">
       <button type="button" class="btn btn-dark obrisi-bicikl" data-id="1" onClick="obrisiBiciklaLS(${bicikl.id})">Obriši bicikl</button>
   <button type="button" class="btn btn-dark uredi-bicikl" data-id="1">Uredi bicikl</button>
     </div>
   </div>
 </div>
</div>
`)
  );
}

function obrisiBiciklaLS(id) {
  let bicikla = provjeriLS();
  bicikla = bicikla.filter((biciklo) => biciklo.id !== id);
  localStorage.setItem("bicikla", JSON.stringify(bicikla));
  document.getElementById("bicikl-" + id).remove();
}

/*function ispisBicikla(bicikl) {
}*/

// Brisanje laptopa iz localStorage-a

function dodajBiciklUI(e) {
  e.preventDefault();
  const bicikl = prikupiPodatkeIzFormeBicikala();
  if (bicikl) {
    dodajBiciklLS(bicikl);
    rezultat.innerHTML += `
         <div class="col-md-3" id="bicikl-${bicikl.id}">
          <div class="card mb-3">
            <h5 class="card-header">${bicikl.model}</h5>
            <div class="card-body">
              <p class="card-text">${bicikl.godina}</p>
            </div>
            <div class="card-body">
              <img src="img/${bicikl.slika}" alt="${bicikl.model}" class="d-block user-select-none" style="width: 100%; height: 337px; object-fit: fill; margin-bottom: 20px;">
            <ul class="list-group list-group-flush">
              <li class="list-group-item d-flex justify-content-between">Brzina <span class="badge bg-dark">${bicikl.brzina}</span></li>
              <li class="list-group-item d-flex justify-content-between">Veličina točka <span class="badge bg-dark">${bicikl.tocak}</span></li>
              <li class="list-group-item d-flex justify-content-between">Cijena <span class="badge bg-dark">${bicikl.cijena} KM</span></li>
            </ul>
            <div class="card-footer text-muted">
              <button type="button" class="btn btn-dark obrisi-bicikl" data-id="1" onClick="obrisiBiciklaLS(${bicikl.id})">Obriši bicikl</button>
          <button type="button" class="btn btn-dark uredi-bicikl" data-id="1">Uredi bicikl</button>
            </div>
          </div>
        </div>
      </div>
  `;
  }
  resetformBicikl();
}

/*function obrisiBiciklUI(e) {
 
}*/
