import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { FontAwesome, Feather, EvilIcons } from '@expo/vector-icons';
import { StyleSheet, View, Text, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import { Camera } from 'expo-camera';

const CreatePostsScreen = () => {
  const navigation = useNavigation();

    const navigateToPostScreen = () => {
        clearData();
    navigation.navigate('Home');
  };
    
const [postPhoto, setPostPhoto] = useState(null);
const [photoName, setPhotoName] = useState('');
const [hasPermission, setHasPermission] = useState(null);
const [currentCity, setCurrentCity] = useState("");
const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);


  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
         const city = await Location.reverseGeocodeAsync(coords);
      if (city && city[0] && city[0].city) {
        setCurrentCity(city[0].city);
      } 
    })();
  }, []);
    
  const makePhoto = async () => {
    if (cameraRef.current) {
        const { uri } = await cameraRef.current.takePictureAsync();
      setPostPhoto(uri);
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>Немає доступу до камери</Text>;
  }

  const clearData = () => {
    setPostPhoto(null);
    setPhotoName('');
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setPostPhoto(result.uri);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableOpacity onPress={pickImage} style={{ backgroundColor: '#fff' }}>
          <Text style={styles.imageText}>{postPhoto ? "Редагувати " : "Обрати"}</Text>
              </TouchableOpacity>
        <View style={styles.container}>
          {postPhoto ? (
              <Image
                source={{ uri: postPhoto }}
                style={{
                  width: '95%',
                  height: 240,
                  borderRadius: 8,
                }}
              />

          ) : (
            <Camera
              style={styles.camera}
              type={Camera.Constants.Type.back}
              ref={cameraRef}
            >
              <TouchableOpacity
                style={styles.imageAddButton}
                opacity={0.5}
                onPress={makePhoto}
              >
                <FontAwesome name="camera" size={24} color="gray" />
              </TouchableOpacity>
            </Camera>
          )}
          {/* <View style={styles.formContainer}> */}
            <TextInput
              style={styles.input}
              placeholder="Назва..."
              type={'text'}
              name={'photoName'}
              value={photoName}
              onChangeText={setPhotoName}
                  />
            <TextInput
              style={styles.input}
              placeholder="Місцевість..."
              type={'text'}
              name={'photoLocation'}
              value={currentCity}
              onChangeText={setCurrentCity}/>
            <TouchableOpacity
            onPress={navigateToPostScreen}
              style={[
                styles.button,
                postPhoto
                  ? {
                      color: '#FFFFFF',
                      backgroundColor: '#FF6C00',
                    }
                  : {
                      color: '#BDBDBD',
                      backgroundColor: '#F6F6F6',
                    },
              ]}
              activeOpacity={0.5}
              >
              <Text
                style={[
                  styles.buttonText,
                  postPhoto
                    ? {
                        color: '#FFFFFF',
                      }
                    : {
                        color: '#BDBDBD',
                      },
                ]}
              >
                Опубліковати
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.clearButton} onPress={clearData}>
              <Feather name="trash" size={24} color="gray" />
            </TouchableOpacity>
        </View>
        {/* </View> */}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  camera: {
    width: '92%',
    height: 240,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageAddButton: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageText: {
    color: '#BDBDBD',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
    marginTop: 16,
  },
    formContainer: {
    flex: 3,
  },
  button: {
    height: 50,
    width: 343,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    marginTop: 44,
  },
  buttonText: {
    fontWeight: '400',
  },
    clearButton: {
    backgroundColor: '#F6F6F6',
    marginTop:60,
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 40,
    borderRadius: 20,
  },
  input: {
    width: 340,
    height: 50,
    marginTop: 33,
    padding: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 16,
    borderBottomColor: '#E8E8E8',
    borderBottomWidth: 2,
  },
  locationText: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '400',
    color: '#333',
  },
});

export default CreatePostsScreen;
