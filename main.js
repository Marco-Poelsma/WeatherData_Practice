const citiesResponse = await fetch("http://127.0.0.1:5500/api/data/cities.json");
const citiesData = await citiesResponse.json();
const citySelect = document.querySelector("#destination-select");

/**
 * Function to load all city names on the JSON for the select.
 */
function loadCitiesForSelect() {
    let null_opt = document.createElement('option'); // Default null option
    null_opt.value = "";
    null_opt.innerHTML = "Choose a Destination";
    citySelect.appendChild(null_opt);
    for (const c of citiesData) { //Iterate over cities in dataset.
        let opt = document.createElement('option');
        opt.value = stringNormaliser(c.name);
        opt.innerHTML = c.name;
        citySelect.appendChild(opt);
    }
}

/**
 * Function to normalise a string.
 * @param {String} s The string to normalise.
 * @returns {String} The normalised string.
 */
function stringNormaliser (s) {
    s = s.toLowerCase();
    s = s.replace('/ /g', '-');
    return s;
}

console.log("cities data: " , citiesData);
loadCitiesForSelect()