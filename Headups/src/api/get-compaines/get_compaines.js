import { API_ROUTES } from "../API_ROUTES";
import { apiRoot } from "../root";


export const getCompaines = () => {
    return apiRoot({ 
        url: `/${ API_ROUTES.GET_COMPAINES.GET_COMPAINES_NAMES }`,
        method: 'GET' 
    });
}