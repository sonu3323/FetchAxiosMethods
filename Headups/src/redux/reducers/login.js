import * as types from '../constants/actionType';
const initialState = {
  userEmail: "",
};

const userRecordInitialState = {
  userRecord: ""
}

const userByIdInitialState = {
  userByIdData: ""
}

const addUserInitialState = {
  addUserStepone: {},
  userLeads: [],
  userConsultant: [],
  userCompanies: [],
};
export const userLoginWithEmailReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN:
      //  const userEmail = action.payload;
      return { ...state, userEmail: action.payload };
      break;
    default:
      return state;
  }
};

export const userRecordReducer = (state = userRecordInitialState, action) => {
  switch (action.type) {
    case types.RECORD:
       return { ...state, userRecord: action.payload };
      break;
    default:
      return state;
  }
};

export const getUserByIdRecordReducer = (state = userByIdInitialState, action) => {
  switch (action.type) {
    case types.GETUSERBYIDROWDATA:
       return { ...state, userByIdData: action.payload };
      break;
    default:
      return state;
  }
};

export const addUserStepOneDataReducer = (state = addUserInitialState, action) => {
  switch (action.type) {
    case types.ADDUSERFORM:
      return { ...state, addUserStepone: action.payload };
      break;
    
    case types.ADDLEADTOUSERFORM:
      return {
        ...state,
        userLeads: action.payload
      }
    break;
    case types.ADDCONSULTANTTOUSERFORM:
      return {
        ...state,
        userConsultant: action.payload
      }
      break;
    case types.ADDCOMPANIESTOUSERFORM:
      return {
        ...state,
        userCompanies: action.payload
      }
      break;
    default:
      return state;
  }
};

