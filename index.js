import React from 'react'
import { AppRegistry } from 'react-native';
import View from './src';
import { App } from '@containers'

const Main = () => (
    <App>
        <View />
    </App>
)
AppRegistry.registerComponent('blockpassFakeService', () => Main);
