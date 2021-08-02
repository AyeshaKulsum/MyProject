import { getDesignations } from "../../helper/designation"
import ACTIONS from "./actionsList"

const fetchDesignations = data => {
    return {
        type: ACTIONS.FETCH_DESIGNATION,
        payload: data
    }
}

export const fetchDesignationsFromServer = () => {
    return dispatch => {
        getDesignations().then(data => {
            if (!data) {
                console.log('error');
            }
            else {
                dispatch(fetchDesignations(data));
                console.log('des', data);
            }
        })
    }
}