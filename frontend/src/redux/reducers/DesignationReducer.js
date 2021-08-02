import ACTIONS from "../actions/actionsList";

const initialState = [];

const DesignationReducer = (state = initialState, action) => {

    console.log("Coming to Designation Reducer", action)

    const { type, payload } = action;

    switch (type) {

        case ACTIONS.FETCH_DESIGNATION: {

            return payload;

        }

        default: return state;
    }

}

export default DesignationReducer;