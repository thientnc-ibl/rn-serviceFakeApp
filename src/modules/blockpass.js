import { Linking, Alert } from 'react-native'
import Config from 'react-native-config'

import * as TYPES from '@actions/types'

export const callBlockpassApp = (action$) => {
    return action$.ofType(TYPES.GET_TICKET_DONE).mapTo((dispatch, getState) => {
        const { clientId, ticket, xsrfsig } = getState().service
        if (!ticket) {
            Alert.alert('Error', 'Cannot open Blockpass app, check client ID, please')
        } else {
            const url = `app://blockpass/service?client_id=${clientId}&ticket=${ticket}&xsrfsig=${xsrfsig}`
            Linking.canOpenURL(url).then((supported) => {
                if (supported) {
                    return Linking.openURL(url)
                }
            })
        }
        dispatch({ type: TYPES.CALL_BLOCKPASS_DONE })
    })
}