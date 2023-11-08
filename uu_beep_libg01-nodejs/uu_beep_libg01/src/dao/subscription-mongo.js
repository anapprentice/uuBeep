"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class SubscriptionMongo extends UuObjectDao {
  async createSchema() {
    await super.createIndex({ awid: 1 });
    await super.createIndex({ awid: 1, uid: 1 }, { unique: true });
  }

  async create(uuObject) {
    return await super.insertOne(uuObject);
  }

  async get(awid, uid) {
    let filter = {
      awid: awid,
      uid: uid,
    };
    return await super.findOne(filter);
  }

  async remove(uuObject) {
    let filter = {
      awid: uuObject.awid,
      uid: uuObject.uid,
    };
    return await super.deleteOne(filter);
  }
}

module.exports = SubscriptionMongo;
