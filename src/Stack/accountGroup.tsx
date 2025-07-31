import React, { useCallback, useState, useEffect } from 'react';
import COLORS from '../../constants/color'
import { Pressable, StyleSheet, Text, TextInput, View, Image, ActivityIndicator, ScrollView, Alert } from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import { BACK } from '../utils/imagePath'
import { LinearGradient } from 'expo-linear-gradient'
import Feather from '@react-native-vector-icons/feather'
import axiosInstance from '../config/axios'
import { accountGroupApiUrls } from '../services/api'
import { useFocusEffect } from '@react-navigation/native';
import Loader from '../component/Loader';

interface AccountGroup {
    groupId: number;
    groupCode: string;
    groupName: string;
}

export default function AccountGroup({ navigation }: any) {
    const [loading, setLoading] = useState(false)
    const [accountGroup, setAccountGroup] = useState<AccountGroup[]>([])
    const [searchQuery, setSearchQuery] = useState('')

    const fetchAccountsGroup = async () => {
        setLoading(true)
        try {
            const res = await axiosInstance.get(accountGroupApiUrls.GET_ALL);
            if (res.data.isSuccess) {
                setAccountGroup(res.data.data);
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to load accounts');
        }finally {
            setLoading(false)
        }
    }

    const filteredTrailBalance = accountGroup.filter(accountGroupList => {
        const matchesSearch = searchQuery === '' ||
        (accountGroupList.groupCode && accountGroupList.groupCode.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (accountGroupList.groupName && accountGroupList.groupName.toLowerCase().includes(searchQuery.toLowerCase()))

        return matchesSearch
    })

    useFocusEffect (
        useCallback(() => {
            fetchAccountsGroup()
        }, [])
    )

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
                    <Text style={styles.heading}>Account Group</Text>
                    <Pressable
                        style={styles.add}
                        onPress={() => navigation.navigate("AddAccountGroup")}
                    >
                        <Feather name="plus" color="#fff" size={26} />
                    </Pressable>
                </LinearGradient>
                <View style={styles.searchbar}>
                    <TextInput
                        style={styles.input}
                        placeholder="Search"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    <Feather name="search" color="#ec7e1d" size={24} style={styles.searchIcon} />
                </View>
                {loading ? (
                   <Loader/>
                ) : (
                    <ScrollView style={styles.scrollView}>
                        {filteredTrailBalance.length > 0 ? ( 
                            filteredTrailBalance.map((accountGroupList, index) => (
                                <View style={styles.whiteCard} key={index}>
                                    <View style={styles.rowColumn}>
                                        <Text style={styles.lightText}>Group Code</Text>
                                        <Text style={styles.lightText}>Group Name</Text>
                                    </View>
                                    <View style={[styles.rowColumn, {marginBottom: 0}]}>
                                        <Text style={styles.valueText}>{accountGroupList.groupCode}</Text>
                                        <Text style={styles.valueText}>{accountGroupList.groupName}</Text>
                                    </View>
                                </View>
                            ))
                        ) : 
                            <View style={styles.whiteCard}>
                                <Text>No ledger entries found for the selected criteria</Text>
                            </View>
                        }
                    </ScrollView>
                )}
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
    add: {
        position: 'absolute',
        right: 12,
        top: 22,
        zIndex: 4
    },
    searchbar: {
        backgroundColor: '#ececec',
        paddingTop: 10,
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
        right: 36,
        zIndex: 3
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        marginTop: 50
    },
    scrollView: {
        backgroundColor: COLORS.grey,
        paddingTop: 16,
        paddingLeft: 16,
        paddingRight: 16
    },
    whiteCard: {
        backgroundColor: COLORS.white,
        width: '100%',
        padding: 16,
        marginBottom: 12,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    rowColumn: {
        marginBottom: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    lightText: {
        color: COLORS.lightGrey,
        fontSize: 11,
        fontWeight: 500,
        flex: 1
    },
    valueText: {
        color: COLORS.black,
        fontSize: 13,
        fontWeight: '500',
        flex: 1,
    }
})