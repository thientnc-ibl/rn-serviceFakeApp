import _ from 'lodash'
import uuid from 'uuid/v4'

export const getQueryString = (url = '') => {
    if (!url) return {}
    const rawQueryString = url.replace(/^.*\?/, '')
    return _.chain(rawQueryString).split('&').map(_.ary(_.partial(_.split, _, '='), 1)).fromPairs().value()
}

export const randomUUID = () => (uuid())