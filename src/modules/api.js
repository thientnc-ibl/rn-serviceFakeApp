import { ajax } from 'rxjs/observable/dom/ajax'
import { Observable } from 'rxjs'
import * as TYPES from '@actions/types'

const HOST_NAME = 'li1779-214.members.linode.com'    //'172.16.0.203:1337'
const END_POINT = `http://${HOST_NAME}/api`

export const getServiceTicket = (action$) => {
    return action$.ofType(TYPES.GET_TICKET).switchMap(action => {
        const { clientId, destination, xsrfsig } = action.payload
        const data = new FormData()
        data.append('client_id', clientId)
        data.append('destination', destination)
        data.append('xsrfsig', xsrfsig)

        return ajax.post(`${END_POINT}/signin/oauth/ticket/`, data, { 'Content-Type': "multipart/form-data", 'Accept': 'application/json' })
            .catch(error => Observable.of({ error }))
            .map(response => getFulfilled(TYPES.GET_TICKET_DONE, response)).takeUntil(action$.ofType('FETCH_USER_CANCELLED'))
    })
}

export const getServiceToken = (action$) => {
    return action$.ofType(TYPES.GET_AUTH_TOKEN).switchMap(action => {
        const { clientId, clientSecret, authCode } = action.payload
        const data = new FormData()
        data.append('client_id', clientId)
        data.append('client_secret', clientSecret)
        data.append('code', authCode)
        data.append('grant_type', 'authorization_code')

        return ajax.post(`${END_POINT}/oauth2/token/`, data, { 'Content-Type': "multipart/form-data", 'Accept': 'application/json' })
            .catch(error => Observable.of({ error }))
            .map(response => getFulfilled(TYPES.GET_AUTH_TOKEN_DONE, response)).takeUntil(action$.ofType('FETCH_USER_CANCELLED'))
    })
}

const getFulfilled = (actionType, payload) => ({ type: actionType, payload })