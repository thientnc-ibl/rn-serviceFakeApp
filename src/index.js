
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Linking
} from 'react-native';
import { Button, Text, FormLabel, FormInput, Header, Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import Configs from 'react-native-config'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Input, Profile } from '@components'
import actions from '@actions'
import * as Strings from '@utils/strings'

class Main extends Component {

    state = {}
    
    render() {
        return (
            <KeyboardAwareScrollView style={{ flex: 1 }} keyboardShouldPersistTaps='always'>
                <Header
                    leftComponent={{ icon: 'menu', color: '#fff' }}
                    centerComponent={{ text: 'FAKE service', style: { color: '#fff' } }}
                    rightComponent={{ icon: 'home', color: '#fff' }}
                />
                <View style={{ flex: 1, alignItems: 'center', paddingLeft: 16 }}>
                <Text style={{ marginTop: 16 }}>{`API server: ${Configs.HOST_NAME}`}</Text>
                    <Text style={{ marginTop: 16 }}>{`Deeplink: ${Configs.DEEP_LINK}`}</Text>
                    <View style={{ marginTop: 16 }}>
                        <FormLabel>Client ID</FormLabel>
                        <Input name='clientId' onChangeText={this._onChangeText} />
                    </View>
                    <View style={{ marginTop: 16 }}>
                        <FormLabel>Client Secret</FormLabel>
                        <Input name='clientSecret' onChangeText={this._onChangeText} />
                    </View>
                </View>
                <View>
                    {!this.props.profile && <View style={{ height: 64 }} />}
                    {this.props.profile && <Profile style={{ paddingTop: 8 }} data={this.props.profile}/>}
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
                        title={`GET Profile`}
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
        const { clientId, clientSecret } = this.state
        this.props.getProfile()
    }

    _openBlockpass = () => {
        const { getTicket } = this.props
        const randomString = Strings.randomUUID()
        getTicket({
            clientId: this.state.clientId,
            xsrfsig: randomString,
            destination: encodeURIComponent(Configs.DEEP_LINK)
        })
    }
}
const mapStateToProps = (state) => ({
    registeredSuccess: !!state.service.authorization,
    profile: state.service.profile
})
const mapDispatchToProps = (dispatch) => ({
    getTicket: (data) => dispatch(actions.getServiceTicket(data)),
    getProfile: (clientId, clientSecret) => dispatch(actions.getProfile())
})

export default connect(mapStateToProps, mapDispatchToProps)(Main)