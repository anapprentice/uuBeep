"use strict";
const { DaoFactory } = require("uu_appg01_server").ObjectStore;

class ConnectionService {
  constructor() {
    this.dao = DaoFactory.getDao("connection");
  }

  async delete(ucEnv) {
    const awid = ucEnv.getUri().getAwid();
    const session = ucEnv.getSession();

    const uid = session.getIdentity().getUuIdentity();

    if (uid === "0-0") {
      return {};
    }

    return this.dao.remove({ awid, uid });
  }

  async create(ucEnv) {
    const awid = ucEnv.getUri().getAwid();
    const session = ucEnv.getSession();

    await this.dao.createSchema();

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

module.exports = new ConnectionService();
