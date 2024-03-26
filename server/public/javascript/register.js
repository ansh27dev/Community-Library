const button = document.getElementById("location");
const country = document.getElementById("country");
const state = document.getElementById("state");
const city = document.getElementById("city");
const registerButton = document.getElementById("submit");
let latitude;
let longitude;
let data;
let countryData;
let stateData;
let cityData;

function gotLocation(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;

  var requestOptions = {
    method: "GET",
  };

  const apiKey = "1274edac91784889948b0cc15b4ade15";

  fetch(
    `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${apiKey}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      updateAddress(result);
    })
    .catch((error) => console.log("error", error));
}

function failedToget() {
  window.alert("failed to get location");
}

button.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition(gotLocation, failedToget);
});

function updateAddress(data) {
  countryData = data["features"][0]["properties"]["country"];
  stateData = data["features"][0]["properties"]["state"];
  cityData = data["features"][0]["properties"]["city"];

  country.value = `${countryData}`;
  state.value = `${stateData}`;
  city.value = `${cityData}`;
}

registerButton.addEventListener("click", () => {
  // Submit the form only when the register button is clicked
  document.getElementById("form").submit();
});
