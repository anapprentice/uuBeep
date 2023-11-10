import { Environment } from "uu5g05";
import Plus4U5 from "uu_plus4u5g02";

let Calls = {
  CREATE_CONNECTION_UC: "eventSource/initiate",

  async call(method, url, dtoIn, clientOptions) {
    const response = await Plus4U5.Utils.AppClient[method](url, dtoIn, clientOptions);
    return response.data;
  },

  Subscription: {
    get(dtoIn, baseUri) {
      let commandUri = Calls.getCommandUri("subscription/get", baseUri);
      return Calls.call("get", commandUri, dtoIn);
    },

    create(dtoIn, baseUri) {
      let commandUri = Calls.getCommandUri("subscription/create", baseUri);
      return Calls.call("post", commandUri, dtoIn);
    },

    delete(dtoIn, baseUri) {
      let commandUri = Calls.getCommandUri("subscription/delete", baseUri);
      return Calls.call("post", commandUri, dtoIn);
    },
  },

  Connection: {
    list(dtoIn, baseUri) {
      const commandUri = Calls.getCommandUri("connection/list", baseUri);
      return Calls.call("get", commandUri, dtoIn);
    },
  },

  getCommandUri(aUseCase, baseUri) {
    // useCase <=> e.g. "getSomething" or "sys/getSomething"
    // add useCase to the application base URI
    let properBaseUri = Environment.appBaseUri;
    if (baseUri) properBaseUri = !baseUri.endsWith("/") ? baseUri.concat("/") : baseUri;

    let targetUriStr = properBaseUri + aUseCase.replace(/^\/+/, "");

    // override tid / awid if it's present in environment (use also its gateway in such case)
    if (process.env.NODE_ENV !== "production") {
      let env = Environment;
      if (env.tid || env.awid || env.vendor || env.app) {
        let url = Plus4U5.Common.Url.parse(targetUriStr);
        if (env.tid || env.awid) {
          if (env.gatewayUri) {
            let match = env.gatewayUri.match(/^([^:]*):\/\/([^/]+?)(?::(\d+))?(\/|$)/);
            if (match) {
              url.protocol = match[1];
              url.hostName = match[2];
              url.port = match[3];
            }
          }
          if (env.tid) url.tid = env.tid;
          if (env.awid) url.awid = env.awid;
        }
        if (env.vendor || env.app) {
          if (env.vendor) url.vendor = env.vendor;
          if (env.app) url.app = env.app;
          if (env.subApp) url.subApp = env.subApp;
        }
        targetUriStr = url.toString();
      }
    }

    return targetUriStr;
  },
};

export default Calls;
