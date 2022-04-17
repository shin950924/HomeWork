import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  TextInput,
  Text,
  Dimensions,
  View,
  FlatList,
} from 'react-native';
import * as api from '../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaView} from 'react-native-safe-area-context';
import TitleBar from '../Common/TitleBar';
import AppContext from '../../service/AppContext';
import {useContext} from 'react/cjs/react.development';

const SearchRepository = ({route}) => {
  const [searchWord, setSearchWord] = useState('');
  const [searchList, setSearchList] = useState([]);
  const [gitInfo, setGitInfo] = useState(undefined);
  const {asyncStorageValue, setAsyncStorageValue, navigation} =
    useContext(AppContext);
  const {width} = Dimensions.get('window');
  const {height} = Dimensions.get('window');
  useEffect(() => {
    async function getGitRepository() {
      const res = await api.git(route.params);
      setGitInfo(res.data);
      setSearchList(res.data);
    }
    getGitRepository();
  }, []);

  useEffect(() => {
    let temp = [];
    if (searchWord == '') {
      setSearchList(gitInfo);
    } else {
      gitInfo &&
        gitInfo.map((item, index) => {
          item.name.includes(searchWord) && temp.push(item);
        });
      setSearchList([...temp]);
    }
  }, [searchWord]);

  const deleteData = index => {
    const deleteData = asyncStorageValue.filter((item, idx) => index != idx);
    setAsyncStorageValue(deleteData);
    AsyncStorage.setItem('repository', JSON.stringify(deleteData));
  };

  const addData = item => {
    if (asyncStorageValue.length < 4) {
      const concatData = asyncStorageValue.concat(item);
      setAsyncStorageValue(concatData);
      AsyncStorage.setItem('repository', JSON.stringify(concatData));
    } else {
      alert('4개 이상은 저장할 수 없습니다.');
    }
  };

  const checkDuplicate = (async, item) => {
    for (let i = 0; i < async.length; i++) {
      if (async[i].name == item) {
        return true;
      }
    }
    return false;
  };

  const renderItem = (item, index) => {
    return (
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          height: height * 0.05,
        }}>
        <TouchableOpacity onPress={() => addData(item)}>
          <Text>{item.name}</Text>
        </TouchableOpacity>
        {checkDuplicate(asyncStorageValue, item.name) ? (
          <TouchableOpacity
            style={{marginRight: width * 0.05}}
            onPress={() => deleteData(index)}>
            <Text>삭제</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{marginRight: width * 0.05}}
            onPress={() => {
              addData(item);
              navigation.navigate('Main');
            }}>
            <Text>추가</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };
  return (
    <SafeAreaView>
      <TitleBar
        isSearch={true}
        title={'Repository'}
        searchWord={searchWord}
        setSearchWord={setSearchWord}
      />
      <FlatList
        data={searchList}
        renderItem={({item, index}) => renderItem(item, index)}
        style={{height: height * 0.3}}
      />
    </SafeAreaView>
  );
};

export default SearchRepository;
