import * as React from 'react'
import COLORS from '../../constants/color'
import { Pressable, StyleSheet, Text, TextInput, View, ScrollView, Image } from 'react-native'
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context'
import { BACK } from '../../utils/imagePath'
import { LinearGradient } from 'expo-linear-gradient'
import { RadioButton } from 'react-native-paper'

export default function AddVoucher({ navigation }: any) {
    const [value, setValue] = React.useState('Credit');
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
                        <Text style={styles.heading}>Add Voucher</Text>
                    </LinearGradient>
                    <ScrollView style={styles.scrollView}>
                        <View style={styles.whiteCard}>
                            <View style={styles.gap}>
                                <Text style={styles.label}>Account Code</Text>
                                <View>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Enter Account Code"
                                    />
                                </View>
                            </View>
                            <View style={styles.gap}>
                                <Text style={styles.label}>Amount</Text>
                                <View>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Enter Amount"
                                    />
                                </View>
                            </View>
                            <View style={styles.gap}>
                                <Text style={styles.label}>Narration</Text>
                                <View>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Enter Narration"
                                    />
                                </View>
                            </View>
                            <View style={styles.gap}>
                                <RadioButton.Group onValueChange={setValue} value={value}>
                                    <View style={styles.radioGroup}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <RadioButton value="Credit" color="#ec7d20" />
                                            <Text>Credit</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <RadioButton value="Debit" color="#ec7d20" />
                                            <Text>Debit</Text>
                                        </View>
                                    </View>
                                </RadioButton.Group>
                            </View>
                            <LinearGradient
                                colors={['#ec7d20', '#be2b2c']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 0, y: 1 }}
                                style={{ borderRadius: 50 }}
                            >
                                <Pressable
                                    style={styles.addButton}
                                >
                                    <View>
                                        <Text style={styles.buttonText}>Submit</Text>
                                    </View>
                                </Pressable>
                            </LinearGradient>                            
                        </View>
                    </ScrollView>
                </SafeAreaView>}
            </SafeAreaProvider>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.darkBlue,
        paddingTop: 0
    },
    back: {
        width: 30,
        height: 30,
        position: 'absolute',
        top: 20,
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
    scrollView: {
        backgroundColor: COLORS.lightBlue,
        height: '100%',    
        paddingTop: 16,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 24,
    },
    whiteCard: {
        backgroundColor: COLORS.white,
        width: '100%',    
        paddingTop: 16,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 24,
        borderRadius: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    gap: {
        marginBottom: 16,
    },
    label: {
        color: COLORS.black,
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 18,
        marginBottom: 8,
        padding: 0,
    },
    input: {
        height: 48,
        borderWidth: 1,
        borderColor: '#DFDFDF',
        borderRadius: 4,
        paddingLeft: 12,
        paddingRight: 12,
    },
    radioGroup: {
        gap: 16,
        flexDirection: 'row',
        display: 'flex'
    },
    addButton: {
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
    }
})