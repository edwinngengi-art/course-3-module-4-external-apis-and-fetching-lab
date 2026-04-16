// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!
const input = document.getElementById("state-input");
const button = document.getElementById("fetch-alerts");
const results = document.getElementById("alerts-display");
const errorDiv = document.getElementById("error-message");

button.addEventListener("click", handleClick);

async function handleClick() {
  const state = input.value.trim().toUpperCase();

  results.innerHTML = "";
  errorDiv.textContent = "";
  errorDiv.classList.add("hidden");

  try {
    if (!state) {
      throw new Error("Please enter a state abbreviation");
    }

    const response = await fetch(`${weatherApi}${state}`);

    if (!response.ok) {
      throw new Error("Failed to fetch weather alerts");
    }

    const data = await response.json();
    const alerts = data.features;

    const summary = document.createElement("h2");
    summary.textContent = `${data.title}: ${alerts.length}`;
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
    errorDiv.classList.remove("hidden");
  }
}