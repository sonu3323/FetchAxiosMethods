import { API_ROUTES } from "../API_ROUTES";
import { apiRoot } from "../root";


export const forgotPassword = (data) => {
    return apiRoot({ 
        url: `/${API_ROUTES.FORGOT_PASSWORD.FORGOT_PASSWORD}`,
        method: 'POST', 
        data 
    });
}