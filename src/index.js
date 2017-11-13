
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Linking
} from 'react-native';
import { Button, Text, FormLabel, FormInput, Header } from 'react-native-elements'
import { connect } from 'react-redux'
import uuid from 'uuid/v4'
import Config from 'react-native-config'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Input } from '@components'
import actions from '@actions'

class Main extends Component {

    render() {
        return (
            <KeyboardAwareScrollView style={{ flex: 1 }} keyboardShouldPersistTaps='always'>
                <Header
                    leftComponent={{ icon: 'menu', color: '#fff' }}
                    centerComponent={{ text: 'FAKE service', style: { color: '#fff' } }}
                    rightComponent={{ icon: 'home', color: '#fff' }}
                />
                <View style={{ flex: 1, alignItems: 'center', marginTop: 16 }}>
                    <View style={{ paddingLeft: 16, marginTop: 16 }}>
                        <FormLabel>Client ID</FormLabel>
                        <Input name='clientId' onChangeText={this._onChangeText} />
                    </View>
                    <View style={{ paddingLeft: 16, marginTop: 16 }}>
                        <FormLabel>Client Secret</FormLabel>
                        <Input name='clientSecret' onChangeText={this._onChangeText} />
                    </View>
                </View>
                <View style={{ alignItems: 'center', marginTop: 16 }}>
                    <Button
                        buttonStyle={{ flexDirection: 'row', backgroundColor: 'cornflowerblue', borderRadius: 4, margin: 4 }}
                        textStyle={{ textAlign: 'center' }}
                        title={`OPEN BLOCKPASS`}
                        onPress={this._openBlockpass}
                    />
                    <Button
                        buttonStyle={{ flexDirection: 'row', backgroundColor: 'powderblue', borderRadius: 4, margin: 4 }}
                        textStyle={{ textAlign: 'center' }}
                        title={`GET TOKEN`}
                        onPress={this._getToken}
                    />
                </View>
            </KeyboardAwareScrollView>
        )
    }

    _onChangeText = (value, name) => {
        this.setState({ [name]: value })
    }

    _getToken = () => {

    }

    _openBlockpass = () => {
        const { getTicket } = this.props
        const randomString = uuid()
        getTicket({
            clientId: this.state.clientId,
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