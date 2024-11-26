import {useContext, useEffect} from "react";
import {LaymanContext} from "react-layman";

export default function LaymanDebugger() {
    const contextData = useContext(LaymanContext);

    useEffect(() => {
        console.log(contextData);
    }, [contextData]);

    return <></>;
}
