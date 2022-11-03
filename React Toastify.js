
ADD THE TOASTCONTAINER IN THE ROOT COMPONENT ******

import React from "react";
import { toast } from "react-toastify";

const Toast = (message, type) => {
  switch (type) {
    case "success":
      return toast.success(
        <div>
          <p>{message}</p>
        </div>
      );
    case "error":
      return toast.error(
        <div>
          <p>{message}</p>
        </div>
      );
    case "warning":
      return toast.warning(
        <div>
          <p>{message}</p>
        </div>
      );
    default:
      return toast.warning(
        <div>
          <p>Toast not defined...</p>
        </div>
      );
  }
};
export default Toast;
Somewhere in the component:

Toast('Action successfully executed!', 'success');
