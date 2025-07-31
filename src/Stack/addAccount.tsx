import { useState } from 'react'
import COLORS from '../../constants/color'
import { Pressable, StyleSheet, Text, TextInput, View, ScrollView, Image, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BACK } from '../utils/imagePath'
import { LinearGradient } from 'expo-linear-gradient'
import { RadioButton } from 'react-native-paper'
import axiosInstance from '../config/axios'
import { AccountAPIUrls } from '../services/api'

export default function AddAccount({ navigation }: any) {
    const [value, setValue] = useState('cr');
    const [shortCode, setShortCode] = useState('');
    const [name, setName] = useState('');
    const [openingBalance, setOpeningBalance] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const addAccountHandler = async () => {
        if (!shortCode || !name || !openingBalance) {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }


        const balance = parseFloat(openingBalance);
        if (isNaN(balance)) {
            Alert.alert('Error', 'Please enter a valid opening balance');
            return;
        }


        try {
            setIsLoading(true);
            const res = await axiosInstance.post(AccountAPIUrls.CREATE, {
                shortCode,
                name,
                drcr: value,
                openingBalance,
                createdBy: 1,
                createdAt: new Date().toISOString()
            });
            if (res.data.success) {
                navigation.goBack();
            } else {
                Alert.alert(
                    'Duplicate Short Code',
                    'The short code you entered already exists. Please use a different one.',
                    [{ text: 'OK', style: 'default' }],
                    { cancelable: true, userInterfaceStyle: 'light' });
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to add account');
        } finally {
            setIsLoading(false);
        }
    }

    const handleOpeningBalanceChange = (text: string) => {
        setOpeningBalance(text);
    }

    const handleOpeningBalanceBlur = () => {
        if (openingBalance && !openingBalance.includes('.')) {
            setOpeningBalance(`${openingBalance.replace(/[^0-9]/g, '')}.00`);
        }
    }

    return (
        <>
            <SafeAreaView style={styles.container} edges={['top']}>
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
                    <Text style={styles.heading}>Add Account</Text>
                </LinearGradient>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.whiteCard}>
                        <View style={styles.gap}>
                            <Text style={styles.label}>Short Code</Text>
                            <View>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter Short Code"
                                    value={shortCode}
                                    onChangeText={setShortCode}
                                />
                            </View>
                        </View>
                        <View style={styles.gap}>
                            <Text style={styles.label}>Name</Text>
                            <View>
                                <TextInput
                                    style={styles.input}
                                    placeholder="eg. John Doe"
                                    value={name}
                                    onChangeText={setName}
                                />
                            </View>
                        </View>
                        <View style={styles.gap}>
                            <Text style={styles.label}>Opening Balance</Text>
                            <View>
                                <TextInput
                                    style={styles.input}
                                    placeholder="eg. 25,000.00"
                                    value={openingBalance}
                                    onChangeText={handleOpeningBalanceChange}
                                    onBlur={handleOpeningBalanceBlur}
                                    keyboardType="numeric"
                                />
                            </View>
                        </View>
                        <View style={styles.gap}>
                            <RadioButton.Group onValueChange={setValue} value={value}>
                                <View style={styles.radioGroup}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <RadioButton value="cr" color="#ec7d20" />
                                        <Text>Credit</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <RadioButton value="dr" color="#ec7d20" />
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
                                onPress={addAccountHandler}
                                disabled={isLoading}
                            >
                                <View>
                                    <Text style={styles.buttonText}>
                                        {isLoading ? 'Processing...' : 'Submit'}
                                    </Text>
                                </View>
                            </Pressable>
                        </LinearGradient>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
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
        backgroundColor: COLORS.grey,
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