import React from "react";
function UserErrorMsg(props){
  //  console.log(props)
    return(
    <>
    <strong className="error">{props.errorMsg}</strong>
    </>
)
}
export default UserErrorMsg;