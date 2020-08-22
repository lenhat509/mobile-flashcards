import React, { Component } from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native'
import { connect } from 'react-redux'
import { getDesks } from '../actions'
import DeskThumbnail from './DeskThumbnail'

class Decks extends Component {
    componentDidMount(){
        this.props.dispatch(getDesks())
    }

    toDesk = (title) => {
        this.props.navigation.navigate('desk', {title})
    }

    render() { 
        return ( 
            <View style={styles.container}>
                <FlatList style={styles.list}
                    data={this.props.desksList}
                    renderItem={({item}) => (<DeskThumbnail {...item} toDesk={this.toDesk}/>)}
                    keyExtractor={item => item.title}/>
            </View>
        );
    }
}
 
const mapStateToProps = (desks) => ({
    desksList: Object.keys(desks).map((desk) => ({
        title: desks[desk].title,
        numberOfCards: desks[desk].questions.length  
    }))
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        alignItems:'center'
    },
    list: {
        flex: 1,
        width: '100%',
        paddingRight: 20,
        paddingLeft: 20
    }
})

export default connect(mapStateToProps)(Decks);