import React from 'react'
import PropTypes from 'prop-types'
import { FormInput } from 'react-native-elements'

class Input extends React.Component {

    render() {
        return <FormInput style={this.props.style} onChangeText={this._onChanged} />
    }

    _onChanged = (value) => {
        const { name, onChangeText } = this.props
        onChangeText(value, name)
    }
}
Input.propTypes = {
    name: PropTypes.string,
    onChangeText: PropTypes.func
}

export default Input