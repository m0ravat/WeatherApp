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
    document.getElementById("Wind").innerHTML=weatherInfo.windSpeed;
}
async function fillBackGround() {
    fill1();
    fill2();
    fill3();
    fill4();
}


async function fill1() {
    const img = document.getElementById("addr");
    const place =  weatherInfo.timezone;
    const url = `https://api.giphy.com/v1/stickers/translate?api_key=5fIuXO50TKGM7tu3jM79RDpaH4PxvLAE&s=${place}`;
    const response = await fetch(url,{
        mode:"cors"
    });
    const data = await response.json();
    console.log(data);
    img.style.backgroundImage=`url(${data.data.images.original.url})`;
    img.style.backgroundSize = 'contain';
}


async function fill2() {
    const img = document.getElementById("weat");
    const place =  weatherInfo.weather;
    const url = `https://api.giphy.com/v1/stickers/translate?api_key=5fIuXO50TKGM7tu3jM79RDpaH4PxvLAE&s=${place}`;
    const response = await fetch(url,{
        mode:"cors"
    });
    const data = await response.json();
    console.log(data);
    img.style.backgroundImage=`url(${data.data.images.original.url})`;
    img.style.backgroundSize = 'contain';
}


async function fill3() {
    const img = document.getElementById("temp");
    const place =  "thermometer";
    const url = `https://api.giphy.com/v1/stickers/translate?api_key=5fIuXO50TKGM7tu3jM79RDpaH4PxvLAE&s=${place}`;
    const response = await fetch(url,{
        mode:"cors"
    });
    const data = await response.json();
    console.log(data);
    img.style.backgroundImage=`url(${data.data.images.original.url})`;
    img.style.backgroundSize = 'contain';
}


async function fill4() {
    const img = document.getElementById("wind");
    const place =  weatherInfo.windSpeed;
    const url = `https://api.giphy.com/v1/stickers/translate?api_key=5fIuXO50TKGM7tu3jM79RDpaH4PxvLAE&s=${place}`;
    const response = await fetch(url,{
        mode:"cors"
    });
    const data = await response.json();
    console.log(data);
    img.style.backgroundImage=`url(${data.data.images.original.url})`;
    img.style.backgroundSize = 'contain';
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
    fillBackGround();

}