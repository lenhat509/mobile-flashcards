import React, { Component } from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Button} from 'react-native'
import { connect } from 'react-redux'
import { deleteDesk } from '../actions'

class Desk extends Component {

    onDelete = (title) => {
        const {dispatch, navigation} = this.props
        dispatch(deleteDesk(title))
        navigation.navigate('desks')
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.numberOfCards !== null
    }

    render() { 
        const { navigation, title, numberOfCards } = this.props
        return ( 
            <View style={styles.container}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.numCards}>{numberOfCards} cards</Text>
                <TouchableOpacity 
                    style={[styles.btn, {backgroundColor: 'orange', marginTop: 100}]} 
                    onPress={() => navigation.navigate('newCard', {title})}>
                    <Text style={styles.btnText}>Add Card</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.btn, {backgroundColor: 'black', marginBottom: 50}]}
                    onPress={() => navigation.navigate('quiz', {title})}>
                    <Text style={styles.btnText}>Start Quiz</Text>
                </TouchableOpacity>
                <Button title='Delete' color='red' onPress={() => this.onDelete(title)}/>
            </View>
         );
    }
}

const mapStateToProps = (desks, {route}) => ({
    title: route.params.title,
    numberOfCards: desks[route.params.title]? desks[route.params.title].questions.length: null
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 25,
        color: 'orange'
    },
    numCards: {
        fontSize: 20,
        color: 'gray'
    },
    btn: {
        padding: 10,
        borderRadius: 10,
        width: 150,
        alignItems: 'center',
        margin: 5
    },
    btnText: {
        fontSize: 25,
        color: 'white'
    }
})

export default connect(mapStateToProps)(Desk);