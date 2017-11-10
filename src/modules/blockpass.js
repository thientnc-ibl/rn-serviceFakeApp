import { Linking } from 'react-native'
import Config from 'react-native-config'

import * as TYPES from '@actions/types'

export const callBlockpassApp = (action$) => {
    return action$.ofType(TYPES.GET_TICKET_DONE).mapTo((dispatch, getState) => {
        const { service } = getState()
        const url = `app://blockpass/service?client_id=${Config.CLIENT_ID}&ticket=${service.ticket}&xsrfsig=${service.xsrfsig}`
        Linking.canOpenURL(url).then((supported) => {
            if (supported){
                return Linking.openURL(url)
            }
        })
        dispatch({ type: TYPES.CALL_BLOCKPASS_DONE })
    })
}