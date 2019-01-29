import React, { Component } from 'react';
import {
  Button,
  View,
  AsyncStorage,
  TextInput,
  Alert,
  Text
} from 'react-native';
import Auth0 from 'react-native-auth0';

const auth0 = new Auth0({
  domain: 'react-native-login.auth0.com',
  clientId: 'CS9MoppaWtjivCmlfibn8vWzQAuQRBqv'
});

export default class SignInScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };
  }

  static navigationOptions = {
    title: 'Please sign in'
  };

  handleInputChange = (name, value) => {
    this.setState({ [name]: value });
  };

  render() {
    return (
      <View>
        <TextInput
          name="username"
          placeholder="Username"
          onChangeText={text => this.handleInputChange('username', text)}
        />
        <TextInput
          name="password"
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={text => this.handleInputChange('password', text)}
        />
        <Button title="Sign in!" onPress={this._signInAsync} />
        <Text>CREATE USER:</Text>
        <TextInput
          name="createEmail"
          placeholder="Email"
          onChangeText={text => this.handleInputChange('createEmail', text)}
        />
        <TextInput
          name="createPassword"
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={text => this.handleInputChange('createPassword', text)}
        />
        <Button title="Create User!" onPress={this._createUser} />
      </View>
    );
  }

  _signInAsync = async () => {
    const { username, password } = this.state;
    auth0.webAuth
      .authorize({
        scope: 'openid profile',
        audience: 'https://react-native-login.auth0.com/userinfo'
      })
      .then(credentials => {
        Alert.alert(
          'Success',
          'AccessToken: ' + credentials.accessToken,
          [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
          { cancelable: false }
        );
        this.setState({ accessToken: credentials.accessToken });
        this.props.navigation.navigate('App');
      })
      .catch(error => console.log(error));
    //    auth0.auth
    //      .passwordRealm({
    //        username,
    //        password,
    //        realm: 'Username-Password-Authentication'
    //      })
    //      .then(credentials => {
    //        console.log(credentials);
    //        this.props.navigation.navigate('App');
    //      })
    //      .catch(console.error);
    //    await AsyncStorage.setItem('userToken', 'abc');
    //    this.props.navigation.navigate('App');
  };

  _createUser = async () => {
    const { createEmail, createPassword } = this.state;
    auth0.auth
      .createUser({
        email: createEmail,
        password: createPassword,
        connection: 'Username-Password-Authentication'
      })
      .then(console.log)
      .catch(console.error);
  };
}
