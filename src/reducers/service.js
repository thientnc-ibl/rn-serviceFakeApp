import { Alert } from 'react-native'
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
                const { as } = action.payload
                return {
                    ...state,
                    ticket: as
                }
            }
            return { ...state, ticket: null }
        case TYPES.SAVE_AUTH_CODE:
            return { ...state, tokens: {...action.payload} }
        case TYPES.GET_AUTH_TOKEN_DONE:
            ({ error } = action.payload)
            if (error) {
                return { ...state, authorization: null }
            }
            return { ...state, authorization: {...action.payload} }
        case TYPES.GET_PROFILE_DONE:
            if (error) return { ...state, profile: null }
            return { ...state, profile: {...action.payload} }
        default:
            return state
    }
}