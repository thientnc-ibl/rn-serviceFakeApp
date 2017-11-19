import React, { Component } from 'react'
import { AppState, View, Linking, DeviceEventEmitter } from 'react-native'
import { connect } from 'react-redux'

import actions from '@actions'
import * as StringUtils from '@utils/strings'

class Listener extends Component {

    componentDidMount() {
        // Linking.addEventListener('url', this._handleOpenURL)
        // AppState.addEventListener('change', this._handleAppStateChange)
        DeviceEventEmitter.addListener('url', this._handleOpenURL)
    }

    componentWillUnmount() {
        DeviceEventEmitter.removeListener('url', this._handleOpenURL)
        // Linking.removeEventListener('url', this._handleOpenURL)
        // AppState.removeEventListener('change', this._handleAppStateChange)
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.props.children}
            </View>
        )
    }

    _handleOpenURL = (event) => {
        const tokens = StringUtils.getQueryString(event.url)
        this.props.saveAuthorizationCode(tokens)
    }

    _handleAppStateChange = (nextAppState) => {

    }
}
const mapDispatchToProps = (dispatch) => ({
    saveAuthorizationCode: (code) => dispatch(actions.saveAuthorizationCode(code))
})

export default connect(null, mapDispatchToProps)(Listener)