import React from 'react';
import {Provider} from 'react-redux';
import {useSelector} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import {CircularLoader} from './src/components';
import {store, persistor, RootState} from './src/store';
import {MainNavigator} from './src/store/navigator/mainNavigator';

const AppContent: React.FC = () => {
  const isLoading = useSelector((state: RootState) => state.app.isLoading);

  return (
    <>
      <MainNavigator />
      {isLoading && <CircularLoader />}
    </>
  );
};

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContent />
      </PersistGate>
    </Provider>
  );
}

export default App;
