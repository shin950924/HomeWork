import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginRepository from './Component/LoginRepository/LoginRepository';
import Main from './Component/Main/Main';
import SearchRepository from './Component/SearchRepository/SearchRepository';
import {AppProvider} from './service/Provider/AppProvider';
import GitWebView from './Component/GitWebView/GitWebView';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="LoginRepository" component={LoginRepository} />
          <Stack.Screen name="SearchRepository" component={SearchRepository} />
          <Stack.Screen name="GitWebView" component={GitWebView} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
};

export default App;
