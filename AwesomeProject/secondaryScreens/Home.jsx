import { Text, View, TouchableOpacity, StyleSheet, Image, ScrollView} from 'react-native'
import React, { useEffect, useId, useState } from 'react'
import { EvilIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../firebase/config';
import { collection, getDocs,query, where } from 'firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setPhotoData, setUser } from '../redux/actions';

export default function Home() {
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('')
  const [userAvatar, setAvatar] = useState('')
  const [photos, setPhotos] = useState([]);

  const userUid = auth.currentUser.uid;
  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        
        if (userUid) {
          const userDocRef = collection(db, 'users');
          const querySnapshot = await getDocs(userDocRef);

          querySnapshot.forEach((userDocSnapshot) => {
            const userData = userDocSnapshot.data();
            if (userData.uid === userUid) {
              setUserName(userData.name);
              setUserEmail(userData.email);
              setAvatar(userData.uriAvatar);
            }
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    getCurrentUser();
  }, []);


const getCommentsForPhoto = async (photoUri) => {
  const commentsRef = collection(db, 'comments');
  const querySnapshot = await getDocs(query(commentsRef, where('photoUri', '==', photoUri)));
  const commentsData = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    commentsData.push(data);
  });

  return commentsData;
};

  const getPhotos = async () => {
  try {
    const photosRef = collection(db, 'photo');
    const querySnapshot = await getDocs(photosRef);
    const photoData = [];

    for (const doc of querySnapshot.docs) {
      const data = doc.data();
      const comments = await getCommentsForPhoto(data.postPhoto);
      data.commentsCount = comments.length;
      photoData.push(data);
    }

    dispatch(setPhotoData(photoData));
    setPhotos(photoData);
  } catch (error) {
    console.error('Error fetching photos:', error);
  }
};


console.log('Photos:', photos);
    useFocusEffect(
    React.useCallback(() => {
      getPhotos();
    }, [])
  );

const user ={email: userEmail, name: userName, uid: userUid, uriAvatar: userAvatar}
dispatch(setUser(user));

  
  const handleGoToComments = (photoUri) => {
    navigation.navigate('Comments', {photoUri});
    };
    
 const handleGoToMap = ()=>{
    navigation.navigate('Map');
    };

    return (
        <ScrollView>
        <View style={styles.container}>
          <View style={styles.userContainer}>
            <Image source={{uri: userAvatar}} style={styles.avatarImg} />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{userName}</Text>
              <Text style={styles.userEmail}>{userEmail}</Text>
            </View>
            </View>
            
          {photos ? (photos.map((photo, index) => (
        <View key={index} style={styles.postContainer}>
          <Image source={{ uri: photo.postPhoto }} style={styles.postImage} />
            <Text style={styles.title}>{photo.photoName}</Text>
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={()=>handleGoToComments(photo.postPhoto)} style={styles.locationContainer}>
                 <EvilIcons name="comment" size={24} color="#BDBDBD" />
                 <Text style={styles.commentsText}>{photo.commentsCount}</Text>
             </TouchableOpacity>
             <View>
                 <TouchableOpacity onPress={handleGoToMap} style={styles.locationContainer}>
                <EvilIcons name="location" size={24} color="#BDBDBD" />
                <Text style={{textDecorationLine:'underline', color: '#212121',}}>{photo.currentCity}</Text>
            </TouchableOpacity>
             </View>
              
            </View>
          </View>
      ))) : <Text>Loading</Text>}   
            </View>
            </ScrollView>
    )
}
  
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
    },
  userContainer: {
      paddingLeft:16,
        marginVertical: 32,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    avatarImg: {
        width: 60,
        height: 60,
        borderRadius: 16,
        resizeMode: 'cover',
    },
    userInfo: {
        marginLeft: 8,
        fontWeight: '700',
    },
    userName: {
        color: '#212121',
        fontSize: 13,
        lineHeight: 15,
        fontWeight: '400',
    },
    userEmail: {
        color: '#212121',
        opacity: 0.8,
        fontSize: 11,
        lineHeight: 13,
    },
    title: {
        marginRight: 'auto',
    color: '#212121',
fontSize: 16,    
    },
    postContainer: {
    marginBottom: 34,
  },
  postImage: {
    width: 343,
    height: 240,
    borderRadius: 8,
    resizeMode: 'cover',
  },
    iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    },
      icon: {
    marginRight: 8,
    },
    commentsText: {
        color: "#BDBDBD",
        fontSize: 16,
      },
    locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})