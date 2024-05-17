
import { SafeAreaView, StyleSheet, Text, View ,Platform,StatusBar} from 'react-native';
import { Box } from './src/Components/Box';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        <Box/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#aab',
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight:0,
  },
  body: {
    flex:1,
    padding:20,
    margin:10,
    borderRadius:10,
    backgroundColor:'white',
  }
});
