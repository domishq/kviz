let kvizoviTableBody = document.getElementById("kvizoviTableBody");

let kvizovi = [];

window.addEventListener("DOMContentLoaded", () => {
  kvizovi = provjeriLS();
  console.log(kvizovi);
});

function provjeriLS() {
  const kvizovi = localStorage.getItem("kvizovi");
  return kvizovi ? JSON.parse(kvizovi) : [];
}

function createTableRow(kviz) {
  kvizoviTableBody.innerHTML += `
    <tr>
        <td>${kviz.name}</td>
        <td>${kviz.questionCount}</td>
        <td>${kviz.playedCount}</td>
        <td class="flex gap-2 justify-center">
            <button
            class="flex bg-white w-10 h-10 justify-center items-center rounded-md"
            >
            <i class="fa fa-trash-can"></i>
            onClick="deleteKviz(${kviz.id})
            </button>
            <button
            class="flex bg-white w-10 h-10 justify-center items-center rounded-md"
            onClick="editKviz(${kviz.id})"
            >
            <i class="fa fa-pencil"></i>
            </button>
        </td>
    </tr>
    `;
}
