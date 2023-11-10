//@@viewOn:imports
import { createComponent, PropTypes } from "uu5g05";
import Config from "./config/config.js";
import AudioNotifier from "./audio-notifier";
import DetailView from "./detail-view";
import SubscriptionProvider from "./subscription-provider";
import ConnectionProvider from "./connection-provider";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const Detail = createComponent({
    //@@viewOn:statics
    uu5Tag: Config.TAG + "Detail",
    nestingLevel: ["areaCollection", "area"],
    //@@viewOff:statics

    //@@viewOn:propTypes
    propTypes: {
        baseUri: PropTypes.string.isRequired
    },
    //@@viewOff:propTypes

    //@@viewOn:defaultProps
    defaultProps: {},
    //@@viewOff:defaultProps

    render(props) {
        //@@viewOn:private
        //@@viewOff:private

        //@@viewOn:interface
        //@@viewOff:interface

        //@@viewOn:render
        return (
            <AudioNotifier>
                {(audioHandler) => (
                    <SubscriptionProvider baseUri={props.baseUri}>
                        {({ subscriptionDataObject }) => (
                            <ConnectionProvider baseUri={props.baseUri}>
                                {({ connectionDataObject, connectionCount }) => (
                                    <DetailView baseUri={props.baseUri}
                                                audioHandler={audioHandler}
                                                subscriptionDataObject={subscriptionDataObject}
                                                connectionDataObject={connectionDataObject}
                                                connectionCount={connectionCount}
                                    />
                                )}
                            </ConnectionProvider>
                        )}
                    </SubscriptionProvider>
                )}
            </AudioNotifier>
        );
        //@@viewOff:render
    },
});

//@@viewOn:exports
export { Detail };
export default Detail;
//@@viewOff:exports
