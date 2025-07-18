import COLORS from '../../constants/color'
import { USER, ACCOUNTMASTER, VOUCHER, TRANSACTION, CONFIRM, AUDIT, ACCOUNTGROUP } from '../../utils/imagePath'
import { LinearGradient } from 'expo-linear-gradient'
import { Pressable, StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context'

export default function MobileAccounting({ navigation }: any) {
  return (
    <>        
      <SafeAreaProvider>
        {<SafeAreaView style={styles.container} edges={['top']}>
            <LinearGradient
              colors={['#ec7d20', '#be2b2c']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={{ paddingTop: 20, paddingBottom: 20 }}
            >
              <Text style={styles.heading}>Mobile Accounting</Text>
            </LinearGradient> 
            <ScrollView style={styles.scrollView}>
              <View style={styles.wrap}>
                <View style={styles.cardView}>
                  <LinearGradient
                    colors={['#fff4ec', '#f3f8fb']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{ paddingTop: 16, paddingRight: 12, paddingBottom: 16, paddingLeft: 12, borderRadius: 7 }}
                  >
                    <View style={styles.iconCircle}>
                      <Image source={USER} style={styles.icon} />
                    </View>
                    <Text style={styles.subheading}>{"User \n Management"}</Text>
                  </LinearGradient>
                </View>  
                <View style={styles.cardView}>
                  <Pressable
                    onPress={() => navigation.navigate("AccountMaster")}
                  >
                    <LinearGradient
                      colors={['#fff4ec', '#f3f8fb']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={{ paddingTop: 16, paddingRight: 12, paddingBottom: 16, paddingLeft: 12, borderRadius: 7 }}
                    >
                      <View style={styles.iconCircle}>
                        <Image source={ACCOUNTMASTER} style={styles.icon} />
                      </View>
                      <Text style={styles.subheading}>Account Master</Text>
                    </LinearGradient>
                  </Pressable>
                </View>  
                <View style={styles.cardView}>
                  <Pressable
                    onPress={() => navigation.navigate("VoucherEntry")}
                  >
                    <LinearGradient
                      colors={['#fff4ec', '#f3f8fb']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={{ paddingTop: 16, paddingRight: 12, paddingBottom: 16, paddingLeft: 12, borderRadius: 7 }}
                    >
                      <View style={styles.iconCircle}>
                        <Image source={VOUCHER} style={styles.icon} />
                      </View>
                      <Text style={styles.subheading}>{"Voucher \n Entry"}</Text>
                    </LinearGradient>
                  </Pressable>
                </View>  
                <View style={styles.cardView}>
                  <LinearGradient
                    colors={['#fff4ec', '#f3f8fb']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{ paddingTop: 16, paddingRight: 12, paddingBottom: 16, paddingLeft: 12, borderRadius: 7 }}
                  >
                    <View style={styles.iconCircle}>
                      <Image source={TRANSACTION} style={styles.icon} />
                    </View>
                    <Text style={styles.subheading}>Transaction Details</Text>
                  </LinearGradient>
                </View>  
                <View style={styles.cardView}>
                  <LinearGradient
                    colors={['#fff4ec', '#f3f8fb']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{ paddingTop: 16, paddingRight: 12, paddingBottom: 16, paddingLeft: 12, borderRadius: 7 }}
                  >
                    <View style={styles.iconCircle}>
                      <Image source={CONFIRM} style={styles.icon} />
                    </View>
                    <Text style={styles.subheading}>{"Confirm \n Entry"}</Text>
                  </LinearGradient>
                </View>  
                <View style={styles.cardView}>
                  <LinearGradient
                    colors={['#fff4ec', '#f3f8fb']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{ paddingTop: 16, paddingRight: 12, paddingBottom: 16, paddingLeft: 12, borderRadius: 7 }}
                  >
                    <View style={styles.iconCircle}>
                      <Image source={AUDIT} style={styles.icon} />
                    </View>
                    <Text style={styles.subheading}>{"Audit \n Logs"}</Text>
                  </LinearGradient>
                </View>    
                <View style={styles.cardView}>
                  <LinearGradient
                    colors={['#fff4ec', '#f3f8fb']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{ paddingTop: 16, paddingRight: 12, paddingBottom: 16, paddingLeft: 12, borderRadius: 7 }}
                  >
                    <View style={styles.iconCircle}>
                      <Image source={ACCOUNTGROUP} style={styles.icon} />
                    </View>
                    <Text style={styles.subheading}>Account Group Master</Text>
                  </LinearGradient>
                </View>
                <View style={styles.cardView}>
                  <LinearGradient
                    colors={['#fff4ec', '#f3f8fb']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{ paddingTop: 16, paddingRight: 12, paddingBottom: 16, paddingLeft: 12, borderRadius: 7 }}
                  >
                    <View style={styles.iconCircle}>
                      <Image source={USER} style={styles.icon} />
                    </View>
                    <Text style={styles.subheading}>Account Group Details</Text>
                  </LinearGradient>
                </View>            
              </View>
            </ScrollView>
        </SafeAreaView>}
      </SafeAreaProvider>       
    </>
  )
}

const styles = StyleSheet.create({
  heading: {
    color: COLORS.white,
    fontWeight: '500',
    fontSize: 20,
    textAlign: 'center',
  },
  container: {
    backgroundColor: COLORS.black,
    paddingTop: 0,
  },
  scrollView: {
    backgroundColor: COLORS.white,
    height: '100%',    
    paddingTop: 16,
    paddingLeft: 12,
    paddingRight: 12,
    paddingBottom: 24,
  },
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1
  },
  cardView: {
    width: '33%',
    padding: 8
  },
  iconCircle: {
    backgroundColor: COLORS.white,
    width: 64,
    height: 64, 
    borderRadius: 30,
    margin: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  icon: {
    width: 40,
    height: 40
  },
  subheading: {
    color: COLORS.black,
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
    paddingTop: 12,
    minHeight: 54
  }
})