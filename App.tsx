import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { LinearGradient } from 'expo-linear-gradient'
import * as Sentry from '@sentry/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { enableScreens } from 'react-native-screens';
import EditAccount from './src/Stack/EditAccount'
import StackNavigator from './src/Navigation/Stack'

enableScreens(true);

Sentry.init({
  dsn: 'https://66eebed4bfec45895342e29224fb6c30@o4509707199053824.ingest.us.sentry.io/4509707204624384',
  sendDefaultPii: true,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()],
});

const Tab = createBottomTabNavigator();



export default Sentry.wrap(function App() {
  return (
    <>
    <SafeAreaProvider>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
      </SafeAreaProvider>
    </>
  );
});

