"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/event-source-error.js");

const WARNINGS = {};

class EventSourceAbl {
  constructor() {
    this.validator = Validator.load();
    // this.dao = DaoFactory.getDao("eventSource");
  }

  async trigger(awid, dtoIn) {
    
  }

  async info(awid, dtoIn) {
    return { ok: 200 };
  }
}

module.exports = new EventSourceAbl();
