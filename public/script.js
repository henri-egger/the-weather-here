let coords;

if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
        coords = position.coords;
        console.log(coords);
        const { latitude, longitude } = coords;
        document.getElementById("lat").textContent = latitude.toFixed(4);
        document.getElementById("lon").textContent = longitude.toFixed(4);
    });
} else {
    document.getElementById("coords-display").textContent =
        "Geolocation not available";
}

document.getElementById("log").addEventListener("click", fetchToSrv);

async function fetchToSrv() {
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
