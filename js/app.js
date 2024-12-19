console.log("hello");

function provjeriLS() {
    const kvizovi = localStorage.getItem("kvizovi");
    return kvizovi ? JSON.parse(kvizovi) : [];
}