import { API_ROUTES } from "../API_ROUTES";
import { apiRoot } from "../root";

export const signIn =  async (data) => { 
    return await apiRoot({
        url: `/${API_ROUTES.SIGN_IN.LOGIN}`,
        method: 'POST',
        data
    });
}