import UuBeepCore from "uu_beepg01-core";
import { testProperties } from "uu5g05-test";

const CONFIG = {
  props: {
    // left: {
    //   values: ["Left as text", <span key="l">Left as JSX</span>, 0],
    // },
  },
  requiredProps: {
    // children: "Children content",
  },
};

describe(`UuBeepCore.Beeper.ConnectionModal`, () => {
  testProperties(UuBeepCore.Beeper.ConnectionModal, CONFIG);
});
