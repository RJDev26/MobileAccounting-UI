
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import AddAccount from '../Stack/addAccount'
import AddVoucher from '../Stack/addVoucher'
import EditAccount from '../Stack/EditAccount'
import TabNavigator from "./Tab"
import EditVoucher from "../Stack/EditVoucher"
import AccountGroup from "../Stack/accountGroup"
import AddAccountGroup from "../Stack/addAccountGroup"

const Stack = createNativeStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MobileAccounting"
        component={TabNavigator}
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
        <Stack.Screen
        name="EditAccount"
        component={EditAccount}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="AddVoucher"
        component={AddVoucher}
        options={{
          headerShown: false
        }}
      />      
      <Stack.Screen
        name="EditVoucher"
        component={EditVoucher}
        options={{
          headerShown: false
        }}
      />   
      <Stack.Screen
        name="AccountGroup"
        component={AccountGroup}
        options={{
          headerShown: false
        }}
      /> 
      <Stack.Screen
        name="AddAccountGroup"
        component={AddAccountGroup}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  )
}


export default StackNavigator