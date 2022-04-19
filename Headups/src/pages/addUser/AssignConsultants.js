import React,  {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux"
import { getLeadConsultants } from '../../api/add-user/add-user';
import { addConsultantToUserData } from '../../redux/actions/index';
import Moment from 'react-moment';
function AssignConsultants(props) {
  const [consultant, setConsultant] = useState([]);
  const [masterChecked, setMasterChecked] = useState(false);
  const { changeScreen } = props;

  const dispatch = useDispatch();
  const {userConsultant} = useSelector(state => state.addUserStepOneForm)
  const getUserByIdRecord = useSelector((state) => state.getUserByIdRecord.userByIdData);
 
  useEffect(() => {
    getConsultant();
  }, []);
  
  const getConsultant = async () => {
    try {
      let { data } = await getLeadConsultants();
      if (data.status === true && data.statusCode === 200) {
        const resp = data.data;
        if (userConsultant.length) {
        const consultantList = userConsultant.map(item => item._id)
        resp.forEach(item => {
          if(consultantList.includes(item._id)){
            item.selected = true;
          }else{
            item.selected = false;
          }
        });
        setConsultant(resp)
      } else if (getUserByIdRecord && getUserByIdRecord.consultants.length > 0 && consultant && !userConsultant.length) {
      const consultantList = getUserByIdRecord.consultants.map(item => item._id);
      resp.forEach(item => {
        if (Object.values(consultantList).includes(item._id)) {
          item.selected = true;
        } else {
          item.selected = false;
        }
      });
      setConsultant(resp)
      }
    }else {
        setConsultant(data.data)
      }
    } catch (e) { }
  }

  const onMasterCheck = (e) => {
    consultant.map((user) => (user.selected = e.target.checked));
    setMasterChecked(e.target.checked)
  }

  const onItemCheck = (e, item) => {
    const test = consultant.map((user) => {
      if(user._id === item._id){
        user.selected = e.target.checked
      }
      
      return user;
    });
    setConsultant(test)
  }

  const selectConsultants = () => {
    const selectedLeads = consultant.filter(item => item.selected === true);
    
    // if(selectedLeads.length === 0){
    //   alert('please select atleast one consultants');
    // }else{
      // const consultantList = selectedLeads.map(item => item._id)
      dispatch(addConsultantToUserData(selectedLeads))
      changeScreen('assignCompnies')
    // }
  }

  return (
    <>
      {/* table-area-starts-here */}
      <div className="content-area-inner bg-shadow">
         {/* active 3 design */}
        <div className="table-responsive">
          <table className="table table-custom-design">
            <thead>
              <tr>
                <th>
                  <input type="checkbox"
                      className="form-check-input"
                      checked={masterChecked}
                      id="mastercheck"
                      onChange={(e) => onMasterCheck(e)}/>
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
                consultant.map((item, index) => {
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
                      <td>{item.noOfComapnies}</td>
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
            <button className="btn btn-outline-light me-md-2" type="button" onClick={() => changeScreen('assignLeadPartners')}>Previous</button>
            <button className="btn btn-primary" type="button" onClick={() => selectConsultants()}>Done</button>
          </div>
        </div>
      </div>
    </>
  )
}
export default AssignConsultants;