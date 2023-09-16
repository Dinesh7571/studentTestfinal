
import { Button, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const navigation = useNavigation()
  return (
    
    <>
    
     <Button title="Student screen"  onPress={() => navigation.navigate('StudentScreen')}  /> 
    
     <Button title="set questions"  onPress={() => navigation.navigate('TeacherScreen')}  />

      </>
  );
}


