"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class ConnectionMongo extends UuObjectDao {
  // ttl indexy
  async createSchema() {
    await super.createIndex({ awid: 1 });
    await super.createIndex({ awid: 1, uid: 1 }, { unique: true });
  }

  async create(uuObject) {
    return await super.insertOne(uuObject);
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
