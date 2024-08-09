const weatherInfo = {
    address: "Not specified",
    weather: "Unknown",
    temperature: "N/A",
    windSpeed: "N/A",
    timezone: "N/A"
};

document.getElementById("but").addEventListener('click',getAdd);

async function fillTxt() {
    document.getElementById("address").innerHTML=weatherInfo.address;
    document.getElementById("weather").innerHTML=weatherInfo.weather;
    document.getElementById("temperature").innerHTML=weatherInfo.temperature;
    document.getElementById("wind").innerHTML=weatherInfo.windSpeed;
}


async function getAdd(){
    const add = document.getElementById("txt");
    const address = encodeURIComponent(add.value.trim());
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${address}?unitGroup=metric&key=MWLKRB755W37WF5ML3EGQASPJ&contentType=json`;
    const response = await fetch(url, {
        "method": "GET",
        "headers": {
        }
    });
    const data = await response.json();
    weatherInfo.address = data.resolvedAddress;
    weatherInfo.weather = data.currentConditions.conditions;
    weatherInfo.temperature = `${data.currentConditions.temp} °C`;
    weatherInfo.windSpeed = `${data.currentConditions.windspeed} km/h`;
    weatherInfo.timezone = `${data.timezone}`;
    console.log(weatherInfo);
    
    fillTxt();
}

function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const timeString = `${hours}:${minutes}`;
    document.getElementById('clock').textContent = timeString;
}

// Update the time immediately and then every second
updateTime();
setInterval(updateTime, 1000);

function updateDate() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = now.toLocaleDateString(undefined, options);
    document.getElementById('date').textContent = dateString;
}

// Call the function to update the date
updateDate();