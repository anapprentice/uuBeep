import { UuBeeperError } from "../errors/uu-beeper-error";

export class PropertyError extends UuBeeperError {
  constructor(code, message, cause) {
    super(code, message, cause);
  }
}

export default PropertyError;
