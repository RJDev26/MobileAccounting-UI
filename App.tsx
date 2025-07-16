import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { StyleSheet, Text, View } from 'react-native'
import MobileAccounting from './component/mobileAccounting/mobileAccounting'
import AccountMaster from './component/accountMaster/accountMaster'
import AddAccount from './component/accountMaster/addAccount'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();


export default function App() {
  return (
    <>
      {/* <NavigationContainer>
        <Stack.Navigator initialRouteName='MobileAccounting'>
          <Stack.Screen
            name="MobileAccounting"
            component={MobileAccounting}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="AccountMaster"
            component={AccountMaster}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="AddAccount"
            component={AddAccount}
            options={{
              headerShown: false
            }}
          />
        </Stack.Navigator>
      </NavigationContainer> */}
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="MobileAccounting" component={MobileAccounting} options={{ headerShown: false, tabBarStyle: { display: 'none' } }} />
          <Tab.Screen name="AccountMaster" component={AccountMaster} options={{ headerShown: false }} />
          {/* <Tab.Screen name="AddAccount" component={AddAccount} options={{ headerShown: false }} /> */}
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
