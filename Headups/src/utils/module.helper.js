import { userRoles } from "../constants/userRoles";
export const generateRandomPassword = async () => {
    var length = 14,
        charset = "#@_-abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

export const mapUserRole = async (roleId) =>{
    try {
        return userRoles.filter(roles => roles.roleId === roleId)[0].roleName
    } catch (error) {
        console.error({ error })
    }
}
