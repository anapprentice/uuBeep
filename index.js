const app = require("express")();

// Initialize an array to store active 'res' objects
const activeConnections = [];

app.get("/", (req, res) => res.send("Hello!"));

app.get("/eventX", (req, res) => {
    res.setHeader("Content-type", "text/event-stream");

    // Add the 'res' object to the list of active connections
    activeConnections.push(res);

    res.write("data: " + `Patrik\n\n`);
    res.write("data: " + `Pavel\n\n`);

    // When a client disconnects, remove their 'res' object from the array
    res.on("close", () => {
        console.log("close :)");
        activeConnections.splice(activeConnections.indexOf(res), 1);
        console.log("activeConnections", activeConnections.length);
    });

    console.log("activeConnections", activeConnections.length);
});

app.get("/triggerEvent", (req, res) => {
    res.setHeader("Content-type", "text/event-stream");

    // Broadcast data to all active connections
    activeConnections.forEach(connection => {
        connection.write("data: " + `Data from /triggerEvent\n\n`);
    });
});

app.listen("8080");
console.log("App started");
