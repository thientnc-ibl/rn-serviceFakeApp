import * as TYPES from '@actions/types'

const initialState = {}

export default (state = initialState, action) => {
    let error
    switch (action.type) {
        case TYPES.PUT_TICKET_INIT_DATA:
            const { xsrfsig } = action.payload
            return { ...state, xsrfsig }
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
        default:
            return state
    }
}