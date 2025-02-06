function updateTime() {
  const cities = [
    { id: "dominican-republic", timezone: "America/Santo_Domingo" },
    { id: "los-angeles", timezone: "America/Los_Angeles" },
    { id: "panama", timezone: "America/Panama" },
    { id: "paris", timezone: "Europe/Paris" },
  ];

  cities.forEach(({ id, timezone }) => {
    let cityElement = document.querySelector(`#${id}`);
    if (cityElement) {
      let dateElement = cityElement.querySelector(".date");
      let timeElement = cityElement.querySelector(".time");
      let cityTime = moment().tz(timezone);

      dateElement.innerHTML = cityTime.format("MMMM Do YYYY");
      timeElement.innerHTML = cityTime.format("h:mm:ss [<small>]A[</small>]");
    }
  });
}

function updateCity(event) {
  let cityTimeZone = event.target.value;
  if (!cityTimeZone) return;

  if (cityTimeZone === "current") {
    cityTimeZone = moment.tz.guess();
  }

  let cityName = cityTimeZone.split("/")[1].replace("_", " ");
  let cityTime = moment().tz(cityTimeZone);
  let citiesElement = document.querySelector("#cities");

  // Replace default cities with only the selected city
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

  showRefreshButton();

  setInterval(() => {
    let newTime = moment().tz(cityTimeZone);
    let cityDiv = citiesElement.firstElementChild;
    cityDiv.querySelector(".date").innerHTML = newTime.format("MMMM Do YYYY");
    cityDiv.querySelector(".time").innerHTML = `${newTime.format(
      "h:mm:ss"
    )} <small>${newTime.format("A")}</small>`;
  }, 1000);
}

function showRefreshButton() {
  let refreshButton = document.querySelector("#refresh-button");
  refreshButton.style.display = "block";
}

function restoreDefaultCities() {
  let citiesElement = document.querySelector("#cities");

  citiesElement.innerHTML = `
    <div class="city" id="los-angeles">
      <div>
        <h2>Los Angeles 🇺🇸</h2>
        <div class="date"></div>
      </div>
      <div class="time"></div>
    </div>
    <div class="city" id="paris">
      <div>
        <h2>Paris 🇫🇷</h2>
        <div class="date"></div>
      </div>
      <div class="time"></div>
    </div>
    <div class="city" id="panama">
      <div>
        <h2>Panama 🇵🇦</h2>
        <div class="date"></div>
      </div>
      <div class="time"></div>
    </div>
    <div class="city" id="dominican-republic">
      <div>
        <h2>Dominican Republic 🇩🇴</h2>
        <div class="date"></div>
      </div>
      <div class="time"></div>
    </div>
  `;

  updateTime();

  // Hide the refresh button when the default cities are restored
  let refreshButton = document.querySelector("#refresh-button");
  refreshButton.style.display = "none";
}

// Add a page refresh on button click
document
  .getElementById("refresh-button")
  .addEventListener("click", function () {
    restoreDefaultCities(); // Restore the default cities without reloading the page
  });

document.addEventListener("DOMContentLoaded", function () {
  updateTime();
  setInterval(updateTime, 1000);

  let citiesSelectElement = document.querySelector("#city");
  if (citiesSelectElement) {
    citiesSelectElement.addEventListener("change", updateCity);
  }
});
