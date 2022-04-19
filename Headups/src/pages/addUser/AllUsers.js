import React, { useEffect, useState } from "react";
import { Field, reduxForm } from "redux-form";
import { useHistory } from "react-router";
import renderInputField from '../formComponents/renderInputField'
import renderDropDown from '../formComponents/renderDropdown';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddUser from './AddUser';
import { getUsers, getCompaines } from '../../api/add-user/add-user';
import { userRecord } from '../../redux/actions/index';
import { useDispatch } from "react-redux";
import { userRoles } from "../../constants/userRoles";
import Moment from 'react-moment';
function AllUsers(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [allUsersRecords, setAllUsersRecords] = useState([])
    const [allCompanies, setAllCompanies] = useState([])
    const visibleScreen = (screenName, rowItem) => {
        props.onChangeValue(screenName)
        if (rowItem) { // selected row
            dispatch(userRecord(rowItem)) // user record dispatch for delete, deactive and fetch data by user id 
        
        }
    }
    useEffect(() => {
        getAllUsers();
        getAllCompanies();
    }, []);
    const getAllUsers = async () => {
        try {
            let { data } = await getUsers();
            if (data.status === true && data.statusCode === 200) {
                setAllUsersRecords(data.data)
            } else if (data.status === false && data.statusCode === 401) {
                localStorage.removeItem("token");
                history.push({ pathname: "/" })
            }
        } catch (e) { }
    }
    const getAllCompanies = async () => {
        try {
            let { data } = await getCompaines();
            if (data.status === true && data.statusCode === 200) {
                setAllCompanies(data.data ? data.data : [])
            } else if (data.status === false && data.statusCode === 401) {
                localStorage.removeItem("token");
                history.push({ pathname: "/" })
            }
        } catch (e) { }
    }
    return (
        <>
            <div className="row g-0 title-parent">
                <div className="bg-white title-heading mb-4">
                    <div className=" col-sm-8 d-flex">
                        <div className="form-group w-100 mt-4 mb-3">
                            <h4>Users</h4>
                        </div>
                    </div>
                    <div className="col-sm-3 ms-4 text-end  mt-4 mb-3">
                        <button onClick={(e) => { visibleScreen("addUser") }} className="btn btn-primary" type="button">Add User</button>
                    </div>
                </div>
            </div>
            <div className="row g-0 main-content-area mb-3">
                <div className="content-area">
                    <div className="content-area-inner ">
                        <div className="row">
                            <form className="  d-flex ">
                                <div className="col-sm-4">
                                    <div className="form-group ">
                                        <SearchOutlinedIcon className="form-control-icon mt-2 " />
                                        <Field
                                            name="search"
                                            placeholder="Search"
                                            className="form-control"
                                            component={renderInputField}
                                            type="text" />
                                    </div>
                                </div>
                                <div className="d-grid gap-4 d-md-flex justify-content-md-end w-100">
                                    <div className="col-sm-4">
                                        <div className="form-group ">
                                            <Field className="form-select" name="userRoles"
                                                component={renderDropDown} >
                                                <option value="">Company</option>
                                                {allCompanies.map((item, index) => (
                                                    <option key={index} value={item._id}>{item.companyName}</option>
                                                ))}
                                            </Field>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-group ">
                                            <Field className="form-select" name="userRoles"
                                                component={renderDropDown} >
                                                <option value="">User Roles</option>
                                                {userRoles.map((item, index) => (
                                                    <option key={index} value={item.roleId}>{item.roleName}</option>
                                                ))}
                                            </Field>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row g-0 main-content-area mb-5">
                <div className="content-area">
                    {/* table-area-starts-here */}
                    <div className="content-area-inner bg-shadow mt-2">
                        <div className="table-responsive">
                            <table className="table table-custom-design">
                                <thead>
                                    <tr>
                                        <th scope="col">NAME</th>
                                        <th scope="col">SURNAME</th>
                                        <th scope="col">COMPANY</th>
                                        <th scope="col">LOCATION </th>
                                        <th scope="col">MOBILE NUMBER</th>
                                        <th scope="col">USER ROLE</th>
                                        <th scope="col">DATE ADDED</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {allUsersRecords.length > 0 ?
                                        allUsersRecords.map((item, index) => (
                                            <>
                                                <tr key={item._id}>
                                                    <td>{item.firstName}</td>
                                                    <td>{item.lastName}</td>
                                                    <td>{item.companyId.companyName}</td>
                                                    <td>{item.location}</td>
                                                    <td>{item.contactNumber ? item.contactNumber: '----NA----' }</td>
                                                    <td>{item.roleId}</td>
                                                    <td>
                                                        <Moment format="ddd MMMM DD YYYY">
                                                            {item.createdAt}
                                                        </Moment>
                                                    </td>
                                                    <td>
                                                        <button onClick={(e) => { visibleScreen("viewUser", item) }} className="btn btn-outline-light me-md-2">View</button>
                                                        <button onClick={(e) => { visibleScreen("addUser", item) }} className="btn btn-outline-light">Edit</button>
                                                    </td>
                                                </tr>
                                            </>
                                        ))
                                        : null}
                                </tbody>


                            </table>
                            <div className="d-grid gap-2 d-md-flex justify-content-md-end form-btn mt-4">
                                {/* PAGINATION ADD HERE */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default reduxForm({
    form: "AllUsers",
})(AllUsers);
