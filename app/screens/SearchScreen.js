import React, { Component } from 'react';
import { ImageStore, Text, View, StyleSheet } from 'react-native';
import { FileSystemSessionType, readAsStringAsync } from 'expo-file-system';
import * as FileSystem from 'expo-file-system';


export default class SearchScreen extends Component {
  async foo() {
    console.log('Entering foo');

    let clientId = "5e0a2713e757432";
    // let clientSecret = "62d4d4a00bb4a242ffb0a00d17c78f60416cf9b9";
    let token = false;
    let auth;
    if (token) {
      auth = 'Bearer ' + token;
    } else {
      auth = 'Client-ID ' + clientId;
    }
    
    console.log(2);
    
    let base64data = await FileSystem.readAsStringAsync(photo.uri, { encoding: 'base64'})
    
    const formData = new FormData();
    formData.append('upload', {
              image: base64data,
        type: 'base64'
    });
    console.log(2.5);
    const result = await fetch('https://api.imgur.com/3/image', {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: auth,
        Accept: 'application/json',
      },
    });
    
    console.log(3);
    
    
    console.log("result=", result);
    
    let iid = result.data.id;
    let imgUrl = "https://imgur.com/gallery/" + iid;
    console.log(imgUrl);
    return imgUrl;


  }
  render() {
    this.foo();

    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          Change code in the editor and watch it change on your phone!
          Save to get a shareable url. You get a new url each time you save.
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});
