import { ajax } from 'rxjs/observable/dom/ajax'
import { Observable } from 'rxjs'
import * as TYPES from '@actions/types'

const HOST_NAME = 'li1779-214.members.linode.com'   //'172.16.0.203:1337'
//'li1779-214.members.linode.com'
const END_POINT = `http://${HOST_NAME}/api`

export const getServiceTicket = (action$) => {
    return action$.ofType(TYPES.GET_TICKET).switchMap(action => {
        const { clientId, destination, xsrfsig } = action.payload
        const data = new FormData()
        data.append('client_id', clientId)
        data.append('destination', destination)
        data.append('xsrfsig', xsrfsig)

        return Observable.fromPromise(fetch(`${END_POINT}/signin/oauth/ticket/`, {
            method: 'POST',
            headers: { 'Content-Type': "multipart/form-data", 'Accept': 'application/json' },
            body: data
        }).then(response => response.json())).catch(error => Observable.of({ error })).map(response => getFulfilled(TYPES.GET_TICKET_DONE, response)).takeUntil(action$.ofType('FETCH_USER_CANCELLED'))
        // return ajax.post(`${END_POINT}/signin/oauth/ticket/`, data, { 'Content-Type': "multipart/form-data", 'Accept': 'application/json' })
        //     .catch(error => Observable.of({ error }))
        //     .map(response => getFulfilled(TYPES.GET_TICKET_DONE, response)).takeUntil(action$.ofType('FETCH_USER_CANCELLED'))
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

        return Observable.fromPromise(fetch(`${END_POINT}/oauth2/token/`, {
            method: 'POST',
            headers: { 'Content-Type': "multipart/form-data", 'Accept': 'application/json' },
            body: data
        }).then(response => response.json()))
            .catch(error => Observable.of({ error }))
            .map(response => getFulfilled(TYPES.GET_AUTH_TOKEN_DONE, response)).takeUntil(action$.ofType('FETCH_USER_CANCELLED'))

        // return ajax.post(`${END_POINT}/oauth2/token/`, data, { 'Content-Type': "multipart/form-data", 'Accept': 'application/json' })
        //     .catch(error => Observable.of({ error }))
        //     .map(response => getFulfilled(TYPES.GET_AUTH_TOKEN_DONE, response))
        //     .takeUntil(action$.ofType('FETCH_USER_CANCELLED'))
    })
}

export const getProfileRequest = (action$) => {
    return action$.ofType(TYPES.GET_AUTH_TOKEN_DONE).mapTo((dispatch, getState) => {
        const { authorization } = getState().service
        if (!authorization || !authorization.access_token) return
        dispatch({ type: TYPES.GET_PROFILE_REQUEST, payload: authorization.access_token })
    })
}

export const getProfile = (action$) => {
    return action$.ofType(TYPES.GET_PROFILE_REQUEST).switchMap(action => {
        const access_token = action.payload

        return Observable.fromPromise(fetch(`${END_POINT}/oauth2/profile/`, {
            method: 'POST',
            headers: { 'Accept': 'application/json' }
        }).then(response => response.json()))
            .catch(error => Observable.of({ error }))
            .map(response => getFulfilled(TYPES.GET_PROFILE_DONE, response)).takeUntil(action$.ofType('FETCH_USER_CANCELLED'))
        // return ajax.post(`${END_POINT}/oauth2/profile/`, null, { 'Accept': 'application/json', 'Authorization': access_token.replace('ya29.', '') })
        //     .catch(error => Observable.of({ error }))
        //     .map(response => getFulfilled(TYPES.GET_PROFILE_DONE, response)).takeUntil(action$.ofType('FETCH_USER_CANCELLED'))
    })
}

const getFulfilled = (actionType, payload) => ({ type: actionType, payload })