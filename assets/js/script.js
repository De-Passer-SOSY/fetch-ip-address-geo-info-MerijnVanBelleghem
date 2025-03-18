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
        let response = await fetch("https://api.ipify.org/?format=json")
        let data = await response.json()
        console.log(data)
        fetchLocation(data.ip)
        displayIp(data)
    } catch(error)
    {
        console.log("Fout bij ophalen van API", error)
    }
}

async function fetchLocation(ip) {
    try {
        let response = await fetch(`https://ipinfo.io/${ip}/geo`);
        let data = await response.json()
        console.log(data)
        displayLocation(data)
        displayCoordinates(data)
    } catch(error) {
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