import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
function Protected(props) {
    const history = useHistory();
    let Cmp = props.cmp;
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            history.push({ pathname: "/" })
        }
    }, [])
    return(
        <>
        <Cmp/>
        </>
    )
}
export default Protected;