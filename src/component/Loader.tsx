import { Image } from 'expo-image'
import React from 'react'
import { StyleSheet, View } from 'react-native'

const Loader = () => {
  return (
    <View style={styles.loadingContainer}>

      <Image
        source={require('../assets/loader.gif')}
        style={styles.gif}
        contentFit="contain"
      />
    </View>
  )
}

export default Loader


const styles = StyleSheet.create({
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    alignSelf: 'center',
    marginTop: 20
  },
  premiumSpinner: {
    transform: [{ scale: 1.8 }],
    opacity: 0.9,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  gif: {
    width: 100,  // Adjust based on your GIF dimensions
    height: 100, // Adjust based on your GIF dimensions
  }

})