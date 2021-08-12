import {createStore , applyMiddleware} from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers";


let enhancer = applyMiddleware(thunk);
if(process.env.NODE_ENV === "development"){
    const {logger}=require(`redux-logger`);
    enhancer = applyMiddleware(thunk,logger);
}

export const configureStore =() => {
    return createStore (rootReducer ,enhancer);
};