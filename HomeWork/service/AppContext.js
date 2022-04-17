import {createContext} from 'react';

const AppContext = createContext({
  asyncStorageValue: false,
  navigation: null,
  setNavigation: () => {},
  setAsyncStorageValue: () => {},
});

export default AppContext;
