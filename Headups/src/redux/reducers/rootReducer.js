import { combineReducers } from 'redux';
 import { reducer as formReducer } from 'redux-form'
import { userLoginWithEmailReducer,userRecordReducer ,addUserStepOneDataReducer,getUserByIdRecordReducer} from './login';
const reducers = combineReducers({
    form: formReducer,
    loginForm: userLoginWithEmailReducer,
    userRecord: userRecordReducer,
    addUserStepOneForm: addUserStepOneDataReducer,
    getUserByIdRecord: getUserByIdRecordReducer
})
export default reducers