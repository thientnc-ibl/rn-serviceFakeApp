import * as TYPES from './types'

const getServiceTicket = (data) => (dispatch) => {
    dispatch({ type: TYPES.PUT_TICKET_INIT_DATA, payload: { ...data } })
    dispatch({
        type: TYPES.GET_TICKET,
        payload: { ...data }
    })
}

export default {
    getServiceTicket
}