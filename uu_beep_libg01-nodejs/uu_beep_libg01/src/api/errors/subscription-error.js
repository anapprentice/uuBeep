"use strict";

const WorkspaceError = require("./beep-error.js");
const SUBSCRIPTION_ERROR_PREFIX = `${WorkspaceError.ERROR_PREFIX}subscription/`;

const Create = {
  UC_CODE: `${SUBSCRIPTION_ERROR_PREFIX}create/`,
  
};

const Delete = {
  UC_CODE: `${SUBSCRIPTION_ERROR_PREFIX}delete/`,
  
};

const Get = {
  UC_CODE: `${SUBSCRIPTION_ERROR_PREFIX}get/`,
  
};

module.exports = {
  Get,
  Delete,
  Create
};
