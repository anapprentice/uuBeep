"use strict";

const WorkspaceError = require("./beep-error.js");
const CONNECTION_ERROR_PREFIX = `${WorkspaceError.ERROR_PREFIX}connection/`;

const List = {
  UC_CODE: `${CONNECTION_ERROR_PREFIX}list/`,
  
};

module.exports = {
  List
};
