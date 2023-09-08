import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { db } from '../firebase/config';
import { addDoc, collection, query, where, getDocs } from 'firebase/firestore';

export default function CommentsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const user = useSelector((state) => state.user);
  const userUid = user.user.uid;
  const uriAvatar = user.user.uriAvatar;
  const photoUriCom = route.params.photoUri;
  const [commentText, setCommentText] = useState('');
  const [comment, setComment] = useState([]);

  const leaveComment = async () => {
  if (!commentText) {
    alert('Введіть текст коментаря.');
    return;
  }
  try {
    const currentDate = new Date();
    const date = currentDate.toLocaleDateString();
    const time = currentDate.toLocaleTimeString();
    const commentsCollectionRef = collection(db, 'comments');

    await addDoc(commentsCollectionRef, {
      photoUri: photoUriCom || '',
      uid: userUid,
      date,
      time,
      text: commentText,
      userAvatar: uriAvatar,
    });
setComment([...comment, {
      uid: userUid,
      date,
      time,
      text: commentText,
      userAvatar: uriAvatar,
    }]);
    setCommentText(''); 
    alert('Коментар успішно відправлено.');
  } catch (error) {
    console.error('Помилка відправлення коментаря:', error);
  }
  };
  
  const getCommentsByPhotoUri = async (photoUri) => {
  try {
    const commentsCollectionRef = collection(db, 'comments');
    const q = query(commentsCollectionRef, where('photoUri', '==', photoUri));
    const querySnapshot = await getDocs(q);

    const commentsArray = [];

    querySnapshot.forEach((doc) => {
      commentsArray.push({
        id: doc.id,
        ...doc.data(), 
      });
    });
    return commentsArray;
  } catch (error) {
    console.error('Помилка отримання коментарів за photoUri:', error);
    throw error;
  }
};

const fetchCommentsByPhotoUri = async () => {
  try {
    const photoUri = photoUriCom;
    const comments = await getCommentsByPhotoUri(photoUri);
    setComment(comments);
} catch (error) {
}
};
useEffect(() => {
  fetchCommentsByPhotoUri();
}, []);
  


    const goBack = () => {
    navigation.navigate('Home');
  };

   const photoUri = route.params.photoUri || '';
  return (
    <View style={styles.commentsScreenContainer}>
      <View style={styles.commentsHeaderContainer}>
        <TouchableOpacity onPress={goBack}>
          <Ionicons name="arrow-back" size={24} color="#212121" />
        </TouchableOpacity>
        <Text style={styles.commentsHeader}>Коментарі</Text>
      </View>
      <View
        style={{
          paddingLeft: 16,
          paddingRight: 16,
          marginBottom: 20,
        }}
      >
        <View style={styles.postPhotoContainer}>
          <Image source={{uri: photoUri}}
            style={{
              width: '100%',
              height: 240,
              borderRadius: 8,
            }}
          />
        </View>
      </View>
      <ScrollView
        style={{ margin: 0, padding: 0 }}
        showsVerticalScrollIndicator={false}
      >
        {comment ? (
          comment.map(({ id, uid ,  text, date, userAvatar, time }) => {
            const isCurrentUserComment = uid === userUid;
          return (
<View
          key={id}
          style={[
            styles.commentContainer,
            isCurrentUserComment ? { flexDirection: 'row-reverse' } : {},
          ]}
        >
          <Image source={{ uri: userAvatar }} style={styles.userIcon} />
          <View
            style={[
              styles.comment,
              isCurrentUserComment
                ? { borderTopEndRadius: 0, borderTopLeftRadius: 6 }
                : { borderTopStartRadius: 0, borderTopRightRadius: 6 },
            ]}
          >
            <Text style={styles.text}>{text}</Text>
            <Text
              style={[
                styles.date,
                isCurrentUserComment
                  ? { marginLeft: 'auto', marginRight: 0 }
                  : { marginLeft: 0, marginRight: 'auto' },
              ]}
            >
              {date} | {time}
            </Text>
          </View>
        </View>
      );
    })
  ) :
    <Text>Loading</Text>}
      </ScrollView>
      <View style={styles.container}>
        <TextInput style={styles.input}
  placeholder="Коментувати..."
  value={commentText}
  onChangeText={(text) => setCommentText(text)} />
        <TouchableOpacity onPress={leaveComment} style={styles.button}>
          <AntDesign name="arrowup" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  commentsScreenContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff',
  },
  commentsHeaderContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    width: '100%',
    height: 90,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 12,
    marginBottom: 32,
    borderStyle: 'solid',
    borderColor: '#E8E8E8',
    borderBottomWidth: 1,
  },
  commentsHeader: {
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: 17,
  },

  postPhotoContainer: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 8,
    width: '100%',
    height: 240,
    backgroundColor: '#F6F6F6',
    borderRadius: 8,
    borderStyle: 'solid',
    borderColor: '#E8E8E8',
    borderWidth: 1,
  },
  addPhotoButton: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    backgroundColor: '#ffffff',
    borderRadius: 50,
  },
  photoMetaInput: {
    width: '100%',
    height: 50,
    marginBottom: 16,
    fontSize: 16,
    color: '#212121',
    borderStyle: 'solid',
    borderColor: '#E8E8E8',
    borderBottomWidth: 1,
  },
  mapButton: {
    position: 'absolute',
    top: 13,
  },
  publishButton: {
    width: '100%',
    height: 50,
    marginBottom: 80,
    padding: 16,
    borderRadius: 100,
    backgroundColor: '#FF6C00',
  },
  removePostButton: {
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 40,
    backgroundColor: '#F6F6F6',
    borderRadius: 20,
  },
  commentContainer: {
    marginBottom: 18,
    paddingLeft: 16,
    paddingRight: 16,
    minWidth: '100%',
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
  },
  userIcon: {
    width: 28,
    height: 28,
    borderRadius: 50,
    backgroundColor: 'gray',
  },
  comment: {
    maxWidth: 299,
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    borderBottomEndRadius: 6,
    borderBottomLeftRadius: 6,
    borderTopEndRadius: 6,
  },
  text: {
    marginBottom: 8,
    fontSize: 13,
    lineHeight: 16,
    color: '#212121',
  },
  date: {
    marginLeft: 'auto',
    fontSize: 10,
    color: '#BDBDBD',
  },
  container: {
    position: 'relative',
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    minWidth: '100%',
  },
  input: {
    height: 50,
    padding: 16,
    color:'#BDBDBD',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 100,
    backgroundColor: '#F6F6F6',
  },
  button: {
    position: 'absolute',
    right: 24,
    top: 8,
    width: 34,
    height: 34,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: '#FF6C00',
  },
});