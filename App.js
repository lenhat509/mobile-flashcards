import React, {Component} from 'react';
import { View, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons, FontAwesome } from '@expo/vector-icons'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware} from 'redux'
import reducer from './reducers'
import Desks from './components/Desks'
import thunk from 'redux-thunk'
import Desk from './components/Desk'
import CreateDesk from './components/CreateDesk'
import NewCard from './components/NewCard'
import Quiz from './components/Quiz'
import { setNotification } from './utils/helper'

const IOSTab = createBottomTabNavigator()
const ATab = createMaterialTopTabNavigator()
const Stack = createStackNavigator()

const DesksStack = () => {
  return ( 
    <Stack.Navigator 
      screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: 'orange'
        }
      }}>
      <Stack.Screen name='desks' component={Desks} options={{headerShown: false}}/>
      <Stack.Screen name='desk' component={Desk} options={({route}) => ({
        title: route.params.title
      })}/>
      <Stack.Screen name='newCard' component={NewCard} options={{title: 'New Card'}}/>
      <Stack.Screen name='quiz' component={Quiz} options={{title: 'Quiz'}}/>
    </Stack.Navigator>
  );
}

class App extends Component {
  componentDidMount() {
    setNotification()
  }
  render() {
    return (
      <Provider store={createStore(reducer, applyMiddleware(thunk))}>
        <View style={{flex: 1}}>
          <NavigationContainer>
            { Platform.OS === 'ios'
                ? (<IOSTab.Navigator
                      screenOptions = {({route})=> ({
                        tabBarIcon: ({focused , color, size}) => {
                          if(route.name === 'desksStack')
                            return (<Ionicons name="ios-list-box" size={size} color={color} />)
                          else if(route.name === 'newDesk')
                            return (<FontAwesome name="plus-square" size={size} color={color} />)
                        }
                        })}
                      tabBarOptions = {{
                        activeTintColor: 'orange',
                        inactiveTintColor: 'gray',
                        style: {
                          height: 70
                        },
                        tabStyle: {
                          padding: 10
                        },
                        labelStyle: {
                          fontSize: 13
                        }
                      }} >
                    <IOSTab.Screen name='desksStack' component={DesksStack} options={{title: "Desks"}}/>
                    <IOSTab.Screen name='newDesk' component={CreateDesk} options={{title: 'Create Desk'}}/>
                  </IOSTab.Navigator>)
                : (<ATab.Navigator 
                      style= {{
                        marginTop: 30
                      }}

                      tabBarOptions= {{
                        activeTintColor: 'orange',
                        inactiveTintColor: 'gray',
                        tabStyle: {
                          height: 70
                        },
                        labelStyle: {
                          fontSize: 15
                        },
                        indicatorStyle:{
                          backgroundColor: 'orange'
                        }
                      }}>
                    <ATab.Screen name='desksStack' component={DesksStack} options={{title: "Desks"}}/>
                    <ATab.Screen name='newDesk' component={CreateDesk} options={{title: 'Create Deck'}}/>
                  </ATab.Navigator>)}
          </NavigationContainer>
        </View>
      </Provider>
    )
}}
 
export default App;
