import React from 'react';
import {
  TouchableOpacity,
  Text,
  Dimensions,
  View,
  FlatList,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Add from '../../Asset/Add.png';
import Trash from '../../Asset/Trash.png';
import AppContext from '../../service/AppContext';
import {useContext} from 'react/cjs/react.development';
const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');

const AsyncGetItem = () => {
  const {asyncStorageValue, setAsyncStorageValue, navigation} =
    useContext(AppContext);
  const deleteData = index => {
    const deleteData = asyncStorageValue.filter((item, idx) => index != idx);
    setAsyncStorageValue(deleteData);
    //AsyncStorage는 문자을 저장하므로 JSON.stringify를 이용해서 문자열을 저장해야됨
    AsyncStorage.setItem('repository', JSON.stringify(deleteData));
  };

  const renderItem = (item, index) => {
    return (
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          height: height * 0.05,
          alignItems: 'center',
        }}
        key={index}>
        <TouchableOpacity onPress={() => deleteData(index)}>
          <Text>{item.name}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginRight: width * 0.05}}
          onPress={() => deleteData(index)}>
          <Image
            source={Trash}
            style={{width: height * 0.02, height: height * 0.02}}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={asyncStorageValue}
        renderItem={({item, index}) => renderItem(item, index)}
        style={{maxHeight: height * 0.3}}
      />
      {asyncStorageValue.length < 4 ? (
        <TouchableOpacity
          style={{
            alignSelf: 'center',
            height: height * 0.04,
            justifyContent: 'center',
          }}
          onPress={() => navigation.navigate('LoginRepository')}>
          <Image
            source={Add}
            style={{width: height * 0.03, height: height * 0.03}}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{height: height * 0.05, justifyContent: 'center'}}
          onPress={() => navigation.navigate('LoginRepository')}>
          <Text
            style={{
              textAlign: 'center',
              color: 'red',
              fontSize: height * 0.02,
            }}>
            {' '}
            Search Repository...
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AsyncGetItem;
