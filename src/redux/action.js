export const SELECTED_SEAT = "SELECTED_SEAT";

export const Selectedseats = (val) => {
    console.log('action page',val);
    try {
        return  (dispatch) => {
            dispatch({ type: SELECTED_SEAT, payload: val })
        }
    } catch (err) {
        console.log(err);
    }
}