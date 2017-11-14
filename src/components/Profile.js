import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Linking
} from 'react-native';
import { Button, Text, FormLabel, FormInput, Header, Icon } from 'react-native-elements'

class Profile extends Component {

    render() {
        const { level, id, identities } = this.props.data
        return (
            <View style={[this.props.style, { alignItems: 'stretch' }]}>
                <Text>{`ID: ${id}`}</Text>
                <Text>{`Level: ${level}`}</Text>
                {this._renderIdentity()}
            </View>
        )
    }

    _renderIdentity = () => {
        const { identity } = this.props.data
        return identity.map((item, index) => {
            return (
                <View key={index} style={{ flexDirection: 'row' }}>
                    <Text>{`${item.registerInfo.slug}:`}</Text>
                    <Text>{item.status}</Text>
                </View>
            )
        })
    }
}

export default Profile