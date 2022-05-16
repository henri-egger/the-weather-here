fetchFromSrv();

async function fetchFromSrv() {
    const response = await fetch("/get/allDbEntries");
    const data = (await response.json()).data;
    const sortedData = data.sort((a, b) => {
        if (a.timestamp > b.timestamp) return -1;
        else if (a.timestamp < b.timestamp) return 1;
        else return 0;
    });

    sortedData.forEach((element) => {
        const { lat, lon, message, timestamp, _id } = element;

        let paragraph = document.createElement("p");
        paragraph.setAttribute("class", "srv-log");
        paragraph.textContent = `lat: ${lat}
            lon: ${lon}
            message: ${message}
            timestamp: ${new Date(timestamp).toLocaleString()}
            id: ${_id}`;
        document.getElementById("content-display").appendChild(paragraph);

        /*
        let delButton = document.createElement("button");
        delButton.setAttribute("class", "del-button");
        delButton.setAttribute("type", "button");
        delButton.textContent = "Delete entry";
        delButton.addEventListener("click", deleteEntry);
        paragraph.appendChild(delButton);
        */
    });
}

/*
async function deleteEntry(e) {
    const idLength = 16;
    const buttonLength = 12;
    const text = String(e.path[1].textContent);
    const idEnd = text.length - buttonLength;
    const idStart = idEnd - idLength;
    const id = text.substring(idStart, idEnd);

    const fetchOpts = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
    };

    const response = await fetch("/del", fetchOpts);
    const responseMessage = (await response.json()).message;
    console.log(responseMessage);
}
*/
