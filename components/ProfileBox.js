import { View, Text,StyleSheet, Image } from 'react-native';

const ProfileBox = ({ name, description, imageSource }) => (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Text style={styles.profileName}>{name}</Text>
        <View style={styles.separator}></View>
      </View>
      <Text style={styles.description}>{description}</Text>
      <Image source={imageSource} style={styles.image} />
    </View>
  );

  export default ProfileBox;

  const styles = StyleSheet.create({
   
    container: {
        flex: 1, //Bu uygulanarak bizim sayfamızda %80 width uygulanabiliyor
      width: "90%",
      backgroundColor: '#FFFFFF',
      padding: 20,
      marginVertical: 10,
      borderRadius: 10,
      elevation: 3,
      shadowColor: '#000000', 
      shadowOpacity: 0.3, 
      shadowOffset: { width: 0, height: 2 },
    },
    profileHeader: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    profileName: {
      fontSize: 18,
      fontWeight: 'bold',
      marginRight: 10,
    },
    separator: {
      flex: 1,
      height: 1,
      backgroundColor: '#CCCCCC',
    },
    description: {
      marginVertical: 10,
    },
    image: {
      width: 200,
      height: 200,
      borderRadius: 10,
    },
  });
  