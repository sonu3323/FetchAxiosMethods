import React, { useState }  from "react";
import PropTypes from 'prop-types'
import renderInputField from '../pages/formComponents/renderInputField'
import { Field } from "redux-form";
import '../styles/buttonStyle.css';
import '../styles/textStyle.css';
import '../styles/loginStyle.css';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import PasswordVisibilityOff from '@mui/icons-material/VisibilityOffOutlined';
import PasswordVisibility from '@mui/icons-material/VisibilityOutlined';
import { generateRandomPassword } from "../utils/module.helper";
const SetPassword = ({ resetPassword,props }) => {
    const eye = <PasswordVisibility  className="eye-eyeSlash-icons"/>;
    const eyeSlash = <PasswordVisibilityOff className="eye-eyeSlash-icons"/>; 
    const [shownPassword,setPassword]=useState(false);
    const [shownRepeatPassword, setRepeatPassword] = useState(false);
    const togglePassword = ({  }) => {
        setPassword(!shownPassword);
    };
    const toggleRepeatPassword = () => {
        setRepeatPassword(!shownRepeatPassword);
    };

    const handleGeneratePassword = async () =>{
        const randomPass = await generateRandomPassword();
        document.getElementById('password').value = randomPass
        document.getElementById('repeatPassword').value = randomPass
        props.autofill('password', randomPass)
        props.autofill('repeatPassword', randomPass)
    }
    let otpInput;
    let passwordPlaceHolder = (resetPassword == true) ? "New Password" : "Set Password"
    if(resetPassword === true){
        otpInput = <div className="col-sm-12 mb-3">
            <div className="input-group">
                <span className="input-group-text custom-icon " >
                    <HttpsOutlinedIcon className=" " />
                </span>
                <Field
                    name="otp"
                    placeholder="One Time Password"
                    className="form-control  custom-input"
                    component={renderInputField}
                    type="text"
                />
            </div>
        </div>
    }
    else{
        otpInput = ''
    }
    return(
        <>
            <p className="note">Password need to be a min of 8 characters including a number and a special character like $#.</p>
            {otpInput}
            <div className="col-sm-12 mb-3">
                <div className=" input-group">
                    <span className="input-group-text custom-icon">
                        <HttpsOutlinedIcon className=""  />
                    </span>
                    <Field
                        name="password"
                        placeholder={passwordPlaceHolder}
                        className="form-control  custom-input"
                        id="password"
                        component={renderInputField}
                        type={shownPassword ? "text" : "password"}
                        />
                        <a onClick={togglePassword}  >
                            { shownPassword ? eye : eyeSlash } 
                        </a>
                </div>
            </div>
            <div className="col-sm-12 mb-3">
                <div className=" input-group">
                    <span className="input-group-text custom-icon"> 
                        <HttpsOutlinedIcon className="" />
                    </span>
                    <Field
                        name="repeatPassword"
                        placeholder="Repeat Password"
                        className="form-control  custom-input"
                        component={renderInputField}
                        type={shownRepeatPassword ? "text" : "password"}
                        id="repeatPassword"
                        />
                        <a  onClick={toggleRepeatPassword}  >
                            { shownRepeatPassword ? eye : eyeSlash } 
                        </a>
                </div>
            </div>
            <div className="col-sm-12 mb-2 mt-1">
                <a className="btn btn btn-outline-primary custom-Btn-outline-primary" onClick={handleGeneratePassword}>Generate Secure Password</a>
            </div>
        </>
    )
    
}
SetPassword.defaultProps = {
    resetPassword: false,
}

SetPassword.propTypes = {
    resetPassword: PropTypes.bool,
}

export default SetPassword
