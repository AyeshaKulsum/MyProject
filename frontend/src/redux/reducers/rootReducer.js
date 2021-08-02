import { combineReducers } from "redux";
import DesignationReducer from "./DesignationReducer";

const rootReducer = combineReducers({
    designations: DesignationReducer
})

export default rootReducer;