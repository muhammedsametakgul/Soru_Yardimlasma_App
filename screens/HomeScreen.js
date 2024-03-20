import { View, Text, StyleSheet, ScrollView} from 'react-native';
import ProfileBox from '../components/ProfileBox';

const HomeScreen = () => {
    const profiles = [
      {
        name: "User1",
        description: "Beğendim",
        imageSource: require('../assets/images/YKS.png'),
      },
      {
        name: "User2",
        description: "Katılıyorum",
        imageSource: require('../assets/images/YKS.png'),
      },
      {
        name: "User3",
        description: "Doğru",
        imageSource: require('../assets/images/YKS.png'),
      },
      {
        name: "User4",
        description: "Functuonality app",
        imageSource: require('../assets/images/sürüm1.jpg'),
      },
    ];
  
    return (
      <ScrollView>
        <View style={styles.screen}>
        {}
        {profiles.map((profile, index) => (
          <ProfileBox
            key={index}
            name={profile.name}
            description={profile.description}
            imageSource={profile.imageSource}
          />
        ))}
      </View>
      </ScrollView>
    );
  };
  




  const styles = StyleSheet.create({
    screen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }
    
  });


export default HomeScreen
  