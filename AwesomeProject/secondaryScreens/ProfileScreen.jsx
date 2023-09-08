import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Feather, AntDesign, EvilIcons,FontAwesome  } from '@expo/vector-icons';
import bgImg from '../assets/background.jpg';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { db } from '../firebase/config';
import { collection, getDocs,query, where } from 'firebase/firestore';

export default function ProfileScreen() {
  const [photoData, setPhotoData] = useState([]);
  const [likesCount, setLikesCount] = useState(0);
      const navigation = useNavigation();
  const user = useSelector((state) => state.user);

  const getCommentsForPhoto = async (photoUri) => {
  const commentsRef = collection(db, 'comments');
  const querySnapshot = await getDocs(query(commentsRef, where('photoUri', '==', photoUri)));
  const commentsData = [];
console.log(commentsData);
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    commentsData.push(data);
  });

  return commentsData;
  };
  
 

// Отримати дані фото і коментарів для кожного фото
const fetchPhotoData = async () => {
  try {
    const photosRef = collection(db, 'photo');
    const querySnapshot = await getDocs(photosRef);
    const photoData = [];

    for (const doc of querySnapshot.docs) {
      const data = doc.data();
      const comments = await getCommentsForPhoto(data.postPhoto);

      // Перевірити, чи data не порожній масив перед оновленням photoData
      if (data && Object.keys(data).length > 0) {
        // Оновити дані фото, додавши кількість коментарів
        data.commentsCount = comments.length;
        photoData.push(data);
      }
    }

    setPhotoData(photoData);
  } catch (error) {
    console.error('Помилка отримання фото та коментарів:', error);
  }
};

const handleLikeClick = () => {
  setLikesCount(likesCount + 1);
};
  useEffect(() => {
  fetchPhotoData();
  }, []); 
  
  const userUid = user.user.uid;
  const filteredPhotos = Array.isArray(user.photoData) && user.photoData.length > 0
  ? user.photoData.filter((photo) => photo.uid === userUid)
  : [];

  const handleGoToComments = (photoUri) => {
    navigation.navigate('Comments', {photoUri});
  }; 
    
 const handleGoToMap = () => {
    navigation.navigate('Map');
    };
  return (
    <ImageBackground source={bgImg} style={styles.imageBackground}>
      <View style={styles.container}>
        <View style={styles.photoContainer}>
          <Image source={{uri: user.user.uriAvatar}} style={{ width: '100%', height: '100%', borderRadius: 16 }} />
          <TouchableOpacity style={styles.addButton} activeOpacity={0.5}>
            <AntDesign name="closecircleo" size={24} color="#BDBDBD" />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>{user.user.name}</Text>
        <TouchableOpacity
          style={styles.logoutButton}
          activeOpacity={0.5}
        >
          <Feather name="log-out" size={25} color="#BDBDBD" />
        </TouchableOpacity>

        <ScrollView
          style={{ margin: 0, padding: 0 }}
          showsVerticalScrollIndicator={false}
        >
          {filteredPhotos ? (
            filteredPhotos.map((post, index) => (
            <View key={index} style={styles.postContainer}>
              <Image source={{ uri: post.postPhoto }} style={styles.postImage} />
              <Text style={styles.titlePost}>{post.photoName}</Text>
              <View style={styles.iconContainer}>
                <View style={styles.boxComLike}><TouchableOpacity onPress={()=>handleGoToComments(post.postPhoto)} style={styles.locationContainer}>
                  <FontAwesome name="comment" size={18} color="#FF6C00" />
                  <Text style={styles.commentsText}>{post.commentsCount}</Text>
                </TouchableOpacity>
                  <TouchableOpacity style={styles.locationContainer}>
                    <EvilIcons name="like" size={24} color="#FF6C00" />
                      <Text onPress={handleLikeClick} style={styles.commentsText}>{likesCount}</Text>
                  </TouchableOpacity></View>
                <View>
                  <TouchableOpacity onPress={handleGoToMap} style={styles.locationContainer}>
                    <EvilIcons name="location" size={24} color="#BDBDBD" />
                    <Text style={{ textDecorationLine: 'underline', color: '#212121', }}>{post.currentCity}</Text>
                  </TouchableOpacity>
                </View>
              
              
              </View>
            </View>
          ))) : <Text>Loading</Text>}
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
  },
  containerKeyBoard: {
    justifyContent: 'flex-end',
  },
  container: {
    width: '100%',
    height: '80%',
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
  },
  photoContainer: {
    top: -60,
    width: 120,
    height: 120,
    backgroundColor: '#F6F6F6',
    borderRadius: 16,
    alignSelf: 'center',
    marginBottom: 40,
  },
  logoutButton: {
    position: 'absolute',
    top: 22,
    right: 16,
  },
  addButton: {
    marginTop: -40,
    left: '90%',
    height: 25,
    width: 25,
    pointerEvents: 'auto',
    backgroundColor: '#FFFFFF',
    borderRadius: 100,
  },
  title: {
    position: 'absolute',
    marginTop: 90,
    alignSelf: 'center',
    fontFamily: 'Roboto',
    fontSize: 30,
    lineHeight: 35,
    textAlign: 'center',
  },
  titlePost: {
        marginBottom:8,
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
  boxComLike: {
    flexDirection: 'row',
    gap: 24,
      },
    commentsText: {
        color: "#212121",
      fontSize: 16,
        marginLeft:4,
      },
    locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});