import { API_ROUTES } from "../API_ROUTES";
import { apiRoot } from "../root";

export const viewUsers = (data) => {  
    return apiRoot({
        url: `/${API_ROUTES.VIEW_USERS.VIEW_USERS}`,
        method: 'GET',
        data
    });
}