function updateTime() {
  let losAngelesElement = document.querySelector("#los-angeles");
  if (losAngelesElement) {
    let losAngelesDateElement = losAngelesElement.querySelector(".date");
    let losAngelesTimeElement = losAngelesElement.querySelector(".time");
    let losAngelesTime = moment().tz("America/Los_Angeles");

    losAngelesDateElement.innerHTML = losAngelesTime.format("MMMM Do YYYY");
    losAngelesTimeElement.innerHTML = losAngelesTime.format(
      "h:mm:ss [<small>]A[</small>]"
    );
  }

  let parisElement = document.querySelector("#paris");
  if (parisElement) {
    let parisDateElement = parisElement.querySelector(".date");
    let parisTimeElement = parisElement.querySelector(".time");
    let parisTime = moment().tz("Europe/Paris");

    parisDateElement.innerHTML = parisTime.format("MMMM Do YYYY");
    parisTimeElement.innerHTML = parisTime.format(
      "h:mm:ss [<small>]A[</small>]"
    );
  }
}

function updateCity(event) {
  let cityTimeZone = event.target.value;
  if (!cityTimeZone) return; // Prevent clearing when default is selected

  if (cityTimeZone === "current") {
    cityTimeZone = moment.tz.guess();
  }

  let cityName = cityTimeZone.split("/")[1].replace("_", " ");
  let cityTime = moment().tz(cityTimeZone);
  let citiesElement = document.querySelector("#cities");

  // Instead of replacing all cities, update only a selected city display
  citiesElement.innerHTML = `
  <div class="city">
    <div>
      <h2>${cityName}</h2>
      <div class="date">${cityTime.format("MMMM Do YYYY")}</div>
    </div>
    <div class="time">${cityTime.format("h:mm:ss")} <small>${cityTime.format(
    "A"
  )}</small></div>
  </div>
  `;

  // Keep updating selected city’s time every second
  setInterval(() => {
    let newTime = moment().tz(cityTimeZone);
    document.querySelector(".date").innerHTML = newTime.format("MMMM Do YYYY");
    document.querySelector(".time").innerHTML = `${newTime.format(
      "h:mm:ss"
    )} <small>${newTime.format("A")}</small>`;
  }, 1000);
}

// Ensure the script runs after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  updateTime();
  setInterval(updateTime, 1000);

  let citiesSelectElement = document.querySelector("#city");
  if (citiesSelectElement) {
    citiesSelectElement.addEventListener("change", updateCity);
  }
});
