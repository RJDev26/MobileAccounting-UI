import {useState} from 'react'
import COLORS from '../../constants/color'
import { Pressable, StyleSheet, Text, TextInput, View, ScrollView, Image, Alert } from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import { BACK } from '../utils/imagePath'
import { LinearGradient } from 'expo-linear-gradient'
import axiosInstance from '../config/axios'
import { accountGroupApiUrls } from '../services/api'

export default function AddAccountGroup({ navigation }: any) {
    const [isLoading, setIsLoading] = useState(false)
    const [groupCode, setGroupCode] = useState('')
    const [groupName, setGroupName] = useState('')

    const addAccountGroupHandler = async () => {
        if (!groupCode || !groupName) {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }

        try {
            setIsLoading(true);
            const res = await axiosInstance.post(accountGroupApiUrls.CREATE, {
                groupCode,
                groupName
            });
            console.log(res.data);
            
            if (res.data.isSuccess) {
                navigation.goBack(); 
            } else {
                Alert.alert(
                    'Duplicate Field',
                     res.data.message,
                    [{ text: 'OK', style: 'default' }],
                    { cancelable: true, userInterfaceStyle: 'light' });
            }
        } catch (error) {
            console.log("Error in add account Group", error);
            Alert.alert('Error', 'Failed to add account Group');
        } finally {
            setIsLoading(false);
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
                    <Text style={styles.heading}>Add Account Group</Text>
                </LinearGradient>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.whiteCard}>
                        <View style={styles.gap}>
                            <Text style={styles.label}>Group Code</Text>
                            <View>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter Group Code"
                                    value={groupCode}
                                    onChangeText={setGroupCode}
                                />
                            </View>
                        </View>
                        <View style={styles.gap}>
                            <Text style={styles.label}>Group Name</Text>
                            <View>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter Name"
                                    value={groupName}
                                    onChangeText={setGroupName}
                                />
                            </View>
                        </View>
                        <LinearGradient
                            colors={['#ec7d20', '#be2b2c']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0, y: 1 }}
                            style={{ borderRadius: 50 }}
                        >
                            <Pressable
                                style={styles.addButton}
                                onPress={addAccountGroupHandler}
                                disabled={isLoading}
                            >
                                <View>
                                    <Text style={styles.buttonText}>
                                        Submit
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