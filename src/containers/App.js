import React, { Component } from 'react'
import { Provider } from 'react-redux'

import Listener from './Listener'
import createStore from '@src/store'

export default class App extends Component {

  render() {
    return (
      <Provider store={createStore()}>
        <Listener>
          {this.props.children}
        </Listener>
      </Provider>
    )
  }
}
