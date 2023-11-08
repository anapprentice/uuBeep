const { UseCaseError } = require("uu_appg01_core-appserver");

class WorkspaceError extends UseCaseError {
  constructor(dtoOut, paramMap = {}, cause = null) {
    if (paramMap instanceof Error) {
      cause = paramMap;
      paramMap = {};
    }

    super({ dtoOut: dtoOut, paramMap: paramMap, status: 400, cause: cause });
  }
}

module.exports = WorkspaceError;
