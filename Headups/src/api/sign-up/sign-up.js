import { API_ROUTES } from "../API_ROUTES";
import { apiRoot } from "../root";

export const signUp = (data) => {  
    return apiRoot({ 
        url: `/${API_ROUTES.SIGN_UP.REGISTER}`,
        method: 'POST', 
        data 
    });
}

export const getUserById = (id) => {
    let url = `/${API_ROUTES.SIGN_UP.GET_MEMBER_BY_ID}/${id}`;
    return apiRoot({ url, method: 'GET' });

}