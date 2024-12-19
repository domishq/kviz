let kvizoviList = document.getElementById("kvizoviList");

let kvizovi = [];

window.addEventListener("DOMContentLoaded", () => {
  initTable();
});

function createTableRow(kviz) {
  kvizoviList.innerHTML += `
            <div
          id="kviz0"
          class="p-4 flex flex-col gap-4 bg-slate-50 max-w-[400px] rounded-lg"
        >
          <div class="flex flex-col gap-1">
            <div class="flex gap-2">
              <p>Naziv</p>
              <p class="font-semibold">${kviz.name}</p>
            </div>
            <div class="flex gap-2">
              <p>Opis</p>
              <p class="font-light">
                ${kviz.description}
              </p>
            </div>
            <div class="flex gap-2">
              <p>Broj pitanja</p>
              <p class="font-semibold">${kviz.questionCount}</p>
            </div>
          </div>
          <div class="flex gap-2 justify-end">
            <button
              class="flex bg-slate-800 w-10 h-10 justify-center items-center rounded-md"
              onClick="deleteKviz(${kviz.id})"
              >
              <i class="fa text-white fa-trash-can"></i>
            </button>

            <button
              class="flex bg-slate-800 w-10 h-10 justify-center items-center rounded-md"
              onClick="editKviz(${kviz.id})"
              >
              <i class="fa text-white fa-pencil"></i>
            </button>
          </div>
        </div>
    `;
}

function initTable() {
  kvizovi = provjeriLS();

  console.log(kvizovi);
  if (kvizovi.length > 0) {
    kvizovi.forEach((kviz) => createTableRow(kviz));
    document.getElementById("nemaKvizovaPoruka").style.display = "none";
    document.getElementById("imaKvizovaPoruka").style.display = "block";
  }
}

function deleteKviz(id) {
  kvizovi = provjeriLS();
  let kviz = kvizovi.find((kviz) => kviz.id == id);
  if (
    kviz &&
    confirm("Jeste li sigurni da zelite obrisati kviz '" + kviz.name + "'")
  ) {
    kvizovi = kvizovi.filter((kviz) => kviz.id !== id);

    localStorage.setItem("kvizovi", JSON.stringify(kvizovi));

    document.getElementById("row" + id).remove();
  }
}

function editKviz(id) {
  window.location.href += "edit/?id=" + id;
}
