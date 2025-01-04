document.addEventListener("DOMContentLoaded", function () {
    // Retrieve weather data from localStorage
    const weatherData = JSON.parse(localStorage.getItem("weatherData"));

    if (!weatherData) {
        alert("No weather data found. Please go back and search again.");
        window.location.href = "index.html"; // Redirect to the form page
        return;
    }

    // Populate the location
    document.getElementById("location").textContent = weatherData.resolvedAddress;

    // Populate the table
    const tableBody = document.getElementById("weather-data");
    weatherData.days.forEach((day) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${day.datetime}</td>
            <td>${day.conditions}</td>
            <td>${day.tempmax}</td>
            <td>${day.tempmin}</td>
            <td>${day.precipprob || "N/A"}</td>
            <td>${day.humidity || "N/A"}</td>
            <td>${day.description || "No alerts"}</td>
        `;
        tableBody.appendChild(row);
    });
});
