import React, {createContext} from 'react';
import {useState} from 'react/cjs/react.development';
import AppContext from '../AppContext';

export const AppProvider = ({children}) => {
  const setAsyncStorageValue = payload => {
    setAppContext(prevState => {
      return {
        ...prevState,
        asyncStorageValue: payload,
      };
    });
  };

  const setNavigation = payload => {
    setAppContext(prevState => {
      return {
        ...prevState,
        navigation: payload,
      };
    });
  };

  const initialState = {
    asyncStorageValue: [],
    navigation: null,
    setNavigation,
    setAsyncStorageValue,
  };

  const [appContext, setAppContext] = useState(initialState);
  return (
    <AppContext.Provider value={appContext}>{children}</AppContext.Provider>
  );
};
