"use strict";

class EventSourceController {
  constructor() {
    this.activeConnections = [];
  }

  info(ucEnv) {
    const res = ucEnv.getResponse().unwrap();
    this.activeConnections.push(res);

    res.setHeader("Content-type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    res.on("close", () => {
      const index = this.activeConnections.indexOf(res);
      if (index !== -1) {
        this.activeConnections.splice(index, 1);
      }
    });

    res.write("data: " + `{}\n\n`);
    res.flush();
  }

  trigger(ucEnv) {
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
