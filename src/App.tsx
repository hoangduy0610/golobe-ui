import AppRoute from '@/routes/AppRoute';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { EditorProvider } from 'react-simple-wysiwyg';

export default function App() {
  return (
    <Provider store={store}>
      <EditorProvider>
        <PersistGate loading={null} persistor={persistor}>
          <AppRoute />
        </PersistGate>
      </EditorProvider>
    </Provider>
  );
}
