import * as TYPES from '@actions/types'

const initialState = {}

export default (state = initialState, action) => {
    let error
    switch (action.type) {
        case TYPES.PUT_TICKET_INIT_DATA:
            const payload = action.payload
            return { ...state, ...payload }
        case TYPES.GET_TICKET_DONE:
            ({ error } = action.payload)
            if (!error) {
                const { as } = action.payload.response
                return {
                    ...state,
                    ticket: as
                }
            }
            return state
        case TYPES.SAVE_AUTH_CODE:
            return { ...state, authCode: action.payload }
        default:
            return state
    }
}