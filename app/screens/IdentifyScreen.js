import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  StatusBar,
  Image,
  TouchableOpacity
} from 'react-native'
import * as tf from '@tensorflow/tfjs'
import { decodeJpeg } from '@tensorflow/tfjs-react-native'
import * as mobilenet from '@tensorflow-models/mobilenet'
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'

class IdentifyScreen extends React.Component {
  state = {
    isTfReady: false,
    isModelReady: false,
    predictions: null,
    image: photo.uri
  }

  async componentDidMount() {
    await tf.ready()
    this.setState({
      isTfReady: true
    })
    this.model = await mobilenet.load()
    this.setState({ isModelReady: true })
    this.getPermissionAsync()
    this.classifyImage()
  }

  getPermissionAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!')
    }
  }

  classifyImage = async () => {
    try {
      const response = await FileSystem.readAsStringAsync(photo.uri,  {
        encoding: FileSystem.EncodingType.Base64,
      })
      const rawImageData = tf.util.encodeString(response, 'base64').buffer;
      const raw = new Uint8Array(rawImageData)
      const imageTensor = decodeJpeg(raw);
      const predictions = await this.model.classify(imageTensor)
      this.setState({ predictions })
      console.log(predictions)
    } catch (error) {
      console.log(error)
    }
  }

  renderPrediction = prediction => {
    return (
      <Text key={prediction.className} style={styles.text}>
        {prediction.className} Certainty: {Math.ceil(prediction.probability * 10000) / 100}%
      </Text>
    )
  }

  render() {
    const { isTfReady, isModelReady, predictions, image } = this.state

    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' />
        <View style={styles.loadingContainer}>
          <Text style={styles.text}>
            TFJS ready? {isTfReady ? <Text>✅</Text> : ''}
          </Text>

          <View style={styles.loadingModelContainer}>
            <Text style={styles.text}>Model ready? </Text>
            {isModelReady ? (
              <Text style={styles.text}>✅</Text>
            ) : (
              <ActivityIndicator size='small' />
            )}
          </View>
        </View>
        {/* <TouchableOpacity
          style={styles.imageWrapper}>

          {isModelReady && !image && (
            <Text style={styles.transparentText}>Tap to choose image</Text>
          )}
        </TouchableOpacity> */}
        <View style={styles.predictionWrapper}>
          {isModelReady && image && (
            <Text style={styles.text}>
              Predictions: {predictions ? '' : 'Predicting...'}
            </Text>
          )}
          {isModelReady &&
            predictions &&
            predictions.map(p => this.renderPrediction(p))}
        </View>
        <View style={styles.footer}>
          <Text style={styles.poweredBy}>Hopefully this works</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171f24',
    alignItems: 'center'
  },
  loadingContainer: {
    marginTop: 80,
    justifyContent: 'center'
  },
  text: {
    color: '#ffffff',
    fontSize: 16
  },
  loadingModelContainer: {
    flexDirection: 'row',
    marginTop: 10
  },
  imageWrapper: {
    width: 280,
    height: 280,
    padding: 10,
    borderColor: '#cf667f',
    borderWidth: 5,
    borderStyle: 'dashed',
    marginTop: 40,
    marginBottom: 10,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageContainer: {
    width: 250,
    height: 250,
    position: 'absolute',
    top: 10,
    left: 10,
    bottom: 10,
    right: 10
  },
  predictionWrapper: {
    height: 100,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center'
  },
  transparentText: {
    color: '#ffffff',
    opacity: 0.7
  },
  footer: {
    marginTop: 40
  },
  poweredBy: {
    fontSize: 20,
    color: '#e69e34',
    marginBottom: 6
  },
  tfLogo: {
    width: 125,
    height: 70
  }
})

export default IdentifyScreen
