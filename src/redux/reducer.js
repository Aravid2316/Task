import { SELECTED_SEAT } from './action'
const initialState = {
    value: [],
}
const reducerfunction = (state = initialState, action) => {
    // console.log(action ,'redu');
    switch (action.type) {
        case SELECTED_SEAT: {
            return { ...state, value: action.payload };
        }
        default: {
            return state;
        }
    }
}
export default reducerfunction;   

