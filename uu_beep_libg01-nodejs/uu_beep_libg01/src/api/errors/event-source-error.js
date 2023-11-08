"use strict";

const WorkspaceError = require("./beep-error.js");
const EVENT_SOURCE_ERROR_PREFIX = `${WorkspaceError.ERROR_PREFIX}eventSource/`;

const Initiate = {
  UC_CODE: `${EVENT_SOURCE_ERROR_PREFIX}initiate/`,
  
};

const Broadcast = {
  UC_CODE: `${EVENT_SOURCE_ERROR_PREFIX}broadcast/`,
  
};

module.exports = {
  Broadcast,
  Initiate
};
