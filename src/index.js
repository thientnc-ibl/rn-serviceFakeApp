
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Linking
} from 'react-native';
import { Button } from 'react-native-elements'
import { connect } from 'react-redux'
import uuid from 'uuid/v4'
import Config from 'react-native-config'

import actions from '@actions'

class Main extends Component {

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <View style={{ flex: 1, alignItems: 'center', marginTop: 64 }}>
                    <Text>This is a FAKE service</Text>
                </View>
                <Button
                    buttonStyle={{ flexDirection: 'row', backgroundColor: 'red', borderRadius: 4, margin: 64 }}
                    textStyle={{ textAlign: 'center' }}
                    title={`OPEN BLOCKPASS`}
                    onPress={this._openBlockpass}
                />
            </View>
        )
    }

    _openBlockpass = () => {
        const { getTicket } = this.props
        const randomString = uuid()
        getTicket({
            clientId: Config.CLIENT_ID,
            xsrfsig: randomString,
            destination: encodeURIComponent(Config.DEEP_LINK)
        })
    }
}
const mapStateToProps = (state) => ({

})
const mapDispatchToProps = (dispatch) => ({
    getTicket: (data) => dispatch(actions.getServiceTicket(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Main)