import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Search from '../../Asset/Search.png';

const TitleBar = ({isSearch, title, searchWord, setSearchWord}) => {
  const {width} = Dimensions.get('window');
  const {height} = Dimensions.get('window');
  const [isOnClickSearch, setIsOnClickSearch] = useState(false);
  const onChange = text => {
    setSearchWord(text);
  };
  return (
    <View
      style={{
        backgroundColor: 'black',
        height: height * 0.05,
      }}>
      {isSearch ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          {isOnClickSearch ? (
            <TextInput
              style={{
                marginLeft: width * 0.02,
                width: width * 0.8,
                height: height * 0.04,
                borderWidth: 1,
                borderRadius: 10,
                backgroundColor: 'white',
                alignSelf: 'center',
                paddingLeft: width * 0.03,
              }}
              returnKeyType="done"
              onChangeText={text => onChange(text)}
              value={searchWord}
              placeholder="전체 검색 시에는 아무것도 입력하지 마세요."
            />
          ) : (
            <Text
              style={{
                color: 'white',
                fontWeight: '600',
                fontSize: height * 0.03,
              }}>
              {title}
            </Text>
          )}
          <TouchableOpacity
            onPress={() => setIsOnClickSearch(!isOnClickSearch)}>
            <Image
              source={Search}
              style={{width: width * 0.1, height: width * 0.1}}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: 'white',
              fontWeight: '600',
              fontSize: height * 0.03,
            }}>
            {title}
          </Text>
        </View>
      )}
    </View>
  );
};

export default TitleBar;
