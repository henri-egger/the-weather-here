const express = require("express");
const Datastore = require("nedb");
const axios = require("axios").default;
const app = express();

app.get("/test", (req, res) => {
    res.status(200).json({ success: true });
});

app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});

const db = new Datastore({ filename: "database.db", autoload: true });

app.post("/post", (request, response) => {
    console.log("A post request was made");
    const data = request.body;
    db.insert(data);

    response.json({ message: "Successfully added entry to database" });
});

app.get("/get/all-db-entries", (request, response) => {
    console.log("A db get request was made");
    const data = { data: db.getAllData() };
    response.json(data);
});

/*
app.post("/del", (request, response) => {
    console.log("A delete request was made");
    const id = request.body.id;
    console.log(id);
    db.remove({});
    response.json({ message: "Successfully deleted entry from database" });
});
*/

app.get("/get/weather-here", async (request, response) => {
    console.log("A weather get request was made");

    const lat = request.query.lat;
    const lon = request.query.lon;
    const apiKey = require("./private.json")["weatherapi.com-API-Key"];

    try {
        const weatherResponse = await axios.get(
            `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}&aqi=no`
        );
        const data = weatherResponse.data;
        response.json({ data });
    } catch (error) {
        response.json({ error });
    }
});
