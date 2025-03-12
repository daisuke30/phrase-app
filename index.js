import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';
import App from './App';

if (process.env.NODE_ENV !== 'production') {
  const gestureHandlerRootHOC =
    require('react-native-gesture-handler/lib/commonjs/GestureHandlerRootView').default;
  if (gestureHandlerRootHOC) {
    App = gestureHandlerRootHOC(App);
  }
}

registerRootComponent(App);
