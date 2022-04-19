import React,  {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux"
import { getCompaines } from '../../api/add-user/add-user';
import { addCompanyToUserData } from '../../redux/actions/index';
import Moment from 'react-moment';
function AssignCompanies(props) {
  const [company, setCompany] = useState([]);
  const [masterChecked, setMasterChecked] = useState(false);
  const { changeScreen } = props;

  const dispatch = useDispatch();
  const {userCompanies} = useSelector(state => state.addUserStepOneForm)
  const getUserByIdRecord = useSelector((state) => state.getUserByIdRecord.userByIdData);
  console.log("getUserByIdRecord",getUserByIdRecord)
  useEffect(() => {
    getCompanies();
  }, []);
  
  const getCompanies = async () => {
    console.log('ddd')
    try {
      let { data } = await getCompaines();
      if (data.status === true && data.statusCode === 200) {
        const resp = data.data;
        if (userCompanies.length) {
        const companyList = userCompanies.map(item => item._id)
        resp.forEach(item => {
          if(companyList.includes(item._id)){
            item.selected = true;
          }else{
            item.selected = false;
          }
        });
        setCompany(resp)
      }else if(getUserByIdRecord && getUserByIdRecord.companies.length > 0 && company && !userCompanies.length){
        const companyList = getUserByIdRecord.companies.map(item => item._id);
        resp.forEach(item => {
          if (Object.values(companyList).includes(item._id)) {
            item.selected = true;
          } else {
            item.selected = false;
          }
        });
        setCompany(resp)
      }else{
        setCompany(data.data)
      }
      }
    } catch (e) { }
  }

  const onMasterCheck = (e) => {
    company.map((user) => (user.selected = e.target.checked));
    setMasterChecked(e.target.checked)
  }

  const onItemCheck = (e, item) => {
    const test = company.map((user) => {
      if(user._id === item._id){
        user.selected = e.target.checked
      }
      
      return user;
    });
    setCompany(test)
  }

  const selectCompany = () => {
    const selectedLeads = company.filter(item => item.selected === true);
    
    // if(selectedLeads.length === 0){
    //   alert('please select atleast one company');
    // }else{
      // const consultantList = selectedLeads.map(item => item._id)
      dispatch(addCompanyToUserData(selectedLeads))
      changeScreen('summary')
    // }
  }

  return (
    <>
      {/* table-area-starts-here */}
      <div className="content-area-inner bg-shadow">
         {/* active 3 design */}
        <div className="table-responsive">
          <table class="table table-custom-design">
            <thead>
              <tr>
                <th>
                  <input type="checkbox"
                      className="form-check-input"
                      checked={masterChecked}
                      id="mastercheck"
                      onChange={(e) => onMasterCheck(e)}/>
                </th>
                <th scope="col">Company Name</th>
                <th scope="col">Location</th>
                <th scope="col">Industry</th>
                <th scope="col">Employees</th>
                <th scope="col">Date Added </th>
                <th scope="col">Action </th>
              </tr>
            </thead>
            <tbody>
              {
                company.map((item, index) => {
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
                      <td>{item.companyName}</td>
                      <td>{item.location}</td>
                      <td>{item.industry}</td>
                      <td>0</td>
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
            <button className="btn btn-outline-light me-md-2" type="button" onClick={() => changeScreen('assignConsultants')}>Previous</button>
            <button className="btn btn-primary" type="button" onClick={() => selectCompany()}>Done</button>
          </div>
        </div>
      </div>
    </>
  )
}
export default AssignCompanies;