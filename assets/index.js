let locationInput = document.getElementById('location');
let searchBtn = document.getElementById('search');
let suggested = document.getElementById('suggested');
let city = {};
locationInput.addEventListener('keyup', mapApi)
searchBtn.addEventListener('click', searchByWord)

/**
 * @return {void} Nothing
 */
function mapApi() {
  if (locationInput.value) {
    fetchGeoCoding()
  }else{
    suggested.style.display = 'none';
  }
}

/**
 * Maps over the returned response, add the suggested words.
 * @return {void} Nothing
 */
function addSuggestions(){
  if (city.length) {
    suggested.style.display = 'block';
    city.map(city => {
      suggested.innerHTML += `<div class='suggested-word' data-longitude="${city.longitude}" data-latitude="${city.latitude}">${city.name}-${city.state}</div>`;
    })
    let suggestedKeywords = document.querySelectorAll('.suggested-word')
    suggestedKeywords.forEach(suggested => {
      suggested.addEventListener('click', mapBuilder)
    });
  }
}

/**
 * Build a map based on the latitude and longitude.
 * @return {void} Nothing
 */
function mapBuilder(){
  let map = document.getElementById('map')

  map.innerHTML = `<iframe style="width: 100%" height="500" id="gmap_canvas"
    src="https://maps.google.com/maps?q=${this.getAttribute('data-latitude')},${this.getAttribute('data-longitude')}&t=k&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no"
    marginheight="0" marginwidth="0"></iframe>`
}

/**
 * Build a map based on the entered keyword.
 * @return {void} Nothing
 */
function searchByWord(){
  let map = document.getElementById('map')

  map.innerHTML = `<iframe style="width: 100%" height="500" id="gmap_canvas"
    src="https://maps.google.com/maps?q=${locationInput.value}&t=k&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no"
    marginheight="0" marginwidth="0"></iframe>`

}

/**
 * Fetch the geocoding for a specific location.
 * @return {JSON} JSON response
 */
async function fetchGeoCoding(){
  let url = `https://api.api-ninjas.com/v1/geocoding?city=${locationInput.value}`
  await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": "H+q60DH1+RpAQBO85HzwYg==F2JZSmbWwhA2BMEc"
    },
  }).then(function (response) {
    if (response.ok) {
      addSuggestions()
    }
    return response.json();// convert it to a pure JavaScript object
  })
    .then(function (data) {
      //Process the data  
      if (data)
        city = data;
    })
    .catch(function (err) {
      console.log(err);
    });
}