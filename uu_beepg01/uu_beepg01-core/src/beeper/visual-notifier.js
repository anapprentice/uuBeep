//@@viewOn:imports
import { createVisualComponent, Utils, DynamicLibraryComponent, useLsi, useState, useEffect, PropTypes } from "uu5g05";
import Config from "./config/config.js";
import Uu5Elements from "uu5g05-elements";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const VisualNotifier = createVisualComponent({
    //@@viewOn:statics
    uu5Tag: Config.TAG + "VisualNotifier",
    nestingLevel: ["areaCollection", "area"],
    //@@viewOff:statics

    //@@viewOn:propTypes
    propTypes: {
        onClose: PropTypes.func.isRequired,
        level: PropTypes.string.isRequired,
        active: PropTypes.bool
    },
    //@@viewOff:propTypes

    //@@viewOn:defaultProps
    defaultProps: {
        active: false
    },
    //@@viewOff:defaultProps

    render(props) {
        //@@viewOn:private
        const [blinkingInterval, setBlinkingInterval] = useState();
        const originalTitle = document.title;
        const originalFavIcon = document.querySelector("link[rel*='icon']")?.href;
        useEffect(() => {
            if (props.active) {
                setTitleWithNotification();
                changeFavicon('../assets/notification.ico');
            } else {
                return null;
            }
            return () => (document.title = originalTitle);
        }, []);
        //@@viewOff:private

        //@@viewOn:interface
        function changeFavicon(newFavicon) {
            // Function to change the favicon dynamically
            const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
            link.type = 'image/x-icon';
            link.rel = 'icon';
            link.href = newFavicon;

            // Append the new link element to the document's head
            document.head.appendChild(link);
        }

        function composeNotificationTitlePrefix() {
            return `${props.event.type.toUpperCase()}!!!`;
        }

        function setTitleWithNotification() {
            let titlePrefix = composeNotificationTitlePrefix();
            let titleWithPrefix = `${titlePrefix}${originalTitle}`;
            let intv = window.setInterval(() => {
                document.title = document.title === '' ? titleWithPrefix : '';
            }, 500);
            setBlinkingInterval(intv);
        }

        function handleClose() {
            stopTitleBlinking();
            changeFavicon(originalFavIcon);
            props.onClose();
        }

        // call this to stop the blinking
        function stopTitleBlinking() {
            window.clearInterval(blinkingInterval);
            document.title = originalTitle;
        }

        //@@viewOff:interface

        //@@viewOn:render
        return (
            <Uu5Elements.Modal
                header={props.event.type.toUpperCase()}
                open={props.active}
                onClose={handleClose}
            >
                <DynamicLibraryComponent
                    uu5Tag="Uu5Imaging.Image"
                    props={{
                        src: Config.visualNotificationSrcMap[props.event.type.toUpperCase()],
                        alt: `Notification gif - ${props.event.type.toUpperCase()}`,
                    }}
                />
                <DynamicLibraryComponent uu5Tag="UU5.CodeKit.CodeViewer"
                                         props={{
                                             value: JSON.stringify(props.event, null, 2),
                                             codeStyle: "json"
                                         }}
                />
            </Uu5Elements.Modal>
        );
        //@@viewOff:render
    },
});

//@@viewOn:exports
export { VisualNotifier };
export default VisualNotifier;
//@@viewOff:exports
