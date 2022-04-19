import React, { useState } from "react";
import SweetAlert from 'react-bootstrap-sweetalert';
function AlertPopup(props) {
  const { confirmBtnText, title,btnLoader, text, showCancelButton, cancelBtnText, onConfirm, onCancel, type, confirmBtnBgColor } = props;
  const deleteRecord = () => {

  }
  return (
    <>
      <SweetAlert
        type={type}
        showCancel={showCancelButton}
        cancelButtonText={cancelBtnText}
        confirmBtnText={confirmBtnText}
        confirmBtnBsStyle={confirmBtnBgColor}
        title={title}
        onConfirm={onConfirm}
        onCancel={onCancel}
        closeOnClickOutside={false}
        btnSize="sm"
      >
        {text}
      </SweetAlert>
    </>
  )
}
export default AlertPopup;