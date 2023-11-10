//@@viewOn:imports
import {
    createComponent,
    DynamicLibraryComponent,
    useEffect,
    useLsi,
    useRef,
    useSession,
    useState,
    Utils
} from "uu5g05";
import Config from "./config/config.js";
import VisualNotifier from "./visual-notifier";
import Uu5Elements from "uu5g05-elements";
import Calls from "../calls";
import importLsi from "../lsi/import-lsi";
import SubscribersModal from "./subscribers-modal";
import DataObjectStateResolver from "../core/data-object-state-resolver";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers

const Content = createComponent({
    //@@viewOn:statics
    uu5Tag: Config.TAG + "Content",
    //@@viewOff:statics

    //@@viewOn:propTypes
    propTypes: {},
    //@@viewOff:propTypes

    //@@viewOn:defaultProps
    defaultProps: {},
    //@@viewOff:defaultProps

    render(props) {
        //@@viewOn:private
        const { session } = useSession();
        const [eventData, setEventData] = useState(false);
        const [openConnectionsModal, setOpenConnectionsModal] = useState(false);
        const eventSourceRef = useRef();
        const lsi = useLsi(importLsi, [Content.uu5Tag]);
        const { children } = props;

        useEffect(() => {
            async function handleEventNotification() {
                if (props.subscribed) {
                    let connectionUri = Calls.getCommandUri(Calls.CREATE_CONNECTION_UC, props.baseUri);
                    const callToken = await session.getCallToken();
                    connectionUri += `?access_token=${callToken.replace("Bearer ", "")}`;
                    const eventSource = new EventSource(connectionUri);
                    eventSourceRef.current = eventSource;
                    await handleUpdateConnectionCount();
                    eventSource.onmessage = (event) => {
                        let eventDataParsed = JSON.parse(event.data);
                        let eventType = eventDataParsed.type;
                        if (eventType) {
                            props.audioHandler.play(eventType);
                            setEventData(eventDataParsed);
                        }
                    };
                }
            }

            handleEventNotification();
        }, [props.subscribed]);

        //@@viewOff:private

        //@@viewOn:interface

        function handleCloseNotifier() {
            props.audioHandler.stop();
            setEventData(null);
        }

        function handleUpdateConnectionCount() {
            props.connectionDataObject.handlerMap.updateCount();
        }

        function handleCreateSubscription() {
            props.onCreateSubscription();
        }

        function handleDeleteSubscription() {
            eventSourceRef.current.close();
            handleUpdateConnectionCount();
            props.onDeleteSubscription();
        }

        function handleCloseConnectionModal() {
            setOpenConnectionsModal(false);
        }

        function handleOpenConnectionModal() {
            setOpenConnectionsModal(true);
        }

        function handleListConnections(pageInfo) {
            return props.onListConnections(pageInfo);
        }

        //@@viewOff:interface

        //@@viewOn:render
        return (
            <>
                {eventData && <VisualNotifier event={eventData} onClose={handleCloseNotifier} active/>}
                {openConnectionsModal &&
                        <SubscribersModal onList={handleListConnections}
                                          onClose={handleCloseConnectionModal}
                                          connectionCount={props.connectionCount || 0}
                                          shown
                        />
                }

                <Uu5Elements.Button tooltip={props.subscribed ? lsi.tooltipUnsubscribe : lsi.tooltipSubscribe}
                                    icon={props.subscribed ? Config.iconMap.UNSUBSCRIBE : Config.iconMap.SUBSCRIBE}
                                    onClick={props.subscribed ? handleDeleteSubscription : handleCreateSubscription}
                />

                <Uu5Elements.TouchButton notification={props.connectionCount || 0}
                                         icon="uugds-account"
                                         onClick={handleOpenConnectionModal}
                />

                {/*<Content nestingLevel={currentNestingLevel}>{children}</Content>*/}
            </>
        );
        //@@viewOff:render
    },
});

//@@viewOn:exports
export { Content };
export default Content;
//@@viewOff:exports
