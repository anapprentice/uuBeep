"use strict";

const BeepMainUseCaseError = require("./beep-main-use-case-error.js");
const SUBSCRIBE_ERROR_PREFIX = `${BeepMainUseCaseError.ERROR_PREFIX}subscribe/`;

const Create = {
  UC_CODE: `${SUBSCRIBE_ERROR_PREFIX}create/`,
  
};

module.exports = {
  Create
};
