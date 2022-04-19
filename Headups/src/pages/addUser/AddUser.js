import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserInformation from "./UserInformation";
import AssignCompanies from "./AssignCompanies";
import AssignConsultants from "./AssignConsultants";
import AssignLeadPartners from "./AssignLeadPartners";
import Summary from "./Summary";
import { getUserById } from "../../api/add-user/add-user";

import { getUserByIdRowData } from "../../redux/actions";
// const [record, setRecord] = useState({})


function AddUser(props) {
    const dispatch = useDispatch();
    const [currentScreen, setCurrentScreen] = useState("userInformation")
    const userRecord = useSelector((state) => state.userRecord.userRecord);
    const userId = userRecord._id;
    useEffect(() => {
    }, [currentScreen]);
    useEffect(() => {
        if (userId) {
          getUserByIdData();
        }
      }, []);
      const getUserByIdData = async () => {
        try {
          let { data } = await getUserById(userId);
          if (data.status === true && data.statusCode === 200) {
            // setRecord(data.data)
            dispatch(getUserByIdRowData(data.data));
          }
        } catch (e) {
        }
      }
    const changeScreenHandle = (event) => {
        setCurrentScreen(event);
    }
    return (
        <>
            {/* add user code starts from here */}
            {/* heading div start */}
            <div className="row g-0 title-parent">
                <div className="bg-white title-heading">
                    <h4>Add User</h4>
                </div>
            </div>
            {/* heading div end */}
            {/* content div start*/}
            <div className="row g-0 main-content-area">
                <div className="content-area">
                    <div className="stepper-div">
                        <a onClick={(e) => { changeScreenHandle("userInformation") }}><div className="step-child">
                            <div className={currentScreen === "userInformation" ? "active progress_bar" : "progress_bar "}></div>
                            <h6>Step 1</h6>
                            <h5>User Information</h5>
                        </div></a>
                        <a onClick={(e) => { changeScreenHandle("assignLeadPartners") }}> <div className="step-child">
                            <div className={currentScreen === "assignLeadPartners" ? "active progress_bar" : "progress_bar "}></div>
                            <h6>Step 2</h6>
                            <h5>Assign Lead Partners</h5>
                        </div></a>
                        <a onClick={(e) => { changeScreenHandle("assignConsultants") }}><div className="step-child">
                            <div className={currentScreen === "assignConsultants" ? "active progress_bar" : "progress_bar "}></div>
                            <h6>Step 3</h6>
                            <h5>Assign Consultants</h5>
                        </div></a>
                        <a onClick={(e) => { changeScreenHandle("assignCompnies") }}><div className="step-child">
                            <div className={currentScreen === "assignCompnies" ? "active progress_bar" : "progress_bar "}></div>
                            <h6>Step 4</h6>
                            <h5>Assign Companies</h5>
                        </div></a>
                        <a onClick={(e) => { changeScreenHandle("summary") }}><div className="step-child">
                            <div className={currentScreen === "summary" ? "active progress_bar" : "progress_bar "}></div>
                            <h6>Step 5</h6>
                            <h5>Summary</h5>
                        </div></a>
                    </div>
                    {/* <UserInformation />
                    <AssignLeadPartners />
                    <AssignCompanies />
                    <AssignConsultants /> 
                    <Summary /> */}
                    {currentScreen == "userInformation" && <UserInformation changeScreen={changeScreenHandle} />}
                    {currentScreen == "assignLeadPartners" && <AssignLeadPartners changeScreen={changeScreenHandle} />}
                    {currentScreen == "assignCompnies" && <AssignCompanies changeScreen={changeScreenHandle} />}
                    {currentScreen == "assignConsultants" && <AssignConsultants changeScreen={changeScreenHandle} />}
                    {currentScreen == "summary" && <Summary changeScreen={changeScreenHandle} />}
                </div>
            </div>
            {/* content div end */}
            {/* add user code ends here */}
        </>
    )
}
export default AddUser;