import React from 'react';
import {Dimensions} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import WebView from 'react-native-webview';

const GitWebView = ({route}) => {
  const {width} = Dimensions.get('window');
  const {height} = Dimensions.get('window');
  console.log('!#', route.params);
  return (
    <SafeAreaView style={{flex: 1}}>
      <WebView
        source={{
          uri: route.params,
        }}
        style={{width: width, height: height}}
      />
    </SafeAreaView>
  );
};

export default GitWebView;
