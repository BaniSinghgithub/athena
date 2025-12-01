import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CameraScreen from './screens/CameraScreen';
import DetailsScreen from './screens/DetailsScreen';
import ModelViewScreen from './screens/ModelViewScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Camera">
        <Stack.Screen 
          name="Camera" 
          component={CameraScreen}
          options={{ title: 'Scan Artifact' }}
        />
        <Stack.Screen 
          name="Details" 
          component={DetailsScreen}
          options={{ title: 'Artifact Details' }}
        />
        <Stack.Screen 
          name="ModelView" 
          component={ModelViewScreen}
          options={{ title: '3D Model' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

