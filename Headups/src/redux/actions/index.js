import * as types from '../constants/actionType';
export const userLoginWithEmail = (email) => {
    return {
        type: types.LOGIN,
        payload: email
    }
}

export const userRecord = (userRecord) => {
  //  console.log("userRecordActionSS",userRecord)
    return {
        type: types.RECORD,
        payload: userRecord
    }
}

export const addUserStepOneData = (adduserFrom) => {
    console.log("adduserFrom",adduserFrom)
    return {
        type: types.ADDUSERFORM,
        payload: adduserFrom
    }
}

export const addLeadsToUserData = (leads) => {
    return {
        type: types.ADDLEADTOUSERFORM,
        payload: leads
    }
}

export const addConsultantToUserData = (consultant) => {
    return {
        type: types.ADDCONSULTANTTOUSERFORM,
        payload: consultant
    }
}

export const addCompanyToUserData = (company) => {
    return {
        type: types.ADDCOMPANIESTOUSERFORM,
        payload: company
    }
}


export const getUserByIdRowData = (getUserByIdRecord) => {
    return {
        type: types.GETUSERBYIDROWDATA,
        payload: getUserByIdRecord
    }
}
