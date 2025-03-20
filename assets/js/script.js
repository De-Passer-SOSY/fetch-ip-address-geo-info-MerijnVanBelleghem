"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
    document.querySelector("#getLocationBtn").addEventListener("click", fetchIp)
    // document.querySelector("#getLocationBtn").addEventListener("click", getLocation)
    console.log("website ingeladen")
    // fetchIp() // mag weggelaten worden
}

async function fetchIp() {
    try {
        const response = await fetch("https://api.ipify.org/?format=json")
        const data = await response.json()
        console.log(data)
        fetchLocation(data.ip)
        displayIp(data)
    } catch (error) {
        console.log("Fout bij ophalen van API (fetchIp)", error)
    }
}

async function fetchLocation(ip) {
    try {
        const response = await fetch(`https://ipinfo.io/${ip}/geo`);
        const data = await response.json()
        console.log(data)
        displayLocation(data)
        fetchCoords(data.city, data.region)
    } catch (error) {
        console.log("Fout bij omzetten van IP-adres naar locatie", error)
    }
}

async function fetchCoords(city, region) {
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${city},${region}&format=json`);
        const data = await response.json()
        console.log(data)
        const latitude = data[0].lat
        const longitude = data[0].lon
        console.log(latitude, longitude)
        displayCoordinates(latitude, longitude)
        fetchWeather(latitude, longitude)
    } catch (error) {
        console.log("Fout bij ophalen van API (fetchCoords)", error)
    }
}

async function fetchWeather(latitude, longitude) {
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,rain&forecast_days=1`);
        const data = await response.json()
        console.log(data)
        // let temperature = data[object.current].temperature_2m
        const temperature = data.current.temperature_2m
        const rain = data.current.rain
        const wind = data.current.wind_speed_10m
        console.log(temperature, rain, wind)
        displayWeather(temperature, rain, wind)
    } catch (error) {
        console.log("Fout bij ophalen van API (fetchWeather)", error)
    }
}

function displayIp(data) {
    const container = document.querySelector("#pIp");
    container.innerHTML = data.ip;
}

function displayLocation(data) {
    const container = document.querySelector("#pLocation");
    container.innerHTML = data.city + ", " + data.region + ", " + data.country;
}

function displayCoordinates(latitude, longitude) {
    const container = document.querySelector("#pCoordinates");
    container.innerHTML = latitude + ", " + longitude;
}

function displayWeather(temperature, rain, wind) {
    const container = document.querySelector("#pWeather");
    container.innerHTML = "Temperatuur: " + temperature + "°C, Regen: " + rain + "mm, Wind: " + wind + "km/h";
}
