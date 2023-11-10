//@@viewOn:imports
import { createComponent, PropTypes, useDataObject, useMemo, useState } from "uu5g05";
import Config from "./config/config.js";
import Calls from "calls";
import ConnectionContext from "./connection-context";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers

const ConnectionProvider = createComponent({
    //@@viewOn:statics
    uu5Tag: Config.TAG + "ConnectionProvider",
    //@@viewOff:statics

    //@@viewOn:propTypes
    propTypes: {
        baseUri: PropTypes.string,
    },
    //@@viewOff:propTypes

    //@@viewOn:defaultProps
    defaultProps: {},
    //@@viewOff:defaultProps

    render(props) {
        //@@viewOn:private
        const [connectionCount, setConnectionCount] = useState(0);
        const connectionDataObject = useDataObject({
            handlerMap: {
                loadPage: handleLoad,
                updateCount: handleUpdateCount,
                increaseCount: handleIncreaseCount,
            },
        });

        async function handleLoad(pageInfo) {
            const dtoIn = {};
            if (pageInfo) dtoIn.pageInfo = pageInfo;
            let listDtoOut = await Calls.Connection.list(dtoIn, props.baseUri);
            return listDtoOut;
        }

        async function handleUpdateCount() {
            let listDtoOut = await Calls.Connection.list({}, props.baseUri);
            setConnectionCount(listDtoOut.pageInfo.total);
        }

        async function handleIncreaseCount(increment = 1) {
            let listDtoOut = await Calls.Connection.list({}, props.baseUri);
            setConnectionCount(listDtoOut.pageInfo.total + increment);
        }

        // There is only 1 atribute now but we are ready for future expansion
        // HINT: Data are wrapped by object for future expansion of values with backward compatibility
        const value = useMemo(() => {
            return { connectionDataObject, connectionCount };
        }, [connectionDataObject]);
        //@@viewOff:private

        //@@viewOn:interface
        //@@viewOff:interface

        //@@viewOn:render
        return (
            <ConnectionContext.Provider value={value}>
                {typeof props.children === "function" ? props.children(value) : props.children}
            </ConnectionContext.Provider>
        );
        //@@viewOff:render
    },
});

//@@viewOn:exports
export { ConnectionProvider };
export default ConnectionProvider;
//@@viewOff:exports
