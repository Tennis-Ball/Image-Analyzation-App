import React, { Component } from 'react';
import {
  ImageStore,
  Image,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import ImageEditor from '@react-native-community/image-editor'


async function sizeForImage(uri) {
  return new Promise((resolve, reject) => {
    Image.getSize(uri, (width, height) => resolve({ width, height }), reject);
  });
}

async function base64ForImageTag(imageTag) {
  return new Promise((resolve, reject) => {
    ImageStore.getBase64ForTag(imageTag, resolve, reject);
  });
}

function formDataForBase64(base64) {
  const formData = new FormData();
  formData.append('image', base64);
  return formData;
}

async function postFormDataToImgur(formData) {
  let clientId = '5afd6b67306a4cb';
  // let clientSecret = "04608dcd172ef4ac90272149c4ed50f9f9f45f2f";
  let token = false;
  let auth;
  if (token) {
    auth = 'Bearer ' + token;
  } else {
    auth = 'Client-ID ' + clientId;
  }

  return fetch('https://api.imgur.com/3/image', {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: auth,
      Accept: 'application/json',
    },
  });
}


async function registerImageTagForImage(uri) {
  const size = await sizeForImage(uri);

  const cropData = { offset: { x: 0, y: 0 }, size };
  const imageTag = await new Promise((resolve, reject) => {
    ImageEditor.cropImage(uri, cropData, resolve, reject);
  });
  
  return imageTag;
}

export default class SearchScreen extends Component {
  uploadImage = async uri => {
    const imageTag = await registerImageTagForImage(uri);
    
    /// Verify ImageTag exists
    // ImageStore.hasImageForTag(dataa, data => console.log("d", data) )

    let base64data;
    try {
      base64data = await base64ForImageTag(imageTag);
    } catch (error) {
      console.log(error);
    }
    const formData = formDataForBase64(base64data);
    let result = null;
    try {
      result = await postFormDataToImgur(formData);
    } catch (error) {
      console.log('ERROR', error);
    }
    ImageStore.removeImageForTag(imageTag);
    return result;
  };

  async UNSAFE_componentWillMount() {
    const imgurRes = await this.uploadImage(
      'http://cdn3-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-21.jpg'
    );
    console.warn('out', imgurRes);
  }
  render() {
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
