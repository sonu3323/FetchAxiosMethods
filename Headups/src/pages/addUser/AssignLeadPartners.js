import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getLeadPartners } from '../../api/add-user/add-user';
import { addLeadsToUserData } from '../../redux/actions/index';
import Moment from 'react-moment';

import { Field, reduxForm } from "redux-form";
import { CompressOutlined } from "@mui/icons-material";
import { getUserById } from "../../api/add-user/add-user";
function AssignLeadPartners(props) {
  const [leads, setLeads] = useState([]);
  const [masterChecked, setMasterChecked] = useState(false);
  const { changeScreen } = props;
  const getUserByIdRecord = useSelector((state) => state.getUserByIdRecord.userByIdData);

  const dispatch = useDispatch();
  const { userLeads } = useSelector(state => state.addUserStepOneForm);
  useEffect(() => {
    getLeads();
  }, []);
  const getLeads = async () => {
    try {
      let { data } = await getLeadPartners();
      if (data.status === true && data.statusCode === 200) {
        const resp = data.data;
        if (userLeads.length) {
          const leadList = userLeads.map(item => item._id);
          resp.forEach(item => {
            if (leadList.includes(item._id)) {
              item.selected = true;
            } else {
              item.selected = false;
            }
          });
          setLeads(resp)
        }
        else if (getUserByIdRecord && getUserByIdRecord.leadPartners.length > 0 && leads && !userLeads.length) {
          const leadList = getUserByIdRecord.leadPartners.map(item => item._id);
          resp.forEach(item => {
            if (Object.values(leadList).includes(item._id)) {
              item.selected = true;
            } else {
              item.selected = false;
            }
          });
          setLeads(resp)
        }
        else {
          setLeads(data.data)
        }
      }
    } catch (e) { }
  }

  const onMasterCheck = (e) => {
    leads.map((user) => (user.selected = e.target.checked));
    setMasterChecked(e.target.checked)
  }

  const onItemCheck = (e, item) => {
    const test = leads.map((user) => {
      if (user._id === item._id) {
        user.selected = e.target.checked
      }

      return user;
    });
    setLeads(test)
  }

  const selectLeads = () => {
    const selectedLeads = leads.filter(item => item.selected === true);

    // if(selectedLeads.length === 0){
    //   alert('please select atleast one lead');
    // }else{
    // const leadList = selectedLeads.map(item => item._id);
    dispatch(addLeadsToUserData(selectedLeads))
    changeScreen('assignConsultants')
    // }
  }

  return (
    <>
      {/* table-area-starts-here */}
      <div className="content-area-inner bg-shadow">
        {/* active 2 design */}
        <div className="table-responsive">
          <table className="table table-custom-design">
            <thead>
              <tr>
                <th>
                  <input type="checkbox"
                    className="form-check-input"
                    checked={masterChecked}
                    id="mastercheck"
                    onChange={(e) => onMasterCheck(e)} />
                </th>
                <th scope="col">NAME</th>
                <th scope="col">SURNAME</th>
                <th scope="col">Number of consultant</th>
                <th scope="col">Date Added </th>
                <th scope="col">Action </th>
              </tr>
            </thead>
            <tbody>
              {
                leads.map((item, index) => {
                  console.log("item.selected render", item.selected)
                  return (
                    <tr key={index}>
                      <td>
                        <input
                          type="checkbox"
                          checked={item.selected}
                          className="form-check-input"
                          id={`rowcheck${item._id}`}
                          onChange={(e) => onItemCheck(e, item)}
                        />
                      </td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.noOfConsultants}</td>
                      <td>
                        <Moment format="ddd MMMM DD YYYY">
                          {item.createdAt}
                        </Moment>
                      </td>
                      <td><a href="" className="btn btn-outline-light me-md-2">View</a><a href="" className="btn btn-outline-light">Edit</a></td>
                    </tr>
                  )
                })
              }

            </tbody>
          </table>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end form-btn">
            <button className="btn btn-outline-light me-md-2" type="button" onClick={() => changeScreen('userInformation')}>Previous</button>
            <button className="btn btn-primary" type="button" onClick={() => selectLeads()}>Done</button>
          </div>
        </div>
      </div>
    </>
  )
}


export default AssignLeadPartners;