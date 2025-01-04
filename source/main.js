const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
    navLinks.classList.toggle("open");

    const isOpen = navLinks.classList.contains("open");
    menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", (e) => {
    navLinks.classList.remove("open");
    menuBtnIcon.setAttribute("class", "ri-menu-line");
});

const scrollRevealOption = {
    distance: "50px",
    origin: "bottom",
    duration: 1000,
};
ScrollReveal().reveal(".header__container h1", {
    ...scrollRevealOption,
});
ScrollReveal().reveal(".header__container p", {
    ...scrollRevealOption,
    delay: 500,
});
ScrollReveal().reveal(".header__container form", {
    ...scrollRevealOption,
    delay: 1000,
});


ScrollReveal().reveal(".feature__card", {
    duration: 1000,
    interval: 500,
});

ScrollReveal().reveal(".destination__card", {
    ...scrollRevealOption,
    interval: 500,
});
ScrollReveal().reveal(".package__card", {
    ...scrollRevealOption,
    interval: 500,
});

const swiper = new Swiper(".swiper", {
    slidesPerview: "auto",
    spaceBetween: 20,
    pagination: {
        el: ".swiper-pagination",
    },
})

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("weatherForm");
    const apiKey = "3B6ULCXBXPLJDDUGDYPG4LVU2"; // Replace with your Visual Crossing Weather API key

    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent the form from submitting normally

        // Retrieve input values
        const source = document.getElementById("source").value.trim();
        const destination = document.getElementById("destination").value.trim();
        const startDate = document.getElementById("start_date").value.trim();
        const endDate = document.getElementById("end_date").value.trim();

        // Validate input
        if (!source || !destination || !startDate || !endDate) {
            alert("Please fill in all fields.");
            return;
        }

        // Validate date range
        const start = new Date(startDate);
        const end = new Date(endDate);
        if (start > end) {
            alert("End date must be after the start date.");
            return;
        }

        try {
            // Fetch weather data
            const weatherData = await getWeatherData(apiKey, destination, startDate, endDate);

            // Display the result or handle it as needed
            if (weatherData) {
                console.log("Weather Data:", weatherData);
                alert("Weather data fetched successfully! Check the console for details.");
                // Store data in localStorage
                localStorage.setItem("weatherData", JSON.stringify(weatherData));
                // Redirect to the weather page
                window.location.href = "itinerary.html";
            }
        } catch (error) {
            console.error("Error fetching weather data:", error);
            alert("Failed to fetch weather data. Please try again.");
        }
    });

    /**
     * Fetch weather data from Visual Crossing Weather API
     * @param {string} apiKey - Your API key
     * @param {string} location - Location for weather data
     * @param {string} startDate - Start date in "YYYY-MM-DD" format
     * @param {string} endDate - End date in "YYYY-MM-DD" format
     * @returns {Promise<Object>} - Weather data in JSON format
     */
    async function getWeatherData(apiKey, location, startDate, endDate) {
        const baseUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${startDate}/${endDate}?unitGroup=metric&include=days&key=${apiKey}&contentType=json`;

        const response = await fetch(baseUrl);
        if (!response.ok) {
            throw new Error(`Error fetching weather data: ${response.statusText}`);
        }
        return await response.json();
    }
});
