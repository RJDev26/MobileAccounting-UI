import { ACCOUNTMASTER, ACCOUNTMASTER_GREY, VOUCHER, VOUCHER_GREY, DASHBOARD_WHITE, TRANSACTION, TRANSACTION_GREY, LEDGER, LEDGER_GREY } from '../utils/imagePath'
import { StyleSheet, Image, Text, View } from 'react-native'
import MobileAccounting from '../Stack/mobileAccounting'
import AccountMaster from '../BottomBar/accountMaster'
import VoucherEntry from '../BottomBar/voucherEntry'
import GeneralLedger from '../BottomBar/generalLedger'
import TrailBalance from '../BottomBar/TrailBalance'
import { LinearGradient } from 'expo-linear-gradient'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'


const Tab = createBottomTabNavigator();




function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="MobileAccountingTab"
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
              Accounts
            </Text>
          )
        }}
      />
      <Tab.Screen
        name="GeneralLedger"
        component={GeneralLedger}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Image source={focused ? LEDGER : LEDGER_GREY} style={styles.menuIcon} />
          ),
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ color: focused ? '#cd4a26' : '#979797', fontSize: focused ? 11 : 10, marginTop: 4 }}>
              Ledger
            </Text>
          )
        }}
      />
      <Tab.Screen
        name="MobileAccountingTab"
        component={MobileAccounting}
        options={{
          headerShown: false,
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
              Vouchers
            </Text>
          )
        }}
      />
      <Tab.Screen
        name="TrailBalance"
        component={TrailBalance}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Image source={focused ? TRANSACTION : TRANSACTION_GREY} style={styles.menuIcon} />
          ),
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ color: focused ? '#cd4a26' : '#979797', fontSize: focused ? 11 : 10, marginTop: 4 }}>
              Trial Balance
            </Text>
          )
        }}
      />
    </Tab.Navigator>
  )
}


export default TabNavigator


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