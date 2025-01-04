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
    delay: 700,
});
// Mock weather data for Riyadh
const mockWeatherData = {
    main: {
      temp: 30, // Example temperature in Celsius
      humidity: 50, // Example humidity percentage
      feels_like: 28, // Example feels-like temperature
    },
    weather: [
      {
        description: 'Clear sky', // Example weather description
        icon: '01d', // Example weather icon
      },
    ],
    wind: {
      speed: 5, // Example wind speed in m/s
    },
  };
  
  // Elements to display weather data
  const weatherContainer = document.querySelector('.weather-container');
  const temperatureElement = document.getElementById('temperature');
  const descriptionElement = document.getElementById('description');
  const humidityElement = document.getElementById('humidity');
  const feelsLikeElement = document.getElementById('feels-like');
  const windSpeedElement = document.getElementById('wind-speed');
  const weatherIconElement = document.getElementById('weather-icon');
  
  // Simulating data display
  temperatureElement.textContent = `Temperature: ${mockWeatherData.main.temp}°C`;
  descriptionElement.textContent = `Description: ${mockWeatherData.weather[0].description}`;
  humidityElement.textContent = `Humidity: ${mockWeatherData.main.humidity}%`;
  feelsLikeElement.textContent = `Feels like: ${mockWeatherData.main.feels_like}°C`;
  windSpeedElement.textContent = `Wind Speed: ${mockWeatherData.wind.speed} m/s`;
  weatherIconElement.src = `https://openweathermap.org/img/wn/${mockWeatherData.weather[0].icon}@2x.png`;
  
  // Add some modern styles to the weather container
  weatherContainer.style.display = 'flex';
  weatherContainer.style.flexDirection = 'column';
  weatherContainer.style.alignItems = 'center';
  weatherContainer.style.padding = '20px';
  weatherContainer.style.borderRadius = '10px';
weatherContainer.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
  
ScrollReveal().reveal(".destination__card", {
    ...scrollRevealOption,
    interval: 500,
});
ScrollReveal().reveal(".package__card", {
    ...scrollRevealOption,
    interval: 500,
});