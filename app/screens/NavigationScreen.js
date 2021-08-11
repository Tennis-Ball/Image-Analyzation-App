import React, { Component } from "react";
import { Linking, StyleSheet, FlatList, Text, View, Alert, TouchableOpacity, ImageBackground } from "react-native";
import { BarCodeScanner } from 'expo-barcode-scanner';


export default class NavigationScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      GridListItems: [
        { key: "Google Search" },
        { key: "QR code" },
        { key: "Identify" },
        { key: "Save" },
      ]
    };
  }

  GetGridViewItem(item) {
    if (item == "Google Search") {
      this.props.navigation.navigate('Search')
        // Linking.openURL('https://www.google.com/searchbyimage?image_url=' + photo);
    } else if (item == "QR code") {
        BarCodeScanner.scanFromURLAsync(photo, ['qr'])
    } else if (item == "Identify") {
        this.props.navigation.navigate('Identify')
    } else {
        this.props.navigation.navigate('Identify')
    }}

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={{uri: photo && photo.uri}} style={{flex: 1}}>
            <FlatList
            data={ this.state.GridListItems }
            renderItem={ ({item}) =>
                <TouchableOpacity onPress={this.GetGridViewItem.bind(this, item.key)} style={styles.GridViewContainer}>
                    <Text style={styles.GridViewTextLayout}>{item.key}</Text>
                </TouchableOpacity> }
            numColumns={2}
            />
        </ImageBackground> 
      </View>
    );
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  GridViewContainer: {
   flex:1,
   justifyContent: 'center',
   alignItems: 'center',
   height: 150,
   margin: 5,
   borderWidth: 2,
   borderRadius: 20,
},
GridViewTextLayout: {
   fontSize: 25,
   justifyContent: 'center',
   color: '#fff',
   padding: 10,
 }
});
