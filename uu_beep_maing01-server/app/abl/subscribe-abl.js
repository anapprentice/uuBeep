"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/subscribe-error.js");

const WARNINGS = {};

class SubscribeAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("subscribe");
  }

  async create(awid, dtoIn, session) {
    const uid = session.getIdentity().getUuIdentity();

    if (uid === "0-0") {
      return {};
    }

    return this.dao.create({ awid, uid });
  }
}

module.exports = new SubscribeAbl();
