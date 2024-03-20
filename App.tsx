/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import store from "./src/redux/"
import RootIndex from './src/RootIndex';

function App() {

  return (
    <>
      <Provider store={store} >

        <RootIndex/>
      </Provider>
    </>
  );
}


export default App;
