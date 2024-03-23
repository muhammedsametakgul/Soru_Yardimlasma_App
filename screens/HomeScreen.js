import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
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
      description: "Functionality app",
      imageSource: require('../assets/images/sürüm1.jpg'),
    },
  ];

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {profiles.map((profile, index) => (
          <View key={index} style={styles.profileWrapper}>
            <ProfileBox
              name={profile.name}
              description={profile.description}
              imageSource={profile.imageSource}
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 100, 
  },
  profileWrapper: {
    alignItems: 'center', 
    margin: 10, 
  },
});

export default HomeScreen;
