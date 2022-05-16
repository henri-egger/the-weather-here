const express = require("express");
const Datastore = require("nedb");
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

app.get("/get", (request, response) => {
    console.log("A get request was made");
    const data = { data: db.getAllData() };
    response.json(data);
});

app.post("/del", (request, response) => {
    console.log("A delete request was made");
    const id = request.body.id;
    console.log(id);
    db.remove({});
    response.json({ message: "Successfully deleted entry from database" });
});
