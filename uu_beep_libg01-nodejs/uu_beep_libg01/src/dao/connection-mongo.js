"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class ConnectionMongo extends UuObjectDao {
  // todo: ttl indexy
  async createSchema() {
    await super.createIndex({ awid: 1 });
  }

  async create(uuObject) {
    return await super.insertOne(uuObject);
  }

  async list(awid, pageInfo) {
    return await super.find({ awid }, pageInfo || {});
  }

  async remove(uuObject) {
    let filter = {
      awid: uuObject.awid,
      uid: uuObject.uid,
    };
    return await super.deleteOne(filter);
  }
}

module.exports = ConnectionMongo;
