//@@viewOn:imports
import { createVisualComponent, Utils, useState, DynamicLibraryComponent, useEffect } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Config from "./config/config.js";
//@@viewOff:imports

//@@viewOn:constants
const PAGE_SIZE = 1000;
//@@viewOff:constants

//@@viewOn:css
const Css = {
    main: () => Config.Css.css({}),
};
//@@viewOff:css

//@@viewOn:helpers
function renderUser(uuIdentity) {
    return <DynamicLibraryComponent uu5Tag="Plus4U5Elements.PersonItem" props={{ id: uuIdentity, uuIdentity }}/>;
}

//@@viewOff:helpers

const SubscribersModal = createVisualComponent({
    //@@viewOn:statics
    uu5Tag: Config.TAG + "SubscribersModal",
    nestingLevel: ["areaCollection", "area"],
    //@@viewOff:statics

    //@@viewOn:propTypes
    propTypes: {},
    //@@viewOff:propTypes

    //@@viewOn:defaultProps
    defaultProps: {},
    //@@viewOff:defaultProps

    render(props) {
        //@@viewOn:private
        let [uuIdentityList, setUuIdentityList] = useState();
        const { children } = props;
        // let resultList = [];

        useEffect(() => {
            async function handleListConnections() {
                let pageCount = Math.ceil(props.connectionCount / PAGE_SIZE);
                let pageInfo = { pageIndex: 0, pageSize: PAGE_SIZE };
                let promiseList = [];
                for (let i = 1; i <= pageCount; i++) {
                    let currPageInfo = { ...pageInfo };
                    promiseList.push(props.onList(currPageInfo));
                    pageInfo.pageIndex++;
                }
                let responseList = await Promise.all(promiseList);
                let itemList = [];
                responseList.forEach((response) => {
                    itemList.push(...response.itemList)
                })
                // let listResponse = await props.onList(pageInfo);

                let uidSet = new Set();
                itemList.forEach((connection) => uidSet.add(connection.uid));

                setUuIdentityList(Array.from(uidSet));
            }

            handleListConnections();
        }, []);
        //@@viewOff:private

        //@@viewOn:interface
        function handleClose() {
            props.onClose();
        }

        //@@viewOff:interface

        //@@viewOn:render
        return (<Uu5Elements.Modal
            header={"Active subscribers"}
            open={props.shown}
            onClose={handleClose}
        >
            {uuIdentityList?.map((uuIdentity) => {
                return renderUser(uuIdentity);
            })}
        </Uu5Elements.Modal>);
        //@@viewOff:render
    },
});

//@@viewOn:exports
export { SubscribersModal };
export default SubscribersModal;
//@@viewOff:exports
