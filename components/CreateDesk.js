import React, { Component } from 'react';
import {KeyboardAvoidingView, StyleSheet, TextInput, Button} from 'react-native'
import { connect } from 'react-redux'
import { createDesk } from '../actions'

class CreateDesk extends Component {
    state = { 
        title: ''
    }
    onChange = (text) => {
        this.setState({title: text})
    }

    onSubmit = () => {
        const { dispatch, navigation } = this.props
        const { title } = this.state
        dispatch(createDesk({
            [title]: {
                title,
                questions: []
            }
        }))
        this.setState({title: ''})
        navigation.navigate('desks')
    }

    render() { 
        return ( 
            <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.container}>
                <TextInput style={styles.input} onChangeText={this.onChange} maxLength={50} value={this.state.title}/>
                <Button disabled= {this.state.title === ''? true : false} title='Create' onPress={this.onSubmit}/>
            </KeyboardAvoidingView>
         );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        height: 70,
        borderWidth: 1,
        borderRadius: 10,
        width: '100%',
        paddingLeft: 10,
        borderColor: 'orange', 
        fontSize: 20,
        color: 'orange',
    }
})

export default connect()(CreateDesk);