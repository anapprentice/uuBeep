"use strict";
const ConnectionService = require("../../components/connection-service");

class EventSourceController {
  constructor() {
    this.activeConnections = [];
  }

  async initiate(ucEnv) {
    const res = ucEnv.getResponse().unwrap();

    // create active connection
    await ConnectionService.create(ucEnv);
    this.activeConnections.push(res);

    res.setHeader("Content-type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    res.on("close", async () => {
      const index = this.activeConnections.indexOf(res);
      if (index !== -1) {
        // delete connection
        this.activeConnections.splice(index, 1);
        await ConnectionService.delete(ucEnv);
      }
    });

    res.write("data: " + `{}\n\n`);
    res.flush();
  }

  broadcast(ucEnv) {
    // INFO, WARNING, ERROR, FATAL
    const event = ucEnv.getDtoIn();

    // Broadcast data to all active connections
    this.activeConnections.forEach((connection) => {
      connection.write("data: " + `${JSON.stringify(event)}\n\n`);
      connection.flush();
    });
  }
}

module.exports = new EventSourceController();
