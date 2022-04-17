import React, {useState, useContext} from 'react';
import {Dimensions, Image, Text, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TextInput} from 'react-native';
import github from '../../Asset/github.png';
import AppContext from '../../service/AppContext';

const LoginRepository = () => {
  const {width} = Dimensions.get('window');
  const {height} = Dimensions.get('window');
  const {navigation} = useContext(AppContext);
  const [repository, setRepository] = useState('');
  const onChange = text => {
    setRepository(text);
  };
  return (
    <SafeAreaView style={{backgroundColor: 'white', height: height}}>
      <KeyboardAwareScrollView scrollEnabled={false}>
        <Image
          source={github}
          style={{
            width: width / 2,
            height: width / 2,
            alignSelf: 'center',
            marginTop: height * (1 / 5),
            marginBottom: height * 0.2,
          }}
        />
        <View
          style={{
            width: width * 0.7,
            height: height * 0.05,
            alignSelf: 'center',
            marginBottom: height * 0.05,
          }}>
          <TextInput
            style={{
              width: width * 0.7,
              height: height * 0.05,
              borderWidth: 1,
              borderRadius: 20,
              alignSelf: 'center',
              paddingLeft: width * 0.05,
            }}
            value={repository}
            onChangeText={text => onChange(text)}
            placeholder="Input Repository Name"
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SearchRepository', repository);
          }}>
          <View
            style={{
              width: width * 0.8,
              height: height * 0.05,
              backgroundColor: 'black',
              justifyContent: 'center',
              alignSelf: 'center',
              borderRadius: 10,
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 20,
                fontWeight: '600',
                color: 'white',
              }}>
              Get Start
            </Text>
          </View>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default LoginRepository;
