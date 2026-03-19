const response = await fetch("http://127.0.0.1:5500/api/data/cities.json");
const data = await response.json();

console.log("data" , data)