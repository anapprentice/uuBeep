//@@viewOn:imports
import { createVisualComponent, PropTypes, useState, useEffect } from "uu5g05";
import { useAlertBus } from "uu5g05-elements";
import Config from "./config/config.js";
import BeeperContent from "./content";
import DataObjectStateResolver from "../core/data-object-state-resolver";
//@@viewOff:imports

//@@viewOn:constants

//@@viewOff:constants

//@@viewOn:css
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const DetailView = createVisualComponent({
    //@@viewOn:statics
    uu5Tag: Config.TAG + "DetailView",
    nestingLevel: ["areaCollection", "area"],
    //@@viewOff:statics

    //@@viewOn:propTypes
    propTypes: {
        audioHandler: PropTypes.object.isRequired,
        subscriptionDataObject: PropTypes.object.isRequired,
        connectionDataObject: PropTypes.object.isRequired,
    },
    //@@viewOff:propTypes

    //@@viewOn:defaultProps
    defaultProps: {},
    //@@viewOff:defaultProps

    render(props) {
        //@@viewOn:private
        const [subscribed, setSubscribed] = useState(false);
        // const [connectionCount, setConnectionCount] = useState(false);
        const { addAlert } = useAlertBus();
        useEffect(() => {
            async function checkSubscription() {
                let subscription = await handleGetSubscription();
                setSubscribed(!!subscription);
                await handleUpdateConnectionCount();
                // setConnectionCount(connections.pageInfo.total);
            }

            checkSubscription();
        }, []);

        //@@viewOff:private

        //@@viewOn:interface
        function showError(error) {
            addAlert({
                message: `Unexpected error - ${error}`,
                priority: "error",
            });
        }

        async function handleUpdateConnectionCount() {
            try {
                return await props.connectionDataObject.handlerMap.updateCount();
            } catch (error) {
                DetailView.logger.error("Error getting connection count", error);
                showError(error);
            }
        }

        async function handleListConnections(pageInfo) {
            try {
                return await props.connectionDataObject.handlerMap.loadPage(pageInfo);
            } catch (error) {
                DetailView.logger.error("Error loading connection list", error);
                showError(error);
            }
        }

        async function handleGetSubscription() {
            try {
                return await props.subscriptionDataObject.handlerMap.get();
            } catch (error) {
                DetailView.logger.error("Error getting subscription", error);
                showError(error);
            }
        }

        async function handleCreateSubscription() {
            try {
                await props.subscriptionDataObject.handlerMap.create();
                setSubscribed(true);
            } catch (error) {
                DetailView.logger.error("Error creating subscription", error);
                showError(error);
            }
        }

        async function handleDeleteSubscription() {
            try {
                await props.subscriptionDataObject.handlerMap.delete();
                setSubscribed(false);
            } catch (error) {
                DetailView.logger.error("Error creating subscription", error);
                showError(error);
            }
        }

        //@@viewOff:interface

        //@@viewOn:render
        return (
            <DataObjectStateResolver dataObject={props.subscriptionDataObject}>
                <BeeperContent baseUri={props.baseUri}
                               subscriptionDataObject={props.subscriptionDataObject}
                               connectionDataObject={props.connectionDataObject}
                               onListConnections={handleListConnections}
                               subscribed={subscribed}
                               connectionCount={props.connectionCount}
                               audioHandler={props.audioHandler}
                               onCreateSubscription={handleCreateSubscription}
                               onDeleteSubscription={handleDeleteSubscription}
                />
            </DataObjectStateResolver>
        );
        //@@viewOff:render
    },
});

//@@viewOn:exports
export { DetailView };
export default DetailView;
//@@viewOff:exports
