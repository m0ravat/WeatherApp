const weatherInfo = {
    address: "Not specified",
    weather: "Unknown",
    temperature: "N/A",
    windSpeed: "N/A",
    timezone: "N/A",
    humidity: "N/A",
    pressure: "N/A",
    windDirection:"N/a"
};

document.getElementById("but").addEventListener('click',getAdd);

async function fillTxt() {
    document.getElementById("address").innerHTML=weatherInfo.address;
    document.getElementById("weather").innerHTML=weatherInfo.weather;
    document.getElementById("temperature").innerHTML=weatherInfo.temperature;
    document.getElementById("wind").innerHTML=weatherInfo.windSpeed;
    document.getElementById("humidity").innerHTML=weatherInfo.humidity;
    document.getElementById("pressure").innerHTML=weatherInfo.pressure;
    document.getElementById("direction").innerHTML=weatherInfo.windDirection;

}
document.getElementById("picture").addEventListener('click', async function(){
    const img = document.getElementById("picture");
    const response = await fetch("https://api.giphy.com/v1/gifs/translate?api_key=5fIuXO50TKGM7tu3jM79RDpaH4PxvLAE&s=weather", {mode:"cors"});
    const pic = await response.json();
    img.style.backgroundImage=`url(${pic.data.images.original.url})`;
    console.log("1");
});

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
    console.log(data);
    weatherInfo.address = data.resolvedAddress;
    weatherInfo.weather = data.currentConditions.conditions;
    weatherInfo.temperature = `${data.currentConditions.temp} °C`;
    weatherInfo.humidity=`${data.currentConditions.humidity} %`;
    weatherInfo.pressure=`${data.currentConditions.pressure} hpa`;
    weatherInfo.windDirection = `${data.currentConditions.winddir} °`;

    if(data.currentConditions.temp >=20 && data.currentConditions.temp<=25){
        document.getElementById("screen").style.backgroundColor="#db5050";
        console.log("1");

    }
    else if(data.currentConditions.temp >25){
        document.getElementById("screen").style.backgroundColor="red";
        console.log("2");

    }
    else if(data.currentConditions.temp >=10 && data.currentConditions.temp<20){
        document.getElementById("screen").style.backgroundColor="#52c5ef";
        console.log("3");

    }
    else if(data.currentConditions.temp <10){
        document.getElementById("screen").style.backgroundColor="#063b4f";
        console.log("4");

    }

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