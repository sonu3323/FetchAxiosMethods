import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { addUser } from "../../api/add-user/add-user";
import { useHistory } from "react-router";
import { toast } from 'react-toastify';
import Moment from 'react-moment';
function Summary(props) {
  const { userLeads, userConsultant, addUserStepone, userCompanies } = useSelector(state => state.addUserStepOneForm);
  const [screen, setScreen] = useState('first');
  const [table, setTable] = useState([]);
  const { changeScreen } = props;
  const history = useHistory();

  useEffect(() => {
    if (screen === 'first') {
      setTable(userLeads);
    }
    else if (screen === 'second') {
      setTable(userConsultant);
    }
    else if (screen === 'third') {
      setTable(userCompanies);
    }
  }, [screen])

  const saveRecords = async () => {
    try {
      const leadList = userLeads.map(item => item._id);
      const consultantList = userConsultant.map(item => item._id);
      const companyList = userCompanies.map(item => item._id);

      const formData = {
        "firstName": addUserStepone.name,
        "lastName": addUserStepone.surname,
        "username": `${addUserStepone.name}_${addUserStepone.surname}${Math.floor((Math.random() * 1000) + 1)}`,
        "email": addUserStepone.email,
        "companyId": addUserStepone.companyId,
        "location": addUserStepone.location,
        "roleId": addUserStepone.userRoles,
        "contactNumber": addUserStepone.contactNumber,
        "companies": companyList,
        "leadPartners": leadList,
        "consultants": consultantList,
        //"employeeId":"624e7f08a617c05141e46ba1",
        "organizationId": addUserStepone.companyId
      }
      const { data } = await addUser(formData);
      if (data.status === true && data.statusCode === 200) {
        //setLoader(false);
        history.push({ pathname: "/Dashboard" })
        toast.success(data.statusMessage, { autoClose: 10000, position: toast.POSITION.TOP_RIGHT, draggable: false })
      }
      else {
        // setLoader(false);
        toast.error(data.statusMessage, { autoClose: 10000, position: toast.POSITION.TOP_RIGHT, draggable: false })
      }
    } catch (e) {
      //setLoader(false);
      toast.warning(e, { autoClose: 10000, position: toast.POSITION.TOP_RIGHT, draggable: false })
    }
  }

  return (
    <>
      <div className="content-area-inner bg-shadow">
        {/* active 5 design */}
        <div className="row">
          <div className="col-md-9">
            <ul className="data-details">
              <li>
                <label>NAME</label>
                <h5>{addUserStepone.name}</h5>
              </li>
              <li>
                <label>SURNAME</label>
                <h5>{addUserStepone.surname}</h5>
              </li>
              <li>
                <label>EMAIL</label>
                <h5>{addUserStepone.email}</h5>
              </li>
              <li>
                <label>CONTACT NUMBER </label>
                <h5>{addUserStepone.contactNumber}</h5>
              </li>
              <li>
                <label>LOCATION</label>
                <h5>{addUserStepone.location}</h5>
              </li>
              <li>
                <label>ORGANIZATION</label>
                <h5>{addUserStepone.companyName}</h5>
              </li>
              <li>
                <label>USER ROLE</label>
                <h5>{addUserStepone.userRoles}</h5>
              </li>
            </ul>
          </div>
        </div>

      </div>
      <div className="stepper-div">
        <div className="step-child" onClick={() => setScreen('first')}>
          <h5>Lead Partners</h5>
          <div className={"progress_bar " + (screen === 'first' ? 'active' : '')}></div>
        </div>
        <div className="step-child" onClick={() => setScreen('second')}>
          <h5>Consultants</h5>
          <div className={"progress_bar " + (screen === 'second' ? 'active' : '')}></div>
        </div>
        <div className="step-child" onClick={() => setScreen('third')}>
          <h5>Compaines</h5>
          <div className={"progress_bar " + (screen === 'third' ? 'active' : '')}></div>
        </div>
      </div>
      {/* table-area-starts-here */}
      <div className="content-area-inner bg-shadow mt-2">
        <div className="table-responsive">
          {screen === 'first' || screen === 'second' ?
            <>
              <table className="table table-custom-design mb-3">
                <thead>
                  <tr>
                    <th scope="col">NAME</th>
                    <th scope="col">SURNAME</th>
                    <th scope="col">Number of consultant</th>
                    <th scope="col">Date Added </th>
                    <th scope="col">Action </th>
                  </tr>
                </thead>
                <tbody>
                  {table.length > 0 ?
                    table.map((item, index) => (
                      <>
                        <tr key={index}>
                          <td>{item.firstName}</td>
                          <td>{item.lastName}</td>
                          <td>{item.noOfConsultants ? item.noOfConsultants : 0}</td>
                          <td>
                            <Moment format="ddd MMMM DD YYYY">
                              {item.createdAt}
                            </Moment>
                          </td>
                          <td><a href="" className="btn btn-outline-light me-md-2">View</a><a href="" className="btn btn-outline-light">Edit</a></td>
                        </tr>
                      </>
                    ))
                    :
                    <><tr>
                      <td></td>
                      <td></td>
                      <td className="text-center">No data found</td>
                      <td></td>
                      <td></td>
                    </tr></>}
                </tbody>
              </table>
            </>
            : null}
      {/* start compaines table */}
      {screen === 'third' ?
        <>
          <table className="table table-custom-design mb-3">
            <thead>
              <tr>
                <th scope="col">COMPANY NAME</th>
                <th scope="col">LOCATION</th>
                <th scope="col">INDUSTRY</th>
                <th scope="col">EMPLOYEES</th>
                <th scope="col">DATE ADDED </th>
                <th scope="col">Action </th>
              </tr>
            </thead>
            <tbody>
              {table.length > 0 ?
                table.map((item, index) => (
                  <>
                    <tr key={item._id}>
                      <td>{item.companyName}</td>
                      <td>{item.location}</td>
                      <td>{item.industry}</td>
                      <td>{item.employees ? item.employees : 0}</td>
                      <td><Moment format="ddd MMMM DD YYYY">
                        {item.createdAt}
                      </Moment></td>
                      <td>
                        <a href="#" className="btn btn-outline-light me-md-2">View</a>
                        <a href="#" className="btn btn-outline-light">Edit</a>
                      </td>
                    </tr>
                  </>
                ))
                :
                <><tr>
                  <td></td>
                  <td></td>
                  <td className="text-center">No data found</td>
                  <td></td>
                  <td></td>
                </tr></>}
            </tbody>
          </table>
        </>
        : null}
      <div className="d-grid gap-2 d-md-flex justify-content-md-end form-btn">
        <button className="btn btn-outline-light me-md-2" type="button" onClick={() => changeScreen('assignCompnies')}>Previous</button>
        <button className="btn btn-primary" type="button" onClick={() => saveRecords()}>Done</button>
      </div>
    </div>
      </div >
    </>
  )
}
export default Summary;