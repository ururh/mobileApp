import { Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native'
import React from 'react'
import { EvilIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
      const navigation = useNavigation();

  const handleGoToComments = () => {
    navigation.navigate('Comments');
    };
    
 const handleGoToMap = () => {
    navigation.navigate('Map');
    };

    return (
        <View style={styles.container}>
          <View style={styles.userContainer}>
                <Image style={styles.avatarImg} />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>Natali Romanova</Text>
              <Text style={styles.userEmail}>email@example.com</Text>
            </View>
          </View>
            <TouchableOpacity onPress={handleGoToComments}>
                <EvilIcons name="comment" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleGoToMap}>
                <EvilIcons name="location" size={24} color="black" />
            </TouchableOpacity>
      </View>
    )
}
  
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
    },
    userContainer: {
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
})