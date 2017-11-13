import * as TYPES from './types'

const getServiceTicket = (data) => (dispatch) => {
    dispatch({ type: TYPES.PUT_TICKET_INIT_DATA, payload: { ...data } })
    dispatch({
        type: TYPES.GET_TICKET,
        payload: { ...data }
    })
}

const saveAuthorizationCode = (code) => ({ type: TYPES.SAVE_AUTH_CODE, payload: code })

export default {
    getServiceTicket,
    saveAuthorizationCode
}