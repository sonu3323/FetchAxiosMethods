import React , {useState} from 'react';
import "./Navigator.css";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { userLoginWithEmail } from '../../redux/actions/index';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import wLogo from '../../assets/wLogo.png'
import { NavLink } from "react-router-dom";
function Navigator(props) {
    const history = useHistory(); 
    const dispatch = useDispatch();
    const [activeUrl , setActiveUrl] = useState("dashboard");
    const visibleScreen = (screenName) => {
     //   console.log(screenName)
        setActiveUrl(screenName)
        props.onChangeValue(screenName)
    }
    const logout = () => {
        dispatch(userLoginWithEmail(""))
        localStorage.removeItem("token");
        history.push({ pathname: "/" })
    }
    return (
        <>
            <div className="d-flex flex-column flex-shrink-0 p-4 pt-4 text-white bg-Dark" >
                <a href="/" className="d-flex align-items-center mb-3  mb-md-0 me-md-auto text-white text-decoration-none">
                    <img src={wLogo} alt="headsUpLogo" className='mb-5' />
                </a>
                <ul className="nav nav-pills flex-column mb-auto">
                    <li className="nav-item">
                        <a  onClick={(e)=>{visibleScreen("dashboard")}}  className={activeUrl === 'dashboard' ? "nav-link active" : "nav-link "} aria-current="page" data-bs-toggle="collapse">
                            <span><HomeOutlinedIcon className=' iconBgColor' />
                                <span className="ms-2 text-white">Dashboard</span></span>
                        </a>
                    </li>

                    <li className="nav-item">
                        <a href="#submenu2" aria-current="page" data-bs-toggle="collapse" className="nav-link sub-menu-parent">
                            <span className=''>
                                <GroupOutlinedIcon className='iconBgColor text-sm-start' />
                                <span className="ms-2  text-white text-sm-start"> Users</span></span>
                            <span className='text-sm-end'>
                                <KeyboardArrowDownOutlinedIcon className='iconBgColor arrow' />
                            </span>
                        </a>
                        <ul className="collapse nav nav-pills  mb-auto  sub-menu" id="submenu2" >
                            <li className="nav-item">
                                <a onClick={(e)=>{visibleScreen("allUsers")}}  className={activeUrl === 'allUsers' ? "nav-link active" : "nav-link "}>
                                    <span className="text-white">All Users</span> </a>
                            </li>
                            <li className="nav-item">
                                <a onClick={(e)=>{visibleScreen("addUser")}}  className={activeUrl === 'addUser' ? "nav-link active" : "nav-link "}>
                                    <span className="text-white">Add User</span> </a>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <a href="#submenu3" aria-current="page" data-bs-toggle="collapse" className="nav-link sub-menu-parent">
                            <span ><ApartmentOutlinedIcon className='iconBgColor' />
                                <span className="ms-2  text-white">Companies</span></span>
                            <span className='text-sm-end'><KeyboardArrowDownOutlinedIcon className='iconBgColor arrow' /></span>

                        </a>
                        <ul className="collapse nav nav-pills sub-menu mb-auto " id="submenu3" >
                            <li className="nav-item">
                                <a href="#" className="nav-link">
                                    <span className="text-white">All Users</span> </a>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link">
                                    <span className="text-white">Add User</span> </a>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <a href="#submenu4" aria-current="page" data-bs-toggle="collapse" className="nav-link sub-menu-parent">
                            <span ><FeedOutlinedIcon className='iconBgColor' />
                                <span className="ms-2  text-white">Reporting</span></span>
                            <span className='text-sm-end'><KeyboardArrowDownOutlinedIcon className='iconBgColor arrow' /></span>

                        </a>
                        <ul className="collapse nav nav-pills sub-menu mb-auto " id="submenu4">
                            <li className="nav-item">
                                <a href="#" className="nav-link ">
                                    <span className="text-white">View All</span> </a>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link ">
                                    <span className="text-white">Employees</span> </a>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link ">
                                    <span className="text-white">Surveys</span> </a>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link ">
                                    <span className="text-white">Biographical Data</span> </a>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link ">
                                    <span className="text-white">Licencing</span> </a>
                            </li>
                        </ul>
                    </li>
                    {/* <li> <a href="#" className="nav-link text-white"> <i className="fa fa-bookmark"></i><span className="ms-2">Bookmarks</span> </a> </li> */}
                </ul>
            </div>
            <div className="d-flex flex-column  flex-shrink-0 p-4 pt-4 text-white bg-avatar" >
                <a href="#" className="d-flex align-items-center text-white text-decoration-none">
                    <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" />
                    <h6 className=' flex-column text-white'> Andrew Cook </h6>
                </a>
                <p className='ms-4 emailId'>andrew@smokecss.com</p>
                <a onClick={(e) => logout()} className="d-flex align-items-center text-white text-decoration-none logout  pe-5" >
                    <p className="d-flex align-items-center text-white">
                        <ExitToAppOutlinedIcon className=' text-white me-2' /> Sign Out </p> </a>

                {/* <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false"> */}

            </div>

            {/* <div className="row flex-nowrap">
                    <div className=" px-0 bg-Dark">
                        <div className="d-flex flex-column align-items-center align-items-sm-start pt-4 text-white min-vh-100">
                            <a href="/SignUp" className="d-flex align-items-center pb-3 mb-md-0   px-5 me-md-auto text-white text-decoration-none">
                                <span className="fs-5 d-none d-sm-inline text-white">HeadUp</span>
                            </a>

                            <ul className="nav nav-pills mt-4 ms-5 me-5  flex-column mb-sm-auto align-items-center align-items-sm-start" id="menu">
                                 <li className="navItem2 ">
                                    <a href="#" className="nav-link  ps-4 pe-5 align-middle px-0">
                                        <HomeOutlinedIcon className=' iconBgColor'/>
                                        <span className=" d-none d-sm-inline text-white ms-3 w-auto">Dashboard</span>
                                    </a>
                                </li>
                               <li className="navItem2  ">
                                    <a href="#submenu1" data-bs-toggle="collapse" className="nav-link  ps-4 pe-5  px-0 align-middle">
                                    <GroupOutlinedIcon className='iconBgColor'/>
                                    <span className="ms-3 d-none d-sm-inline text-white">Users</span>
                                    </a>
                                    <ul className="collapse  ms-5   nav flex-column" id="submenu1" data-bs-parent="#menu">
                                        <li className=" subMenus">
                                            <a href="#" className="nav-link  ps-4 pe-5 px-0">
                                                 <span className="d-none d-sm-inline text-white">All Users</span> </a>
                                        </li>
                                        <li className=" subMenus">
                                            <a href="#" className="nav-link  ps-4 pe-5 px-0"> 
                                            <span className="d-none d-sm-inline text-white">Add User</span> </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="navItem2">
                                    <a href="#submenu2" data-bs-toggle="collapse" className="nav-link   ps-4 pe-5 px-0 align-middle ">
                                    <ApartmentOutlinedIcon className=' iconBgColor'/>
                                    <span className="ms-3 d-none d-sm-inline text-white">Companies</span></a>
                                    <ul className="collapse nav flex-column  ms-5  " id="submenu2" data-bs-parent="#menu">
                                    <li className="subMenus">
                                            <a href="#" className="nav-link px-0"> 
                                            <span className="d-none d-sm-inline  ps-4 pe-5 text-white">All Users</span> </a>
                                        </li>
                                        <li className="subMenus">
                                            <a href="#" className="nav-link px-0"> 
                                            <span className="d-none d-sm-inline  ps-4 pe-5 text-white">Add User</span></a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="navItem2  ">
                                    <a href="#submenu3" data-bs-toggle="collapse" className="nav-link  ps-4 pe-5 px-0 align-middle ">
                                    <FeedOutlinedIcon className=' iconBgColor'/>
                                    <span className="ms-3 d-none d-sm-inline text-white">Reporting</span></a>
                                    <ul className="collapse nav flex-column ms-5 " id="submenu3" data-bs-parent="#menu">
                                    <li className="subMenus">
                                            <a href="#" className="nav-link px-0"> 
                                            <span className="d-none d-sm-inline  ps-4 pe-5  text-white ">View all</span></a>
                                        </li>
                                        <li className="subMenus">
                                            <a href="#" className="nav-link px-0"> 
                                            <span className="d-none d-sm-inline  ps-4 pe-5 text-white">Employees</span></a>
                                        </li>
                                        <li className="subMenus">
                                            <a href="#" className="nav-link px-0"> 
                                            <span className="d-none d-sm-inline  ps-4 pe-5 text-white">Employees</span> </a>
                                        </li>
                                        <li className="subMenus">
                                            <a href="#" className="nav-link px-0"> 
                                            <span className="d-none d-sm-inline  ps-4 pe-5 text-white">Surveys</span></a>
                                        </li>
                                        <li className="subMenus">
                                            <a href="#" className="nav-link px-0"> 
                                            <span className="d-none d-sm-inline  ps-4 pe-5 text-white ">Biographical Data</span></a>
                                        </li>
                                        <li className="subMenus">
                                            <a href="#" className="nav-link px-0"> 
                                            <span className="d-none d-sm-inline  ps-4 pe-5 text-white">Licencing</span></a>
                                        </li>
                                    </ul>
                                </li>
                                
                            </ul>
                            <hr />
                            <div className="dropdown pb-4">
                                <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src="https://github.com/mdo.png" alt="hugenerd" width="30" height="30" className="rounded-circle" />
                                    <span className="d-none d-sm-inline mx-1">loser</span>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                                    <li><a className="dropdown-item" href="#">New project...</a></li>
                                    <li><a className="dropdown-item" href="#">Settings</a></li>
                                    <li><a className="dropdown-item" href="#">Profile</a></li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li><a className="dropdown-item" href="#">Sign out</a></li>
                                </ul>
                            </div> 
                        </div>
                    </div>

                </div>   */}
        </>
    )
}
export default Navigator