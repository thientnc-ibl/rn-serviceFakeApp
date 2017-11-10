import { ajax } from 'rxjs/observable/dom/ajax'
import { Observable } from 'rxjs'
import * as TYPES from '@actions/types'

const HOST_NAME = '172.16.0.203:1337'
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
            .map(response => getTicketFulfilled(response)).takeUntil(action$.ofType('FETCH_USER_CANCELLED'))
    })
}

const getTicketFulfilled = (payload) => ({ type: TYPES.GET_TICKET_DONE, payload })