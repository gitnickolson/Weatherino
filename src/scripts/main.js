async function waitForButtonClick() {
    document.querySelector(".submit-button").addEventListener("click", async (event) => {
        const location = event.target.form[0].value

        let weatherData = await getWeatherData(location)
        if (weatherData !== null) {
            replacePageContent()
            evaluateData(weatherData)
        }
    })
}

async function getWeatherData(location) {
    const submitButton = document.querySelector(".submit-button")
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=`, {
        mode: 'cors'
    })

    if (!response.ok) {
        submitButton.textContent = "Location not found"
        await delay(2000)
        submitButton.textContent = "Find weather data"
        return null;
    } else {
        return response.json();
    }
}

function evaluateData(data) {
    const numberWords = ["one", "two", "three", "four", "five", "six", "seven"]
    const days = data.days

    fillHeader(data)

    for (let i = 0; i < 7; i++) {
        const day = days[i]
        const dayDiv = document.querySelector(`#day-${numberWords[i]}`)
        fillDayDiv(day, dayDiv)
        if (i === 0) {
            fillBigInfoField(day)
        }
    }
}

function fillDayDiv(day, dayDiv) {
    dayDiv.querySelector(".date").textContent = day.datetime
    dayDiv.querySelector(".conditions").textContent = day.conditions
    dayDiv.querySelector(".temp").textContent = day.temp + "°"
    dayDiv.querySelector(".tempmax").textContent = `Max temperature: ${day.tempmax}°`
    dayDiv.querySelector(".tempmin").textContent = `Min temperature: ${day.tempmin}°`
    dayDiv.querySelector(".humidity").textContent = `Humidity: ${day.humidity}`
}

function fillHeader(data) {
    document.querySelector('.location').textContent = data.resolvedAddress
}

function fillBigInfoField(day) {
    const infoField = document.querySelector('#today-big-info')
    infoField.querySelector(".temp-description").textContent = day.temp + "°"
    infoField.querySelector(".conditions-icon").src = `../ressources/icons/${day.icon}.png`;
    infoField.querySelector(".description").textContent = day.description
}

function replacePageContent() {
    const newContent = `
        <div class="outer-grid-container">
            <header class="header-image">
                <h1 class="location"></h1>
            </header>
            <div class="inner-grid-container">
                <div class="day-item" id="day-one">
                    <p class="today-header">Today</p>
                    <p class="date"></p>
                    <p class="conditions"></p>
                    <p class="temp"></p>
                    <p class="tempmax"></p>
                    <p class="tempmin"></p>
                    <p class="humidity"></p>
                </div>
                <div class="day-item" id="day-two">
                    <p class="date"></p>
                    <p class="conditions"></p>
                    <p class="temp"></p>
                    <p class="tempmax"></p>
                    <p class="tempmin"></p>
                    <p class="humidity"></p>
                </div>
                <div class="day-item" id="day-three">
                    <p class="date"></p>
                    <p class="conditions"></p>
                    <p class="temp"></p>
                    <p class="tempmax"></p>
                    <p class="tempmin"></p>
                    <p class="humidity"></p>
                </div>
                <div class="day-item" id="day-four">
                    <p class="date"></p>
                    <p class="conditions"></p>
                    <p class="temp"></p>
                    <p class="tempmax"></p>
                    <p class="tempmin"></p>
                    <p class="humidity"></p>
                </div>
                <div id="today-big-info">
                    <p class="temp-description"></p>
                    <img class="conditions-icon" src="" alt="weather icon">
                    <p class="description"></p>
                </div>
                <div class="day-item" id="day-five">
                    <p class="date"></p>
                    <p class="conditions"></p>
                    <p class="temp"></p>
                    <p class="tempmax"></p>
                    <p class="tempmin"></p>
                    <p class="humidity"></p>
                </div>
                <div class="day-item" id="day-six">
                    <p class="date"></p>
                    <p class="conditions"></p>
                    <p class="temp"></p>
                    <p class="tempmax"></p>
                    <p class="tempmin"></p>
                    <p class="humidity"></p>
                </div>
                <div class="day-item" id="day-seven">
                    <p class="date"></p>
                    <p class="conditions"></p>
                    <p class="temp"></p>
                    <p class="tempmax"></p>
                    <p class="tempmin"></p>
                    <p class="humidity"></p>
                </div>
            </div>
            <div class="credits">Made by gitnickolson</div>
                 <button type="button" class="back-button">Check another location →</button>
        </div>
    `;

    document.body.innerHTML = newContent;

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = './styles/index.css';
    document.head.appendChild(link);

    document.querySelector('.back-button').addEventListener('click', restoreOriginalPage);

    loadScript('./scripts/main.js');
}

async function restoreOriginalPage() {
    document.body.innerHTML = `    
        <div class="index-grid-container">
            <header class="header">WEATHERINO</header>
            <div class="input-flex">
                <label for="location-input" class="index-heading">Search for a location</label>
                <form class="location-form">
                    <input type="text" id="location-input" class="location-input" placeholder="e.g. Duisburg, Northrine-Westphalia">
                    <a>
                        <button type="button" class="submit-button">Find weather data</button>
                    </a>
                </form>
            </div>
        </div>
    `;

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = './styles/index.css';
    document.head.appendChild(link);

    document.querySelector(".submit-button").addEventListener('click', waitForButtonClick);
    loadScript('./scripts/main.js');
}

function loadScript(src) {
    const script = document.createElement('script');
    script.src = src;
    document.body.appendChild(script);
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


waitForButtonClick().then()