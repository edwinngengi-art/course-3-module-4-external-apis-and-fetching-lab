// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!
const form = document.getElementById("weather-form");
const input = document.getElementById("state-input");
const results = document.getElementById("weather-results");
const errorDiv = document.getElementById("error-message");

form.addEventListener("submit", handleSubmit);

async function handleSubmit(e) {
  e.preventDefault();
  const state = input.value.trim().toUpperCase();

  results.innerHTML = "";
  errorDiv.textContent = "";
  errorDiv.style.display = "none";

  try {
    if (!state) {
      throw new Error("Please enter a state abbreviation");
    }

    const response = await fetch(`https://api.weather.gov/alerts/active?area=${state}`);

    if (!response.ok) {
      throw new Error("Failed to fetch weather alerts");
    }

    const data = await response.json();

    const title = data.title;
    const alerts = data.features;

    const summary = document.createElement("h2");
    summary.textContent = `${title}: ${alerts.length}`;
    results.appendChild(summary);

    const ul = document.createElement("ul");

    alerts.forEach(alert => {
      const li = document.createElement("li");
      li.textContent = alert.properties.headline;
      ul.appendChild(li);
    });

    results.appendChild(ul);

    input.value = "";

  } catch (error) {
    errorDiv.textContent = error.message;
    errorDiv.style.display = "block";
  }
}