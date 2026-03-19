const citiesResponse = await fetch("http://127.0.0.1:5500/api/data/cities.json");
const citiesData = await citiesResponse.json();

console.log("cities data: " , citiesData);