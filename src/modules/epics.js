import 'rxjs'   //this line is very important, MUST NOT REMOVE
import { combineEpics } from 'redux-observable'

import * as API from './api'
import { callBlockpassApp } from './blockpass'

export default combineEpics(
    API.getServiceTicket,
    API.getServiceToken,
    callBlockpassApp
)