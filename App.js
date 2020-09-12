import React from 'react';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import AuthControl from './src/Route/index';
// import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {COLORS} from './src/assets/colors';

// const theme = {
//   ...DefaultTheme,
//   roundness: 2,
//   colors: {
//     ...DefaultTheme.colors,
//     primary: COLORS.primarycolor,
//     accent: COLORS.lightcolor,
//   },
// };
const App = () => {
  return (
    // <PaperProvider>
    <Provider store={store}>
      <AuthControl />
    </Provider>
    // </PaperProvider>
  );
};

export default App;
