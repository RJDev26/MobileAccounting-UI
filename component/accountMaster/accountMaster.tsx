import React, { useState } from 'react';
import COLORS from '../../constants/color'
import { Pressable, StyleSheet, Text, View, ScrollView, Image, TextInput } from 'react-native'
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context'
import { BACK, UPARROW, DOWNARROW } from '../../utils/imagePath'
import { LinearGradient } from 'expo-linear-gradient'
import Modal from 'react-native-modal'
import Feather from '@react-native-vector-icons/feather'

export default function AccountMaster({ navigation }: any) {
    const [value, setValue] = React.useState('Credit')
    const [isVisible, setIsVisible] = useState(false)
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
                        <Text style={styles.heading}>Account Master</Text>
                    </LinearGradient> 
                </SafeAreaView>}
                <Pressable
                    style={styles.add}
                    onPress={() => navigation.navigate("AddAccount")}
                >
                    <Text style={styles.plusIcon}>+</Text>          
                </Pressable>
                <View style={styles.searchbar}>
                    <TextInput
                        style={styles.input}
                        placeholder="Search"
                    />
                    <Feather name="search" color="#ec7e1d" size={24} style={styles.searchIcon} />
                </View>
                <ScrollView style={styles.scrollView}>
                    <Pressable
                        onPress={() => setIsVisible(true)}
                    >
                        <View style={styles.whiteCard}>  
                            <View style={[styles.circle, styles.purple]}>
                                <Text style={styles.alphanumeric}>P</Text>
                            </View>      
                            <Text style={styles.name}>Puneesh Kapoor</Text>
                            <View style={styles.spaceBetween}>
                                <Text style={styles.shortCode}>Pun897</Text>
                                <Text style={styles.amoumt}>
                                    <Image source={UPARROW} style={styles.upArrow} />
                                    &nbsp; ₹ 33,000
                                </Text>
                            </View>                        
                        </View>          
                    </Pressable>
                    <View style={styles.whiteCard}>  
                        <View style={styles.circle}>
                            <Text style={styles.alphanumeric}>B</Text>
                        </View>      
                        <Text style={styles.name}>Bharti Kapoor</Text>
                        <View style={styles.spaceBetween}>
                            <Text style={styles.shortCode}>Pun897</Text>
                            <Text style={styles.amoumt}>
                                <Image source={DOWNARROW} style={styles.upArrow} />
                                &nbsp; ₹ 64,000
                            </Text>
                        </View>                        
                    </View>
                    <View style={styles.whiteCard}>  
                        <View style={[styles.circle, styles.blue]}>
                            <Text style={styles.alphanumeric}>P</Text>
                        </View>      
                        <Text style={styles.name}>Puneesh Kapoor</Text>
                        <View style={styles.spaceBetween}>
                            <Text style={styles.shortCode}>Pun897</Text>
                            <Text style={styles.amoumt}>
                                <Image source={UPARROW} style={styles.upArrow} />
                                &nbsp; ₹ 33,000
                            </Text>
                        </View>                        
                    </View>
                    <View style={styles.whiteCard}>  
                        <View style={[styles.circle, styles.brown]}>
                            <Text style={styles.alphanumeric}>B</Text>
                        </View>      
                        <Text style={styles.name}>Bharti Kapoor</Text>
                        <View style={styles.spaceBetween}>
                            <Text style={styles.shortCode}>Pun897</Text>
                            <Text style={styles.amoumt}>
                                <Image source={DOWNARROW} style={styles.upArrow} />
                                &nbsp; ₹ 64,000
                            </Text>
                        </View>                        
                    </View>
                    <View style={styles.whiteCard}>  
                        <View style={[styles.circle, styles.purple]}>
                            <Text style={styles.alphanumeric}>P</Text>
                        </View>      
                        <Text style={styles.name}>Puneesh Kapoor</Text>
                        <View style={styles.spaceBetween}>
                            <Text style={styles.shortCode}>Pun897</Text>
                            <Text style={styles.amoumt}>
                                <Image source={UPARROW} style={styles.upArrow} />
                                &nbsp; ₹ 33,000
                            </Text>
                        </View>                        
                    </View>
                    <View style={styles.whiteCard}>  
                        <View style={styles.circle}>
                            <Text style={styles.alphanumeric}>B</Text>
                        </View>      
                        <Text style={styles.name}>Bharti Kapoor</Text>
                        <View style={styles.spaceBetween}>
                            <Text style={styles.shortCode}>Pun897</Text>
                            <Text style={styles.amoumt}>
                                <Image source={DOWNARROW} style={styles.upArrow} />
                                &nbsp; ₹ 64,000
                            </Text>
                        </View>                        
                    </View>
                    <View style={styles.whiteCard}>  
                        <View style={[styles.circle, styles.blue]}>
                            <Text style={styles.alphanumeric}>P</Text>
                        </View>      
                        <Text style={styles.name}>Puneesh Kapoor</Text>
                        <View style={styles.spaceBetween}>
                            <Text style={styles.shortCode}>Pun897</Text>
                            <Text style={styles.amoumt}>
                                <Image source={UPARROW} style={styles.upArrow} />
                                &nbsp; ₹ 33,000
                            </Text>
                        </View>                        
                    </View>
                    <View style={styles.whiteCard}>  
                        <View style={[styles.circle, styles.brown]}>
                            <Text style={styles.alphanumeric}>B</Text>
                        </View>      
                        <Text style={styles.name}>Bharti Kapoor</Text>
                        <View style={styles.spaceBetween}>
                            <Text style={styles.shortCode}>Pun897</Text>
                            <Text style={styles.amoumt}>
                                <Image source={DOWNARROW} style={styles.upArrow} />
                                &nbsp; ₹ 64,000
                            </Text>
                        </View>                        
                    </View>
                    <View style={styles.whiteCard}>  
                        <View style={[styles.circle, styles.purple]}>
                            <Text style={styles.alphanumeric}>P</Text>
                        </View>      
                        <Text style={styles.name}>Puneesh Kapoor</Text>
                        <View style={styles.spaceBetween}>
                            <Text style={styles.shortCode}>Pun897</Text>
                            <Text style={styles.amoumt}>
                                <Image source={UPARROW} style={styles.upArrow} />
                                &nbsp; ₹ 33,000
                            </Text>
                        </View>                        
                    </View>
                    <View style={styles.whiteCard}>  
                        <View style={styles.circle}>
                            <Text style={styles.alphanumeric}>B</Text>
                        </View>      
                        <Text style={styles.name}>Bharti Kapoor</Text>
                        <View style={styles.spaceBetween}>
                            <Text style={styles.shortCode}>Pun897</Text>
                            <Text style={styles.amoumt}>
                                <Image source={DOWNARROW} style={styles.upArrow} />
                                &nbsp; ₹ 64,000
                            </Text>
                        </View>                        
                    </View>
                    <View style={styles.whiteCard}>  
                        <View style={[styles.circle, styles.blue]}>
                            <Text style={styles.alphanumeric}>P</Text>
                        </View>      
                        <Text style={styles.name}>Puneesh Kapoor</Text>
                        <View style={styles.spaceBetween}>
                            <Text style={styles.shortCode}>Pun897</Text>
                            <Text style={styles.amoumt}>
                                <Image source={UPARROW} style={styles.upArrow} />
                                &nbsp; ₹ 33,000
                            </Text>
                        </View>                        
                    </View>
                    <View style={styles.whiteCard}>  
                        <View style={[styles.circle, styles.brown]}>
                            <Text style={styles.alphanumeric}>B</Text>
                        </View>      
                        <Text style={styles.name}>Bharti Kapoor</Text>
                        <View style={styles.spaceBetween}>
                            <Text style={styles.shortCode}>Pun897</Text>
                            <Text style={styles.amoumt}>
                                <Image source={DOWNARROW} style={styles.upArrow} />
                                &nbsp; ₹ 64,000
                            </Text>
                        </View>                        
                    </View>
                    <Modal
                        isVisible={isVisible}
                        onBackdropPress={() => setIsVisible(false)}
                        style={styles.bottomModal}
                    >
                        <View style={styles.modalContent}>
                            <Text style={styles.h1}>Puneesh Kapoor</Text>
                            <View style={styles.rowColumn}>
                                <View>
                                    <Text style={styles.label}>Short Code</Text>
                                    <Text style={styles.valueText}>
                                        Pun897
                                    </Text>
                                </View>
                                <View>
                                    <Text style={[styles.label, styles.textRight]}>Amount</Text>
                                    <Text style={[styles.valueText, styles.textRight]}>
                                        <Image source={DOWNARROW} style={styles.upArrow} />
                                        &nbsp; ₹ 64,000
                                    </Text>
                                </View>
                            </View>
                            <View style={[styles.rowColumn, {marginTop: 24}]}>
                                <View style={{ width: '48%' }}>
                                    <Pressable
                                        style={styles.editButton}
                                    >
                                        <View>
                                            <Text style={styles.buttonText}>Edit</Text>
                                        </View>
                                    </Pressable>
                                </View>
                                <View style={{ width: '48%' }}>
                                    <Pressable
                                        style={styles.deleteButton}
                                    >
                                        <View>
                                            <Text style={styles.buttonText}>Delete</Text>
                                        </View>
                                    </Pressable>
                                </View>
                            </View>
                            {/* <Button title="Close" onPress={() => setIsVisible(false)} /> */}
                        </View>
                    </Modal>
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
        paddingLeft: 64,
        paddingRight: 16,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f1f1'
    },
    circle: {
        backgroundColor: 'green',
        width: 40,
        height: 40,
        borderRadius: 30,
        position: 'absolute',
        top: 16,
        left: 16,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex'
    },
    blue: {
        backgroundColor: '#0249fe',
    },
    purple: {
        backgroundColor: '#d80d9c',
    },
    brown: {
        backgroundColor: '#b0361a',
    },
    alphanumeric: {
        color: COLORS.white,
    },
    name: {
        color: COLORS.black,
        fontSize: 15,
        fontWeight: 600
    },
    shortCode: {
        color: COLORS.lightGrey,
        fontSize: 13,
        fontWeight: 400,
        paddingTop: 4
    },
    spaceBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        display: 'flex'
    },
    amoumt: {
        color: COLORS.black,
        fontSize: 13,
        fontWeight: 400,
        paddingTop: 4
    },
    upArrow: {
        width: 8,
        height: 8
    },    
    add: {
        backgroundColor: COLORS.primary,
        width: 48,
        height: 48,
        borderRadius: 40,
        position: 'absolute',
        right: 16,
        bottom: 48,
        zIndex: 4,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    plusIcon: {
        width: 'auto',
        fontSize: 32,
        color: COLORS.white,
        fontWeight: "400"
    },
    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContent: {
        backgroundColor: COLORS.white,
        padding: 20,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    h1: {
        color: COLORS.black,
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 32
    },
    rowColumn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        display: 'flex'
    },
    label: {
        color: COLORS.lightGrey,
        fontSize: 12,
        fontWeight: '600',
        textAlign: 'center'
    },
    textRight: {
        textAlign: 'right'
    },
    valueText: {
        color: COLORS.black,
        fontSize: 16,
        fontWeight: 400,
        paddingTop: 4
    },
    editButton: {
        backgroundColor: COLORS.primary,
        width: '100%',
        height: 48,
        color: COLORS.white,        
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex'
    },
    buttonText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: '500'
    },
    deleteButton: {
        backgroundColor: COLORS.red,
        width: '100%',
        height: 48,
        color: COLORS.white,        
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex'
    }
})