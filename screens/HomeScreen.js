import React, { Component } from 'react'
import { Button, View, AsyncStorage } from 'react-native'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome to the app!'
  }

  render() {
    return (
      <View>
        <Button title="Actually, sign me out :)" onPress={this._signOutAsync} />
      </View>
    )
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear()
    this.props.navigation.navigate('Auth')
  }
}
