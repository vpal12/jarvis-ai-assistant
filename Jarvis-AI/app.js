const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

function speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);

    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;

    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    var day = new Date();
    var hour = day.getHours();

    if (hour >= 0 && hour < 12) {
        speak("Good Morning Boss...");
    } else if (hour >= 12 && hour < 17) {
        speak("Good Afternoon Master...");
    } else {
        speak("Good Evening Sir...");
    }
}

window.addEventListener('load', () => {
    speak("Initializing JARVIS...");
    wishMe();
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());
};

btn.addEventListener('click', () => {
    content.textContent = "Listening...";
    recognition.start();
});

function takeCommand(message) {
    if (message.includes('hey') || message.includes('hello')) {
        speak("Hello Sir, How May I Help You?");
    } else if (message.includes("open google")) {
        window.open("https://google.com", "_blank");
        speak("Opening Google...");
    } else if (message.includes("open youtube")) {
        window.open("https://youtube.com", "_blank");
        speak("Opening Youtube...");
    } else if (message.includes("open facebook")) {
        window.open("https://facebook.com", "_blank");
        speak("Opening Facebook...");
    } else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        searchGoogle(message);
    } else if (message.includes('wikipedia')) {
        searchWikipedia(message);
    } else if (message.includes('time')) {
        tellTime();
    } else if (message.includes('date')) {
        tellDate();
    } else if (message.includes('calculator')) {
        openCalculator();
    } else if (message.includes('weather')) {
        getWeather(message);
    } else {
        speak("I'm sorry, I didn't understand that.");
    }
}

function searchGoogle(query) {
    const searchTerm = query.replace('what is', '').replace('who is', '').replace('what are', '').trim();
    window.open(`https://www.google.com/search?q=${searchTerm.replace(" ", "+")}`, "_blank");
    speak(`Searching Google for ${searchTerm}`);
}

function searchWikipedia(query) {
    const searchTerm = query.replace('wikipedia', '').trim();
    window.open(`https://en.wikipedia.org/wiki/${searchTerm}`, "_blank");
    speak(`Searching Wikipedia for ${searchTerm}`);
}

function tellTime() {
    const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric", hour12: true });
    speak(`The current time is ${time}`);
}

function tellDate() {
    const date = new Date().toLocaleString(undefined, { month: "long", day: "numeric", year: "numeric" });
    speak(`Today's date is ${date}`);
}

function openCalculator() {
    window.open('Calculator:///');
    speak("Opening Calculator");
}

function getWeather(location) {
    const searchTerm = location.replace('weather', '').trim();
    // Assuming there's a function `fetchWeather` that retrieves weather data from an API
    // You need to implement this function or use a weather API library
    fetchWeather(searchTerm)
        .then(weatherData => {
            speak(`The current weather in ${searchTerm} is ${weatherData.description} with a temperature of ${weatherData.temperature} degrees Celsius`);
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            speak("Sorry, I couldn't fetch the weather data for that location.");
        });
}
