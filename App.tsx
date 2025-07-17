import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { ACCOUNTMASTER, ACCOUNTMASTER_GREY, VOUCHER, VOUCHER_GREY, DASHBOARD_WHITE, TRANSACTION, TRANSACTION_GREY } from './utils/imagePath'
import { StyleSheet, Image, Text, View } from 'react-native'
import MobileAccounting from './component/mobileAccounting/mobileAccounting'
import AccountMaster from './component/accountMaster/accountMaster'
import VoucherEntry from './component/voucherEntry/voucherEntry'
import AccountList from './component/accountList/accountList'
import TransactionDetails from './component/transactionDetails/transactionDetails'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { LinearGradient } from 'expo-linear-gradient'

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
        </Stack.Navigator>
      </NavigationContainer> */}
      <NavigationContainer >
        <Tab.Navigator 
          initialRouteName="MobileAccounting"
          screenOptions={{
            tabBarActiveTintColor: '#ffd33d',
            tabBarStyle: {
              position: 'absolute',
              borderTopWidth: 0,
              paddingTop: 5,
              paddingBottom: 5,
              elevation: 10, // Android shadow
              shadowColor: '#000', // iOS shadow
              shadowOffset: { width: 0, height: -2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }
          }}>
          <Tab.Screen 
            name="AccountMaster" 
            component={AccountMaster} 
            options={{ 
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <Image source={focused ? ACCOUNTMASTER : ACCOUNTMASTER_GREY} style={styles.menuIcon} />
              ),
              tabBarLabel: ({ focused, color }) => (
                <Text style={{ color: focused ? '#cd4a26' : '#979797', fontSize: focused ? 11 : 10, marginTop: 4 }}>
                  Account
                </Text>
              )
            }} 
          />
          <Tab.Screen 
            name="AccountList" 
            component={AccountList} 
            options={{ 
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <Image source={focused ? ACCOUNTMASTER : ACCOUNTMASTER_GREY} style={styles.menuIcon} />
              ),
              tabBarLabel: ({ focused, color }) => (
                <Text style={{ color: focused ? '#cd4a26' : '#979797', fontSize: focused ? 11 : 10, marginTop: 4 }}>
                  Account List
                </Text>
              )
            }} 
          />     
          <Tab.Screen 
            name="MobileAccounting" 
            component={MobileAccounting} 
            options={{ 
              headerShown: false, 
              tabBarStyle: { display: 'none' },
              tabBarLabel: ({ focused, color }) => (
                <LinearGradient
                  colors={['#ec7d20', '#be2b2c']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  style={{ 
                    width: 60,
                    height: 60,
                    position: 'absolute',
                    top: -20,
                    borderRadius: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex'
                  }}
                >
                  <View>
                    <Image source={DASHBOARD_WHITE} style={styles.menuIcon} />
                  </View>
                  {/* <Text>Dashboard</Text> */}
                </LinearGradient>                
              )
            }} 
          />     
          <Tab.Screen 
            name="VoucherEntry" 
            component={VoucherEntry} 
            options={{ 
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <Image source={focused ? VOUCHER : VOUCHER_GREY} style={styles.menuIcon} />
              ),
              tabBarLabel: ({ focused, color }) => (
                <Text style={{ color: focused ? '#cd4a26' : '#979797', fontSize: focused ? 11 : 10, marginTop: 4 }}>
                  Voucher
                </Text>
              )
            }} 
          />
          <Tab.Screen 
            name="TransactionDetails" 
            component={TransactionDetails} 
            options={{ 
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <Image source={focused ? TRANSACTION : TRANSACTION_GREY} style={styles.menuIcon} />
              ),
              tabBarLabel: ({ focused, color }) => (
                <Text style={{ color: focused ? '#cd4a26' : '#979797', fontSize: focused ? 11 : 10, marginTop: 4 }}>
                  Transactions
                </Text>
              )
            }} 
          />
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
  menuIcon: {
    width: 30,
    height: 30
  }
});
