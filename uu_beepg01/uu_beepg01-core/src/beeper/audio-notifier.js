//@@viewOn:imports
import {
    createComponent,
    useRef,
    PropTypes
} from "uu5g05";
import Config from "./config/config.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const AudioNotifier = createComponent({
    //@@viewOn:statics
    uu5Tag: Config.TAG + "AudioNotifier",
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
        const audioRef = useRef();
        const handlerMap = {
            play: handlePlay,
            stop: handleStop
        };
        //@@viewOff:private

        //@@viewOn:interface

        function handlePlay(eventLevel) {
            audioRef.current.src = Config.audioNotificationSrcMap[eventLevel.toUpperCase()];
            audioRef.current.play(); // Play the audio
            setTimeout(function () {
                handleStop(); // Stop the audio
            }, 10000);
        }

        function handleStop() {
            audioRef.current.pause(); // Stop the audio
        }

        //@@viewOff:interface

        //@@viewOn:render
        return (<>
                <audio ref={audioRef}
                       preload="auto"
                       loop
                />
                {typeof props.children === "function" ? props.children(handlerMap) : props.children}
            </>
        );
        //@@viewOff:render
    },
});

//@@viewOn:exports
export { AudioNotifier };
export default AudioNotifier;
//@@viewOff:exports
