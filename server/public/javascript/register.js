const button = document.getElementById("location");
const address = document.getElementById("area");
let latitude;
let longitude;
let data;

function gotLocation(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;

  var requestOptions = {
    method: "GET",
  };

  const apiKey = "aa942081011849b59b383b693174e7c7";

  fetch(
    `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${apiKey}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      data = result;
      address.innerHTML = `<p>country:${data["features"][0]["properties"]["country"]}</p><br>
      <p>state:${data["features"][0]["properties"]["state"]}</p><br>
      <p>city:${data["features"][0]["properties"]["city"]}</p>`;
    })
    .catch((error) => console.log("error", error));
}

function failedToget() {
  window.alert("failed to get location");
}

button.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition(gotLocation, failedToget);
});
