"use strict";

const BeepMainUseCaseError = require("./beep-main-use-case-error.js");
const EVENT_ERROR_PREFIX = `${BeepMainUseCaseError.ERROR_PREFIX}event/`;

const Trigger = {
  UC_CODE: `${EVENT_ERROR_PREFIX}trigger/`,
  
};

module.exports = {
  Trigger
};
