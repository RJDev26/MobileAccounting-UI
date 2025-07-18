import React, { useState } from 'react';
import COLORS from '../../constants/color'
import { Pressable, StyleSheet, Text, View, ScrollView, Image, TextInput, Button } from 'react-native'
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context'
import { BACK, UPARROW, DOWNARROW } from '../../utils/imagePath'
import { LinearGradient } from 'expo-linear-gradient'
import Modal from 'react-native-modal'
import Feather from '@react-native-vector-icons/feather'

export default function AccountMaster({ navigation }: any) {
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
            <Pressable
                onPress={() => navigation.goBack()}
                style={styles.back}
            >
                <Image source={BACK} style={styles.backIcon} />
            </Pressable>
            <Text style={styles.heading}>Voucher Entry</Text>
          </LinearGradient> 
        </SafeAreaView>}
        <View style={styles.searchbar}>
          <TextInput
              style={styles.input}
              placeholder="Search"
          />
          <Feather name="search" color="#ec7e1d" size={24} style={styles.searchIcon} />
      </View>
        <ScrollView style={styles.scrollView}>
          <Pressable>
            <View style={styles.whiteCard}>  
              <View style={[styles.rowColumn]}>
                <Text style={styles.label}>Voucher ID</Text>
                <Text style={styles.valueText}>Pun897</Text>
              </View>
              <View style={[styles.rowColumn]}>
                <Text style={styles.label}>Account Code</Text>
                <Text style={styles.valueText}>7436941</Text>
              </View>  
              <View style={[styles.rowColumn]}>
                <Text style={styles.label}>Account</Text>
                <Text style={styles.valueText}>
                  <Image source={UPARROW} style={styles.upArrow} />
                  &nbsp; ₹ 33,000
                </Text>
              </View> 
              <View style={[styles.rowColumn]}>
                <Text style={styles.label}>Narration</Text>
                <Text style={styles.valueText}>
                  -
                </Text>
              </View> 
              <View style={[styles.rowColumn]}>
                <Text style={styles.label}>Confirm Flag</Text>
                <Text style={styles.valueText}>
                  NA
                </Text>
              </View>                         
            </View>          
          </Pressable>
          <Pressable>
            <View style={styles.whiteCard}>  
              <View style={[styles.rowColumn]}>
                <Text style={styles.label}>Voucher ID</Text>
                <Text style={styles.valueText}>Pun897</Text>
              </View>
              <View style={[styles.rowColumn]}>
                <Text style={styles.label}>Account Code</Text>
                <Text style={styles.valueText}>7436941</Text>
              </View>  
              <View style={[styles.rowColumn]}>
                <Text style={styles.label}>Account</Text>
                <Text style={styles.valueText}>
                  <Image source={UPARROW} style={styles.upArrow} />
                  &nbsp; ₹ 33,000
                </Text>
              </View> 
              <View style={[styles.rowColumn]}>
                <Text style={styles.label}>Narration</Text>
                <Text style={styles.valueText}>
                  -
                </Text>
              </View> 
              <View style={[styles.rowColumn]}>
                <Text style={styles.label}>Confirm Flag</Text>
                <Text style={styles.valueText}>
                  NA
                </Text>
              </View>                         
            </View>          
          </Pressable>
          <Pressable>
            <View style={styles.whiteCard}>  
              <View style={[styles.rowColumn]}>
                <Text style={styles.label}>Voucher ID</Text>
                <Text style={styles.valueText}>Pun897</Text>
              </View>
              <View style={[styles.rowColumn]}>
                <Text style={styles.label}>Account Code</Text>
                <Text style={styles.valueText}>7436941</Text>
              </View>  
              <View style={[styles.rowColumn]}>
                <Text style={styles.label}>Account</Text>
                <Text style={styles.valueText}>
                  <Image source={UPARROW} style={styles.upArrow} />
                  &nbsp; ₹ 33,000
                </Text>
              </View> 
              <View style={[styles.rowColumn]}>
                <Text style={styles.label}>Narration</Text>
                <Text style={styles.valueText}>
                  -
                </Text>
              </View> 
              <View style={[styles.rowColumn]}>
                <Text style={styles.label}>Confirm Flag</Text>
                <Text style={styles.valueText}>
                  NA
                </Text>
              </View>                         
            </View>          
          </Pressable>
          <Pressable>
            <View style={styles.whiteCard}>  
              <View style={[styles.rowColumn]}>
                <Text style={styles.label}>Voucher ID</Text>
                <Text style={styles.valueText}>Pun897</Text>
              </View>
              <View style={[styles.rowColumn]}>
                <Text style={styles.label}>Account Code</Text>
                <Text style={styles.valueText}>7436941</Text>
              </View>  
              <View style={[styles.rowColumn]}>
                <Text style={styles.label}>Account</Text>
                <Text style={styles.valueText}>
                  <Image source={UPARROW} style={styles.upArrow} />
                  &nbsp; ₹ 33,000
                </Text>
              </View> 
              <View style={[styles.rowColumn]}>
                <Text style={styles.label}>Narration</Text>
                <Text style={styles.valueText}>
                  -
                </Text>
              </View> 
              <View style={[styles.rowColumn]}>
                <Text style={styles.label}>Confirm Flag</Text>
                <Text style={styles.valueText}>
                  NA
                </Text>
              </View>                         
            </View>          
          </Pressable>
          <Pressable>
            <View style={styles.whiteCard}>  
              <View style={[styles.rowColumn]}>
                <Text style={styles.label}>Voucher ID</Text>
                <Text style={styles.valueText}>Pun897</Text>
              </View>
              <View style={[styles.rowColumn]}>
                <Text style={styles.label}>Account Code</Text>
                <Text style={styles.valueText}>7436941</Text>
              </View>  
              <View style={[styles.rowColumn]}>
                <Text style={styles.label}>Account</Text>
                <Text style={styles.valueText}>
                  <Image source={UPARROW} style={styles.upArrow} />
                  &nbsp; ₹ 33,000
                </Text>
              </View> 
              <View style={[styles.rowColumn]}>
                <Text style={styles.label}>Narration</Text>
                <Text style={styles.valueText}>
                  -
                </Text>
              </View> 
              <View style={[styles.rowColumn]}>
                <Text style={styles.label}>Confirm Flag</Text>
                <Text style={styles.valueText}>
                  NA
                </Text>
              </View>                         
            </View>          
          </Pressable>
        </ScrollView>
      </SafeAreaProvider>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.black,
    paddingTop: 0,
    color: COLORS.white
  },
  back: {
    width: 30,
    height: 30,
    position: 'absolute',
    top: 18,
    left: 12,
    zIndex: 4
  },
  backIcon: {
    width: 30,
    height: 30
  },
  heading: {
    color: COLORS.white,
    fontWeight: '500',
    fontSize: 20,
    textAlign: 'center'
  },
  searchbar: {
    backgroundColor: '#ececec',
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
  },
  input: {
    backgroundColor: COLORS.white,
    height: 48,
    borderWidth: 1,
    borderColor: '#DFDFDF',
    borderRadius: 50,
    paddingLeft: 12,
    paddingRight: 12, 
  },
  searchIcon: {
    position: 'absolute',
    bottom: 12,
    right: 28,
    zIndex: 3
  },
  scrollView: {
    backgroundColor: '#ececec', 
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16
  },
  whiteCard: {
    backgroundColor: COLORS.white,
    width: '100%',   
    paddingTop: 12,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1'
  },
  rowColumn: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    display: 'flex'
  },
  label: {
    color: COLORS.lightGrey,
    fontSize: 13,
    fontWeight: 400,
    paddingTop: 4,
    textAlign: 'left'
  },
  valueText: {
    color: COLORS.black,
    fontSize: 13,
    fontWeight: 500,
    paddingTop: 4
  },
  upArrow: {
    width: 8,
    height: 8
  }, 
})