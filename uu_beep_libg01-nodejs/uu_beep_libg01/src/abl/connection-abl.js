"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;

class ConnectionAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("connection");
  }

  async list(awid, dtoIn) {
    if (dtoIn.pageInfo) {
      for (let [key, value] of Object.entries(dtoIn.pageInfo)) {
        dtoIn.pageInfo[key] = Number(value);
      }
    }
    return this.dao.list(awid, dtoIn.pageInfo);
  }
}

module.exports = new ConnectionAbl();
