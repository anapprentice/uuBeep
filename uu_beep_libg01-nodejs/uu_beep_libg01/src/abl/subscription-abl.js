"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;

class SubscribeAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("subscription");
  }

  async get(awid, dtoIn, session) {
    const uid = session.getIdentity().getUuIdentity();
    return this.dao.get(awid, uid);
  }

  async delete(awid, dtoIn, session) {
    const uid = session.getIdentity().getUuIdentity();

    if (uid === "0-0") {
      return {};
    }

    return this.dao.remove({ awid, uid });
  }

  async create(awid, dtoIn, session) {
    const uid = session.getIdentity().getUuIdentity();

    if (uid === "0-0") {
      return {};
    }

    try {
      await this.dao.create({ awid, uid });
    } catch (e) {
      if (e.code !== "uu-app-objectstore/duplicateKey") {
        throw e;
      }
    }

    return { awid, uid };
  }
}

module.exports = new SubscribeAbl();
