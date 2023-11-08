"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;

class ConnectionAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("connection");
  }

  async list(awid, dtoIn) {
    return this.dao.list(awid, dtoIn.pageInfo);
  }
}

module.exports = new ConnectionAbl();
