//@@viewOn:imports
import { createComponent, PropTypes, useSession, useDataObject, useMemo } from "uu5g05";
import Config from "./config/config.js";
import Calls from "calls";
import SubscriptionContext from "./subscription-context";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers

const SubscriptionProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "SubscriptionProvider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    baseUri: PropTypes.string.isRequired,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { identity } = useSession();
    const subscriptionDataObject = useDataObject({
      handlerMap: {
        get: handleGet,
        create: handleCreate,
        delete: handleDelete,
      },
    });
    async function handleGet() {
      if (identity) {
        return await Calls.Subscription.get({}, props.baseUri);
      } else {
        return 0;
      }
      // return async () => {
      //   return { uuIdentity: "0-1" }
      // };
    }
    async function handleCreate(values) {
      const dtoOut = await Calls.Subscription.create({}, props.baseUri);
      // const dtoOut = { uuIdentity: "0-1" };
      return dtoOut;
    }
    async function handleDelete(values) {
      const dtoOut = await Calls.Subscription.delete({}, props.baseUri);
      // const dtoOut = {};
      return dtoOut;
    }
    // There is only 1 atribute now but we are ready for future expansion
    // HINT: Data are wrapped by object for future expansion of values with backward compatibility
    const value = useMemo(() => {
      return { subscriptionDataObject };
    }, [subscriptionDataObject]);
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <SubscriptionContext.Provider value={value}>
        {typeof props.children === "function" ? props.children(value) : props.children}
      </SubscriptionContext.Provider>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { SubscriptionProvider };
export default SubscriptionProvider;
//@@viewOff:exports
