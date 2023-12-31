"use strict";

const { Perflog } = require("uu_appg01_core-perflog");

// NODE MODULES
const pump = require("pump");

// CONSTANTS
const MIDDLEWARE_ORDER = 100;

/**
 * ResponseHandler handles serialization and dispatching of successful server
 * responses (i.e. not errors, which are handled by {ErrorHandler}).
 */
class ResponseHandler {
  constructor() {
    this.order = MIDDLEWARE_ORDER;
  }

  post(req, res, next) {
    // init response serialization measuring
    Perflog.measureSection("UU_APP_SERVER_HANDLE_RESPONSE", (section) => {
      let close = section.close;
      res.locals.handleResponseMeasuredSection = () => close.apply(section);
      section.close = () => {
        // Override close method
      };
    });

    let response = res.locals.response;
    let status = response.status || 200;
    if (req.multipart) req.multipart.abortStream();
    if (response.body && typeof response.body.pipe === "function") {
      // Handle CMD, Streams: Whenever body is a stream.Readable, just pump (safe pipe) it to response.
      res.writeHead(status, response.headers);
      pump(response.body, res, (err) => err && next(err));
    } else {
      if (!response._request._url.includes("eventSource/initiate")) {
        res.set(response.headers);
        res.status(status).send(response.body);
      }
    }
  }

  /**
   * Terminate response serialization measuring.
   * @param req
   * @param res
   */
  ensure(req, res) {
    let stop = res.locals.handleResponseMeasuredSection;
    stop && stop();
  }
}

/**
 * Module exports ResponseHandler constructor.
 * @type {ResponseHandler}
 */
module.exports = ResponseHandler;
