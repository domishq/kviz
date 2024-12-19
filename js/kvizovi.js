let kvizoviList = document.getElementById("kvizoviList");

let kvizovi = [];

window.addEventListener("DOMContentLoaded", () => {
  initTable();
});

function createTableRow(kviz) {
  kvizoviList.innerHTML += `
    <div
      id="kviz${kviz.id}"
      class="p-6 flex flex-col gap-6 bg-white shadow-lg rounded-lg border border-gray-200 max-w-[400px] hover:shadow-xl transition-shadow"
    >
      <div class="flex flex-col gap-3">
        <h2 class="text-xl font-semibold text-gray-800">${kviz.name}</h2>
        <p class="text-sm text-gray-600">
          ${kviz.description}
        </p>
        <p class="text-sm text-gray-700 font-medium">
          Broj pitanja: <span class="font-semibold text-gray-900">${kviz.questionCount}</span>
        </p>
      </div>
      <div class="flex gap-3 justify-end">
        <button
          class="flex bg-red-600 w-10 h-10 justify-center items-center rounded-md hover:bg-red-700 transition-colors"
          onClick="deleteKviz(${kviz.id})"
        >
          <i class="fa text-white fa-trash-can"></i>
        </button>
        <button
          class="flex bg-blue-600 w-10 h-10 justify-center items-center rounded-md hover:bg-blue-700 transition-colors"
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

  if (kvizovi.length > 0) {
    kvizovi.forEach((kviz) => createTableRow(kviz));
    document.getElementById("imaKvizovaPoruka").style.display = "flex";
  } else document.getElementById("nemaKvizovaPoruka").style.display = "flex";
}

function deleteKviz(id) {
  kvizovi = provjeriLS();
  let kviz = kvizovi.find((kviz) => kviz.id == id);
  if (
    kviz &&
    confirm("Jeste li sigurni da zelite obrisati kviz '" + kviz.name + "'")
  ) {
    kvizovi = kvizovi.filter((kviz) => kviz.id != id);

    localStorage.setItem("kvizovi", JSON.stringify(kvizovi));

    document.getElementById("kviz" + id).remove();

    if (kvizovi.length == 0) {
      document.getElementById("imaKvizovaPoruka").style.display = "none";
      document.getElementById("nemaKvizovaPoruka").style.display = "flex";
    }
  }
}

function editKviz(id) {
  window.location.href += "edit/?id=" + id;
}
