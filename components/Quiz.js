import React, { Component } from 'react';
import {View, Button, TouchableOpacity, Text, StyleSheet, YellowBox} from 'react-native'
import {connect} from 'react-redux'
import { Entypo, AntDesign } from '@expo/vector-icons';
import { clearNotification, setNotification } from '../utils/helper'
class Quiz extends Component {
    state = { 
        current: 1,
        score: 0,
        showAnswer: false
    }

    onCheck = (isCorrect) => {
        var { current, score } = this.state
        const { questions } = this.props
        if(isCorrect) 
            score+=1
        this.setState({current: current+1, score, showAnswer: false})
    }

    toggleAnswer =  ()=> {
        const {showAnswer} = this.state
        this.setState({showAnswer: !showAnswer})
    }

    reset = () => {
        this.setState({
            current: 1,
            score: 0,
            showAnswer: false
        })
        clearNotification().then(setNotification)
    }

    render() { 
        const { questions, navigation } = this.props
        const {current, score, showAnswer} = this.state

        if(current > questions.length)
            return (
                <View style={[styles.container, {justifyContent: 'center'}]}>
                    <Text style={styles.scoreHeader}>Your score</Text>
                    <Text style={styles.score}>{Math.round((score/questions.length)*100)}%</Text>
                    <TouchableOpacity style={[styles.btn, {backgroundColor: 'gray'}]} onPress={this.reset}>
                        <Text style={styles.btnText}>Restart Quiz</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btn, {backgroundColor: 'blue'}]} onPress={() => navigation.goBack()}>
                        <Text style={styles.btnText}>Back to Deck</Text>
                    </TouchableOpacity>
                </View>
            )

        return ( 
            <View style={styles.container}>               
                <Text style={styles.header}>{current}/{questions.length}</Text>
                {showAnswer
                    ?   <View style={styles.cardContainer}>
                            <Text style={styles.text}>{questions[current-1].answer}</Text>                
                            <Button title='Question' color='green' onPress={this.toggleAnswer}/>
                        </View>
                    :   <View style={styles.cardContainer}>
                            <Text style={styles.text}>{questions[current-1].question}</Text>
                            <Button title='Answer' color='red' onPress={this.toggleAnswer}/>
                        </View>}
                <View style={styles.selectionContainer}>
                    <TouchableOpacity style={styles.selection} onPress={()=> this.onCheck(true)}>
                        <AntDesign name="checksquare" size={70} color="green" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.selection} onPress={()=> this.onCheck(false)}>
                        <Entypo name="squared-cross" size={77} color="red" />
                    </TouchableOpacity>
                    
                </View>
            </View>
         );
    }
}

const mapStateToProps = (desks, {route}) => ({
    questions: desks[route.params.title].questions
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    header: {
        fontSize: 20,
        color: 'orange',
        fontWeight: "bold",
        alignSelf: 'flex-start'
    },
    text: {
        fontSize: 40,
        margin: 10,
        textAlign: 'center',
        flex: 1,
    },
    selectionContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 20
    },
    selection: {
        padding: 0,
        margin: 0,

    },
    cardContainer: {
        flex: 1,
        width: '100%'
    },
    scoreHeader: {
        fontSize: 50,
        color: 'orange'
    },
    score: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'gray'
    },
    btn: {
        padding: 10,
        borderRadius: 10,
        width: 200,
        alignItems: 'center',
        marginTop: 20
    },
    btnText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        
    }
})
 

export default connect(mapStateToProps)(Quiz);
