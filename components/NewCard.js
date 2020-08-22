import React, { Component } from 'react';
import {KeyboardAvoidingView, Text, StyleSheet, TextInput, Button} from 'react-native'
import { connect } from 'react-redux'
import { createNewCard } from '../actions'

class NewCard extends Component {
    state = { 
        question: '',
        answer: ''
     }

    onAnswerChange = (answer) => {
        this.setState({answer})
    }

    onQuestionChange = (question) => {
        this.setState({question})
    }

    onSubmit = () => {
        const { navigation, dispatch} = this.props
        const {title} = this.props.route.params
        const { question, answer } = this.state

        dispatch(createNewCard({
            title,
            card: {
                question,
                answer
            }
        }))

        navigation.goBack()

    }

    render() { 
        const {question, answer} = this.state
        return ( 
            <KeyboardAvoidingView style={styles.container} behavior={Platform.OS == "ios" ? "padding" : "height"}>
                <Text style={styles.label}>Enter your question</Text>
                <TextInput onChangeText={this.onQuestionChange} value={question} style={styles.input} maxLength={100}/>
                <Text style={styles.label}>Enter your answer</Text>
                <TextInput onChangeText={this.onAnswerChange} value={answer} style={styles.input} maxLength={100}/>
                <Button title='Create' color='green' disabled={ question !== '' && answer !== '' ? false : true} onPress={this.onSubmit}/>
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
        margin: 20
    },
    label: {
        fontSize: 25,
        color: 'orange'
    }
})
 
export default connect()(NewCard);