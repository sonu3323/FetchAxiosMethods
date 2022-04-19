import { API_ROUTES } from "../API_ROUTES";
import { apiRoot } from "../root";

export const resetPassword = (data) => {
    return apiRoot({ 
        url: `/${ API_ROUTES.RESET_PASSWORD.RESET_PASSWORD }`,
        method: 'POST', 
        data 
    });
}