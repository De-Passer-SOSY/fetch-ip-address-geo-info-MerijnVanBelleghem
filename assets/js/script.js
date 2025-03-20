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

function displayIp(data) {
    const container = document.querySelector("#pIp");
    container.innerHTML = data.ip;
}

function displayLocation(data) {
    const container = document.querySelector("#pLocation");
    container.innerHTML = data.city + ", " + data.region + ", " + data.country;
}

function displayCoordinates(data) {
    const container = document.querySelector("#pCoordinates");
    container.innerHTML = data.loc;
}