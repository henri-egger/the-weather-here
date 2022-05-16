let coords;

if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(displayCoords);
} else {
    document.getElementById("coords-display").textContent =
        "Geolocation not available";
}

document.getElementById("log").addEventListener("click", fetchEntry);

function displayCoords(position) {
    coords = position.coords;
    const { latitude, longitude } = coords;
    document.getElementById("lat").textContent = latitude.toFixed(4);
    document.getElementById("lon").textContent = longitude.toFixed(4);

    fetchWeather();
}

async function fetchEntry() {
    const { latitude, longitude } = coords;
    const data = {
        lat: Number(latitude.toFixed(6)),
        lon: Number(longitude.toFixed(6)),
        message: document.getElementById("message").value,
        timestamp: Date.now(),
    };

    const fetchOpts = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };

    const response = await fetch("/post", fetchOpts);
    const responseMessage = await response.json();

    document.getElementById("srv-response").textContent =
        responseMessage.message;

    setInterval(() => {
        document.getElementById("srv-response").textContent = undefined;
    }, 2000);
}

async function fetchWeather() {
    const { latitude, longitude } = coords;
    const response = await fetch(
        `/get/weather-here/?lat=${latitude}&lon=${longitude}`
    );
    const data = (await response.json()).data;

    console.log(data);
}
