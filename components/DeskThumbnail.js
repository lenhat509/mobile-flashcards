import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'

class DeskThumbnail extends Component {
    render() {
        const { numberOfCards, title, toDesk } = this.props
        return ( 
            <TouchableOpacity style={styles.cardBtn} onPress={() => toDesk(title)}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.numCards}>Cards: {numberOfCards}</Text>
            </TouchableOpacity>
         );
    }
}

const styles = StyleSheet.create({
    cardBtn: {
        borderColor: 'orange',
        borderRadius: 10,
        padding: 20,
        borderWidth: 1,
        marginTop: 10,
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
    }
})

export default DeskThumbnail;