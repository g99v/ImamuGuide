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

import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "https://esm.run/@google/generative-ai"; // Use ES Modules
  
  document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("weatherForm");
    const weatherApiKey = "ApiKey"; // Weather API key
    const googleApiKey = "ApiKey"; // Google AI API key (loaded from environment variables)
    
    const loadingPopup = document.getElementById("loading-popup");

    form.addEventListener("submit", async (event) => {
      event.preventDefault(); // Prevent the form from submitting normally
    
    // Show the loading popup
    loadingPopup.style.display = "flex";

      // Retrieve input values
      const source = document.getElementById("source").value.trim();
      const destination = document.getElementById("destination").value.trim();
      const startDate = document.getElementById("start_date").value.trim();
      const endDate = document.getElementById("end_date").value.trim();
  
      // Validate input
      if (!source || !destination || !startDate || !endDate) {
        alert("Please fill in all fields.");
        loadingPopup.style.display = "none"; // Hide the loading popup
        return;
      }
  
      // Validate date range
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (start > end) {
        alert("End date must be after the start date.");
        loadingPopup.style.display = "none"; // Hide the loading popup
        return;
      }
  
      // Calculate the number of days
      const timeDifference = end - start;
      const noOfDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)) + 1; // Add 1 to include both start and end dates
  
      try {
        // Fetch weather data
        const weatherData = await getWeatherData(weatherApiKey, destination, startDate, endDate);
  
        // Generate AI content using the same inputs
        const aiResponse = await generateAIContent(googleApiKey, source, destination, startDate, endDate, noOfDays);
  
        // Store data in localStorage
        localStorage.setItem("weatherData", JSON.stringify(weatherData));
        localStorage.setItem("aiResponse", aiResponse);
        // Redirect to the weather page
        window.location.href = "itinerary.html";
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to fetch data. Please check your inputs and try again.");
        loadingPopup.style.display = "none"; // Hide the loading popup
      } finally {
        // Hide the loading popup
        loadingPopup.style.display = "none";
      }
    });
  
    // Function to fetch weather data
    async function getWeatherData(apiKey, location, startDate, endDate) {
      const baseUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${startDate}/${endDate}?unitGroup=metric&include=days&key=${apiKey}&contentType=json`;
  
      const response = await fetch(baseUrl);
      if (!response.ok) {
        throw new Error(`Error fetching weather data: ${response.statusText}`);
      }
      return await response.json();
    }
  
    // Function to generate AI content
    async function generateAIContent(apiKey, source, destination, startDate, endDate, noOfDays) {
      const genAI = new GoogleGenerativeAI(apiKey);
  
      const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash-exp",
      });
  
      const generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
        responseMimeType: "text/plain",
      };
  
      const chatSession = model.startChat({
        generationConfig,
        history: [],
      });
  
      // Create a prompt using the form inputs
      const prompt = `forget all previous prompts. Generate a personalized trip itinerary for a ${noOfDays}-day trip from ${source} to ${destination} on ${startDate} to ${endDate}, 
      with an optimum budget (Currency: SAR (Saudi Riyals)). Include recommendations for accommodations, activities, and transportation. 
      IMPORTANT NOTE: you are writing this text to be displayed on an html page, so write the output as if its writtin in html
       so it becomes well formatted, the base format is each day as a big title and then the description for said day. additionally, 
       dont write code tag at the beginning. also, when u want to use a redirect link, only use https://www.google.com/search?q=SEARCH TERM HERE WITH SPACES REPLACED BY A PLUS SIGN. 
       also add a bit more subtle css styling to ur output, put a disclamer saying "This itinerary was generated using Google Gemini" at the bottom of the page".`;
  
      // Generate content using the Google AI API
      const result = await chatSession.sendMessage(prompt);
      return result.response.text();
    }
  });