
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Linking
} from 'react-native';
import { Button } from 'react-native-elements'
import Config from 'react-native-config'

export default class Main extends Component {

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
        const url = `app://blockpass?service_id=${Config.SERVICE_ID}`
        Linking.canOpenURL(url).then((supported) => {
            if (supported){
                return Linking.openURL(url)
            }
        })
    }
}