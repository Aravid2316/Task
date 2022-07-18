import React from 'react';
import Homestack from './src/routers/Homestack'
import { Provider } from 'react-redux';
import store, { persister } from './src/redux/store'
import { PersistGate } from 'redux-persist/integration/react';
const YourApp = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persister}>
        <Homestack />
      </PersistGate>
    </Provider>
  );
}

export default YourApp;