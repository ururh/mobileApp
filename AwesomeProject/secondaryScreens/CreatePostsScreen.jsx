import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { FontAwesome, Feather, EvilIcons } from '@expo/vector-icons';
import { StyleSheet, View, Text, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import { Camera } from 'expo-camera';
import {db, auth} from '../firebase/config'
import { collection, addDoc } from 'firebase/firestore'; 
import { setPhotoData } from '../redux/actions';
import { useDispatch } from 'react-redux';


const CreatePostsScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch()

const [postPhoto, setPostPhoto] = useState(null);
const [photoName, setPhotoName] = useState('');
const [hasPermission, setHasPermission] = useState(null);
const [currentCity, setCurrentCity] = useState("");
const cameraRef = useRef(null);

const navigateToPostScreen = async () => {
  try {
    const photoData = {
      postPhoto: postPhoto,
      photoName: photoName,
      currentCity: currentCity,
      uid: auth.currentUser.uid,
    };
dispatch(setPhotoData(photoData));
    const docRef = await addDoc(collection(db, 'photo'), photoData);
    clearData();
    navigation.navigate('Home');
  } catch (error) {
    console.error('Ошибка при сохранении данных:', error);
  }
};
    
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
                          <TouchableOpacity onPress={pickImage} style={{ backgroundColor: '#fff', marginRight:'auto', paddingLeft:16,}}>
          <Text style={styles.imageText}> {postPhoto ? "Редагувати фото" : "Завантажте фото"}</Text>
              </TouchableOpacity>
            <TextInput
              style={styles.input}
              placeholder="Назва..."
              type={'text'}
              name={'photoName'}
              value={photoName}
              onChangeText={setPhotoName}
                  />
            <View style={styles.inputContainer}>
  <EvilIcons name="location" size={24} color="#BDBDBD" style={styles.icon} />
  <TextInput
    style={styles.inputLocation}
    placeholder="Місцевість..."
    type={'text'}
    name={'photoLocation'}
    value={currentCity}
    onChangeText={setCurrentCity}
  />
</View> 
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
     inputContainer: {
    flexDirection: 'row',
    position:'relative',

  },
  
    icon: {
        position: 'absolute',
        top: 48,
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    height: '100%',
    paddingTop:32,
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
    marginTop: 8,
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
    marginTop: 'auto',
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
    padding: 12,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 16,
    borderBottomColor: '#E8E8E8',
    borderBottomWidth: 2,
    },
    inputLocation: {
    width: 340,
    height: 50,
    marginTop: 33,
    paddingLeft: 24,
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
