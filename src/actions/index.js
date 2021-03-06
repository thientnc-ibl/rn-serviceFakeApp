import * as TYPES from './types'

const getServiceTicket = (data) => (dispatch) => {
    dispatch({ type: TYPES.PUT_TICKET_INIT_DATA, payload: { ...data } })
    dispatch({
        type: TYPES.GET_TICKET,
        payload: { ...data }
    })
}

const getServiceToken = (clientId, clientSectet) => (dispatch, getState) => {
    const { authCode } = getState().service
    dispatch({
        type: TYPES.GET_AUTH_TOKEN,
        payload: { authCode, clientId, clientSectet }
    })
}

export const getProfile = () => (dispatch, getState) => {
    dispatch(({ type: TYPES.GET_PROFILE_REQUEST, payload: getState().service.tokens.access_token }))
}

const saveAuthorizationCode = (code) => ({ type: TYPES.SAVE_AUTH_CODE, payload: code })

export default {
    getProfile,
    getServiceTicket,
    getServiceToken,
    saveAuthorizationCode
}