import React, { useState, useEffect } from "react";
import validate from "../formComponents/validation";
import renderInputField from '../formComponents/renderInputField';
import { Field, reduxForm, formValueSelector } from "redux-form";


import renderDropDown from '../formComponents/renderDropdown';
import ButtonLoader from "../formComponents/ButtonLoader";
import { userRoles } from "../../constants/userRoles";
import { getCompaines } from '../../api/add-user/add-user';
import { useDispatch, useSelector, connect } from "react-redux";
import { useHistory } from "react-router";
import { addUserStepOneData } from '../../redux/actions/index';
import AssignLeadPartners from "./AssignLeadPartners";


function UserInformation(props) {
  const { handleSubmit, pristine, invalid, changeScreen } = props;

  const [loader, setLoader] = useState(false);
  const history = useHistory();
  const selector = useSelector
  const [allCompanies, setAllCompanies] = useState([])
  const getUserByIdRecord = useSelector((state) => state.getUserByIdRecord.userByIdData);
// const  userLeads  = useSelector(state => state.addUserStepOneForm.addUserStepone);
  const dispatch = useDispatch();
  useEffect(() => {
    getAllCompanies();
  }, []);

  useEffect(() => {
    if(getUserByIdRecord){
      props.autofill('companyId', getUserByIdRecord.companyId ? getUserByIdRecord.companyId._id : "")
      props.autofill('userRoles', getUserByIdRecord.roleId)
      props.autofill('name', getUserByIdRecord.firstName)
      props.autofill('surname', getUserByIdRecord.lastName ? getUserByIdRecord.lastName : "")
      props.autofill('email', getUserByIdRecord.email)
      props.autofill('contactNumber', getUserByIdRecord.contactNumber ? getUserByIdRecord.contactNumber : "")
      props.autofill('location', getUserByIdRecord.location)
    }
  });

  const getAllCompanies = async () => {
    try {
      let { data } = await getCompaines();
      if (data.status === true && data.statusCode === 200) {
        setAllCompanies(data.data)
      }
    } catch (e) { }
  }

  const onSubmit = (request) => {
    console.log(request)
    dispatch(addUserStepOneData(request));
    changeScreen("assignLeadPartners");
  };
  return (
    <>
      <div className="content-area-inner bg-shadow">

        <form className="form-design" autoComplete="off" onSubmit={handleSubmit(onSubmit)} >
          <h4>Select Company & Role</h4>
          <div className="row ">
            <div className="col-md-4">
              <div className="mb-3">
                <label className="form-label">Company Name </label>
                <Field className="form-select" name="companyId"
                  component={renderDropDown} >
                  <option value="">Please select company name</option>
                  {allCompanies && allCompanies.map((item, index) => (
                    <option key={index} value={item._id}>{item.companyName}</option>
                  ))}
                </Field>
              </div>
            </div>
            <div className="col-md-4">
              <div className="mb-3">
                <label className="form-label">User Roles</label>
                {/* <Field className="form-select"  name="userRoles" options={eventTypes} optional="true"
                 component={renderDropDown} /> */}
                <Field className="form-select" name="userRoles"
                  component={renderDropDown} >
                  <option value="">Please select user roles</option>
                  {userRoles.map((item, index) => (
                    <option key={index} value={item.roleId}>{item.roleName}</option>
                  ))}
                </Field>
              </div>
            </div>
          </div>
          <hr />
          <h4>Personal Details</h4>
          <div className="row ">
            <div className="col-md-4">
              <div className="mb-3">
                <label className="form-label">Name</label>
                <Field
                  name="name"
                  placeholder="Name"
                  className="form-control"
                  component={renderInputField}
                  type="text"
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="mb-3">
                <label className="form-label">Surname</label>
                <Field
                  name="surname"
                  placeholder="Surname"
                  className="form-control"
                  component={renderInputField}
                  type="text"
                />
              </div>
            </div>
          </div>
          <div className="row ">
            <div className="col-md-4">
              <div className="mb-3">
                <label className="form-label">Email</label>
                <Field
                  name="email"
                  placeholder="Email"
                  className="form-control"
                  component={renderInputField}
                  type="email"
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="mb-3">
                <label className="form-label">Contact Number</label>
                <div className="contact-info">
                  <select className="form-select" aria-label="Default select example">
                    <option selected>+21</option>
                    <option value="1">+91</option>
                    <option value="2">+65</option>
                    <option value="3">+96</option>
                  </select>
                  <Field
                    name="contactNumber"
                    placeholder="Contact Number"
                    className="form-control"
                    component={renderInputField}
                    type="text"
                  />
                  {/* <input 
                  className="form-control" 
                  placeholder="Hollard" /> */}
                </div>
              </div>
            </div>
          </div>
          <div className="row ">
            <div className="col-md-4">
              <div className="mb-3">
                <label className="form-label">Location</label>
                <Field
                  name="location"
                  placeholder="Location"
                  className="form-control"
                  component={renderInputField}
                  type="text"
                />
              </div>
            </div>
          </div>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end form-btn">
            <button className="btn btn-outline-light me-md-2" type="button">Cancel</button>
            <button className="btn btn-primary" type="submit" disabled={invalid || pristine || loader} >
              {loader ? "Loader..." : "Save"}
              {loader ?
                <>
                  <div className="spinner-border spinner-border-sm ms-2" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </>
                : null}
              {/* <ButtonLoader buttonText={loader ? "Loading..." : "Save"} loaderVisibility={loader}></ButtonLoader>  */}
            </button>

          </div>
        </form>
      </div>
    </>
  )
}

// export default reduxForm({
//   form: "userInformationForm", // a unique name for this form
//   initialValues,
//   validate
// })(UserInformation);

UserInformation = reduxForm({
  form: 'userInformationForm', // a unique identifier for this form,
  enableReinitialize: true,
  validate
})(UserInformation);

const selector = formValueSelector('userInformationForm') // <-- same as form name
UserInformation = connect(state => {
  return {
    initialValues: state.addUserStepOneForm.addUserStepone
  }
})(UserInformation)

export default UserInformation