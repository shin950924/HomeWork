import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import TitleBar from '../Common/TitleBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyncGetItem from '../AsyncGetItem/AsyncGetItem';
import Issue from '../Issue/Issue';
import {useContext} from 'react/cjs/react.development';
import AppContext from '../../service/AppContext';

const Main = ({navigation}) => {
  //context setAsyncStorageValue는 AsyncStorage의 정보를 저장, setNavigation은 화면이동에서 팔요한 navigation정보를 저장
  const {setAsyncStorageValue, setNavigation} = useContext(AppContext);
  useEffect(() => {
    async function asyncStorageRepository() {
      const data = await AsyncStorage.getItem('repository');
      if (data == null) {
        setAsyncStorageValue([]);
      } else {
        //AsyncStorage의 저장된 데이터는 문자열 데이터 이므로 JSON으로 변경해 줘야됨.
        setAsyncStorageValue(JSON.parse(data));
      }
    }
    setNavigation(navigation);
    asyncStorageRepository();
  }, []);
  //Render
  //1.처음 Rendering
  //2.AsyncStorage Rendering 될때
  //3.navigation 을 Context에 저장할때
  return (
    <SafeAreaView>
      {/* 타이틀바 부분 공통 Component 검색 가능 여부, 상단 제목, (get,set)검색명을 Props로 받음 */}
      <TitleBar isSearch={false} title={'Subscribe Repository'} />
      {/* AsyncGetItem 부분 AsyncStorage에서 받은 데이터를 목록으로 가져옴*/}
      <AsyncGetItem />
      <TitleBar isSearch={false} title={'Subscribe Issue'} />
      {/* 구독(Public Repository) 부분의 이슈를 가져옴*/}
      <Issue />
    </SafeAreaView>
  );
};

export default Main;
