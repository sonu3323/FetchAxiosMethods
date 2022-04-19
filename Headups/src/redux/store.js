import { createStore } from 'redux';
import rootReducers from "./reducers/rootReducer"

const store = createStore(rootReducers, {}, window.__REDUX_DEVTOOLS_EXTENSION_ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE_());

export default store;