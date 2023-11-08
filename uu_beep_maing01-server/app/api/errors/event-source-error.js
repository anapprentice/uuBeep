"use strict";

const BeepMainUseCaseError = require("./beep-main-use-case-error.js");
const EVENT_SOURCE_ERROR_PREFIX = `${BeepMainUseCaseError.ERROR_PREFIX}eventSource/`;

const Info = {
  UC_CODE: `${EVENT_SOURCE_ERROR_PREFIX}info/`,
  
};

const Trigger = {
  UC_CODE: `${EVENT_SOURCE_ERROR_PREFIX}trigger/`,
  
};

module.exports = {
  Trigger,
  Info
};
