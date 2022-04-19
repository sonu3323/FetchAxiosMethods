import { API_ROUTES } from "../API_ROUTES";
import { apiRoot } from "../root";

export const addUser = (data) => {  
    return apiRoot({ 
        url:  `/${ API_ROUTES.ADD_USER.ADD_USER}`, 
        method: 'POST', 
        data 
    });
}

export const getCompaines = () => {  
    return apiRoot({
        url: `/${ API_ROUTES.GET_COMPAINES.GET_COMPAINES_NAMES}`, 
        method: 'GET'
    });
}

export const getLeadPartners = () => {  
    return apiRoot({
        url: `/${ API_ROUTES.GET_LEAD.GET_LEAD_PARTNER}`, 
        method: 'GET'
    });
}

export const getLeadConsultants = () => {  
    return apiRoot({
        url: `/${ API_ROUTES.GET_CONSULTANT.GET_CONSULTANT_LIST}`, 
        method: 'GET'
    });
}

export const getUsers = () => {  
    return apiRoot({
        url: `/${ API_ROUTES.GET_USERS.GET_USERS}`, 
        method: 'GET'
    });
}

export const getUserById = (id) => {  
    return apiRoot({
        url: `/${API_ROUTES.GET_USER_BY_ID.GET_USER_BY_ID}/${id}`,
        method: "GET"
    });
}

export const deleteUser = (userId) => {  
    return apiRoot({
        url: `/${API_ROUTES.DELETE_USER.DELETE_USER_BY_ID}/${userId}`,
        method: "POST"
    });
}

export const deActivate = (userId,data) => {  
    return apiRoot({
        url: `/${API_ROUTES.DEACTIVATE.DEACTIVATE_USER_BY_UPDATE_STATUS}/${userId}`,
        method: "POST",
        data
    });
}
