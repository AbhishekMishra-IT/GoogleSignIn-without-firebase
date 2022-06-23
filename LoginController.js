import React, { Component, Fragment } from "react";
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, Button, Image,} from 'react-native';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';

GoogleSignin.configure({
    webClientId : '',
    offlineAccess : true
})

class LoginController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userGoogleInfo: {},
      loaded: false
    }
  }

  signIn = async()=>{
      try{
      await GoogleSignin.hasPlayServices()
      const userInfo = await GoogleSignin.signIn();
      this.setState({
          userGoogleInfo : userInfo,
          loaded : true
      })
      }
      catch(error){
          console.log(error.message); 
      }
  }
 

  render(){
      return(
          <View>
              <GoogleSigninButton 
              onPress={this.signIn}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              style={{width:100,height:100}}
              
              />

              {this.state.loaded ?
              <View>
                  <Text>{this.state.userGoogleInfo.user.name}</Text>
                  <Text>{this.state.userGoogleInfo.user.email}</Text>
                  <Image
                  style={{width:'100', height:'100'}}
                  source={{uri:this.state.userGoogleInfo.user.photo}}
                  />
              </View> :
              <Text>Not SignedIn</Text>
            }
          </View>
      )
       }       }