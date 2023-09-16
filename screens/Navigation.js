import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'


import React from 'react'
import StudentScreen from './StudentTest';
import TeacherScreen from './TeacherScreen';
import Home from './Home';
const Stack = createNativeStackNavigator();
const Navigation = () => {
    
  return (
<NavigationContainer>
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen name="HomeScreen" component={Home}  />
      <Stack.Screen name="StudentScreen" component={StudentScreen}  />
      <Stack.Screen name="TeacherScreen" component={TeacherScreen} />
      </Stack.Navigator>
</NavigationContainer>
  )
}

export default Navigation

