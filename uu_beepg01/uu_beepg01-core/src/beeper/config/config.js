// This file was auto-generated according to the "namespace" setting in package.json.
// Manual changes to this file are discouraged, if values are inconsistent with package.json setting.
import { Utils } from "uu5g05";
import Config from "../../config/config.js";
const TAG = Config.TAG + "Beeper.";

export default {
  ...Config,

  TAG,
  Css: Utils.Css.createCssModule(
    TAG.replace(/\.$/, "")
      .toLowerCase()
      .replace(/\./g, "-")
      .replace(/[^a-z-]/g, ""),
    process.env.NAME + "/" + process.env.OUTPUT_NAME + "@" + process.env.VERSION // this helps preserve proper order of styles among loaded libraries
  ),

  iconMap: {
    SUBSCRIBE: "uugds-bell",
    UNSUBSCRIBE: "uugds-bell-off"
  },
  visualNotificationSrcMap: {
    INFO: "https://media.tenor.com/g7GCc40VwecAAAAi/rafs-rafsdesign.gif",
    WARNING: "https://media.tenor.com/B2gWgYubgPwAAAAC/beep-fast-run.gif",
    ERROR: "https://media.tenor.com/PEDzvMlrdi0AAAAC/fire.gif",
    FATAL: "https://cdnl.iconscout.com/lottie/premium/preview-watermark/connection-failed-3428990-2897608.mp4?h=700"
  },
  audioNotificationSrcMap: {
    // INFO: "https://www.myinstants.com/media/sounds/piuw.mp3"
    INFO: "./assets/uuBeep.m4a",
    WARNING: "https://www.myinstants.com/media/sounds/punch-gaming-sound-effect-hd_RzlG1GE.mp3",
    ERROR: "https://www.myinstants.com/media/sounds/harry-potter-themesong-fail-recorder-cover-1.mp3",
    FATAL: "https://www.myinstants.com/media/sounds/loading-lost-connection-green-screen-with-sound-effect-2_K8HORkT.mp3"
  }
};
