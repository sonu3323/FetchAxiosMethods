import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import './SignUp.css';
import '../../styles/buttonStyle.css';
import '../../styles/textStyle.css';
import '../../styles/loginStyle.css';
import Logo from '../logo/Logo';
import validate from "../formComponents/validation";
import { Field, reduxForm } from "redux-form";
import checkBoxField from "../formComponents/checkBoxField";
import { useParams } from "react-router-dom";
import { getUserById, signUp } from "../../api/sign-up/sign-up";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink } from "react-router-dom";
import SetPassword from "../../shared.components/user.password";
function SignUp(props) {
  const { handleSubmit, pristine, invalid, } = props;
  const history = useHistory();
  const params = useParams();
  const [memberDetails, setMemberDetails] = useState(null);
  const [loader, setLoader] = useState(false);
  const [signUpScreenVisibility, setSignUpScreenVisibility] = useState(false);
  const [userAlreadyInvited, setUserAlreadyInvited] = useState(false);
  const [alreadyUserInvitedMsg, setAlreadyUserInvitedMsg] = useState("");
  useEffect(() => {
    if (params.id) {
      signUpHandler();
    } else {
      history.replace('/');
    }
  }, []);

  const signUpHandler = async () => {
    try {
      let { data } = await getUserById(params.id);
      if (data.status === false && data.statusCode === 404) {
        setUserAlreadyInvited(true);
        setSignUpScreenVisibility(false);
        setAlreadyUserInvitedMsg(data.statusMessage);
        //toast.error(data.statusMessage, { autoClose: 10000, position: toast.POSITION.TOP_RIGHT, draggable: false })
      }
      else {
        setUserAlreadyInvited(false);
        setSignUpScreenVisibility(true);
        setAlreadyUserInvitedMsg("")
        setMemberDetails(data.data);
      }
    } catch (e) {
      setUserAlreadyInvited(false);
      setSignUpScreenVisibility(true);
      setAlreadyUserInvitedMsg("")
      toast.warning(e, { autoClose: 10000, position: toast.POSITION.TOP_RIGHT, draggable: false })
    }
  }

  // const forgotYourPassword = () => {
  //   history.push({
  //     pathname: "/forgotPassword",
  //   });
  // }
  const login = () => {
    history.push({
      pathname: "/",
    });
  }
  const onSubmit = async (reqData) => {
    try {
      setLoader(true);
      reqData.email = memberDetails ? memberDetails.email : '';
      const { data } = await signUp({ "email": reqData.email, "password": reqData.password });
      if (data.status === true && data.statusCode === 200) {
        setLoader(false);
        toast.success(data.statusMessage, { autoClose: 10000, position: toast.POSITION.TOP_RIGHT, draggable: false })
        history.push({ pathname: "/" })
      }
      else {
        setLoader(false);
        toast.error(data.statusMessage, { autoClose: 10000, position: toast.POSITION.TOP_RIGHT, draggable: false })
      }
    } catch (e) {
      setLoader(false);
      toast.warning(e, { autoClose: 10000, position: toast.POSITION.TOP_RIGHT, draggable: false })
    }
  };
  return (
    <>
      <div className="container">
        <div className="row justify-content-md-center ">
          <div className="col col-sm-offset-3  col-sm-6">
            <div className="row custom-mt-70">
              <div className="col-sm-12 text-center">
                <Logo></Logo>
                <h4 className="mb-4 mt-3">{signUpScreenVisibility ? "Create your account" : ""} </h4>
              </div>
            </div>
            {signUpScreenVisibility ?
                <div className="row custom-card-Layout mb-5">

                  <p className="text-center note">
                    <strong>You have been Invited to  {memberDetails?.companyId.companyName || "--"}</strong>
                  </p>
                  <div className="d-grid gap-3 mb-2">
                    <div className="p-2 bg-light border">
                      <div className="col-sm-12 signUpCardsOutlayer">
                        <div className="row">
                          <div className="col-sm-6 col-md-6 col-xs-12  mb-2 mt-1">
                            <p className=" signUpCardsHeading text-uppercase">
                              name
                            </p>
                            <strong className="signUpCardsHeadingValue">
                              {memberDetails?.firstName || "--"}
                            </strong>
                          </div>
                          <div className="col-sm-6  col-md-6 col-xs-12  mb-2 mt-1">
                            <p className="signUpCardsHeading text-uppercase">
                              surname
                            </p>
                            <strong className="signUpCardsHeadingValue">
                              {memberDetails?.lastName || "--"}
                            </strong>
                          </div>
                          <div className="col-sm-6 col-md-6 col-xs-12 mb-2 mt-1">
                            <p className="signUpCardsHeading text-uppercase">
                              {" "}
                              USERNAME
                            </p>
                            <strong className="signUpCardsHeadingValue">
                              {memberDetails?.username || "--"}
                            </strong>
                          </div>
                          <div className="col-sm-6 col-md-6 col-xs-12  mb-2 mt-1">
                            <p className="signUpCardsHeading text-uppercase">
                              {" "}
                              EMAIL
                            </p>
                            <strong className="signUpCardsHeadingValue">
                              {memberDetails?.email || "--"}
                            </strong>
                          </div>
                          <div className="col-sm-6 col-md-6 col-xs-12 mb-2 mt-1">
                            <p className="signUpCardsHeading text-uppercase">
                              LOCATION
                            </p>
                            <strong className="signUpCardsHeadingValue">
                              {memberDetails?.location || "--"}
                            </strong>
                          </div>
                          <div className="col-sm-6  col-md-6 col-xs-12 mb-2 mt-1">
                            <p className="signUpCardsHeading text-uppercase">
                              COMPANY
                            </p>
                            <strong className="signUpCardsHeadingValue">
                              {memberDetails?.companyId.companyName || "--"}
                            </strong>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <form
                    className="row "
                    autoComplete="off"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <SetPassword resetPassword={false} props={props} />
                    <div className="col-sm-12  mb-3 mt-1">
                      <div className="row ">
                        <div className=" col-sm-7 col-md-7 col-xs-12 text-sm-start">
                          <Field
                            name="termsAndConditions"
                            type="checkbox"
                            className="form-check-input me-2 "
                            component={checkBoxField}
                          />
                          <label className="custom-link-black ">
                            <NavLink
                              className="text-decoration-none custom-link-black"
                              to="/termsAndConditions"
                              target="_blank"
                            >
                              I agree to the terms and conditions
                            </NavLink>
                          </label>
                        </div>
                        {/* <div className=" col-sm-5 col-md-5 col-xs-12  mb-2 text-sm-end">
                          <a
                            href="#"
                            onClick={(e) => forgotYourPassword()}
                            className="text-decoration-none custom-link-primary "
                          >
                            Forgot your Password?
                          </a>
                        </div> */}
                      </div>
                    </div>
                    <div className="col-sm-12 custom-Btn-Disabled w-100">
                      <button
                        type="submit"
                        disabled={pristine | invalid | loader}
                        className="btn btn-primary w-100 custom-Btn-Primary"
                      >
                        {loader ? "Loader..." : "Accept Invitation"}
                        {loader ? (
                          <>
                            <div
                              className="spinner-border spinner-border-sm ms-2"
                              role="status"
                            >
                              <span className="visually-hidden">Loading...</span>
                            </div>
                          </>
                        ) : null}
                      </button>
                    </div>
                  </form>
                </div>
              : null}
            {userAlreadyInvited ?
              <div className="row custom-card-Layout mb-5">
                <strong className="text-center ">{alreadyUserInvitedMsg} </strong>
                <div className="col-sm-12 custom-Btn-Disabled w-100">
                  <button type="button" onClick={(e) => login()} className="btn btn-primary w-100 custom-Btn-Primary mt-3">Login</button>
                </div>
              </div> : null}
          </div>
        </div>
      </div>
    </>
  );
}
export default reduxForm({
  form: "signUpForm",
  validate // a unique name for this form
})(SignUp);
