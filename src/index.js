function updateTime() {
  const cities = [
    {
      id: "los-angeles",
      timeZone: "America/Los_Angeles",
      name: "Los Angeles 🇺🇸",
    },
    { id: "paris", timeZone: "Europe/Paris", name: "Paris 🇫🇷" },
    { id: "sydney", timeZone: "Australia/Sydney", name: "Sydney 🇦🇺" },
    { id: "dubai", timeZone: "Asia/Dubai", name: "Dubai 🇦🇪" },
  ];

  cities.forEach((city) => {
    let cityElement = document.querySelector(`#${city.id}`);
    if (cityElement) {
      let dateElement = cityElement.querySelector(".date");
      let timeElement = cityElement.querySelector(".time");
      let cityTime = moment().tz(city.timeZone);

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

  setInterval(() => {
    let newTime = moment().tz(cityTimeZone);
    document.querySelector(".date").innerHTML = newTime.format("MMMM Do YYYY");
    document.querySelector(".time").innerHTML = `${newTime.format(
      "h:mm:ss"
    )} <small>${newTime.format("A")}</small>`;
  }, 1000);
}

document.addEventListener("DOMContentLoaded", function () {
  updateTime();
  setInterval(updateTime, 1000);

  let citiesSelectElement = document.querySelector("#city");
  if (citiesSelectElement) {
    citiesSelectElement.addEventListener("change", updateCity);
  }
});
