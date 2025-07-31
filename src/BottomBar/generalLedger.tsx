import React, { useCallback, useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../../constants/color';
import { BACK, UPARROW, DOWNARROW } from '../utils/imagePath';
import Modal from 'react-native-modal';
import { LinearGradient } from 'expo-linear-gradient';
import {
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    Alert,
    ActivityIndicator
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import axiosInstance from '../config/axios';
import Feather from '@react-native-vector-icons/feather';
import { AccountAPIUrls, ledgerApiUrls } from '../services/api';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Loader from '../component/Loader';

interface LedgerEntry {
    entryDate: string;
    voU_TYPE: string;
    dR_CR: string;
    accid: number;
    accountName: string;
    accountCode: string;
    narration: string;
    debit: number;
    credit: number;
    balance: number;
}

interface Account {
    accountId: number;
    name: string;
}

export default function VoucherLedger({ navigation }: any) {
    const [fromDate, setFromDate] = useState<Date | undefined>(undefined);
    const [toDate, setToDate] = useState<Date | undefined>(undefined);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [isFromDatePickerVisible, setIsFromDatePickerVisible] = useState(false);
    const [isToDatePickerVisible, setIsToDatePickerVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [ledgerEntries, setLedgerEntries] = useState<LedgerEntry[]>([]);
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
    const [showAccountDropdown, setShowAccountDropdown] = useState(false);


    const getLastWeekDateRange = () => {
        const today = new Date();
        const lastWeek = new Date(today);
        lastWeek.setDate(today.getDate() - 7);
        return { start: lastWeek, end: today };
    };


    const fetchAccounts = async () => {
        try {
            const res = await axiosInstance.get(AccountAPIUrls.GET_ALL);
            if (res.data.success) {
                setAccounts(res.data.data);
            }
        } catch (error) {
            console.error('Error fetching accounts:', error);
            Alert.alert('Error', 'Failed to load accounts');
        }
    };


    useEffect(() => {
        const { start, end } = getLastWeekDateRange();
        setFromDate(start);
        setToDate(end);
        fetchAccounts()
    }, []);

    const showFromDatePicker = () => setIsFromDatePickerVisible(true);
    const hideFromDatePicker = () => setIsFromDatePickerVisible(false);

    const showToDatePicker = () => setIsToDatePickerVisible(true);
    const hideToDatePicker = () => setIsToDatePickerVisible(false);

    const handleFromDateConfirm = (selectedDate: Date) => {
        setFromDate(selectedDate);
        hideFromDatePicker();
    };

    const handleToDateConfirm = (selectedDate: Date) => {
        setToDate(selectedDate);
        hideToDatePicker();
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB');
    };

    const formatDateForAPI = (date: Date | undefined) => {
        if (!date) return '';
        return date.toISOString();
    };

    const filterFormatDate = (date: Date | undefined) => {
        if (!date) return '';
        return date.toLocaleDateString('en-GB');
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 2
        }).format(amount);
    };

    const fetchLedger = async () => {
        try {
            setIsLoading(true);
            const response = await axiosInstance.post(ledgerApiUrls.GET_ALL, {
                fromDate: formatDateForAPI(fromDate),
                toDate: formatDateForAPI(toDate),
                accountId: selectedAccount ? selectedAccount.accountId : 0,
            })

            if (response.data.isSuccess) {
                setLedgerEntries(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching ledger:', error);
            Alert.alert('Error', 'Failed to load ledger entries');
        } finally {
            setIsLoading(false);
        }
    };

    const handleFilterApply = () => {
        fetchLedger();
        setShowFilterModal(false);
    };

    const handleFilterReset = () => {
        const { start, end } = getLastWeekDateRange();
        setFromDate(start);
        setToDate(end);
        setShowFilterModal(false);
        setSelectedAccount(null)

    };

    useFocusEffect(
        useCallback(() => {
            if (fromDate && toDate) {
                fetchLedger();
            }
        }, [fromDate, toDate, selectedAccount])
    );

    const filteredLedgerEntries = ledgerEntries.filter(entry => {
        const matchesSearch = searchQuery === '' ||
            entry.accountName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            entry.narration.toLowerCase().includes(searchQuery.toLowerCase()) ||
            entry.accountCode.toLowerCase().includes(searchQuery.toLowerCase());
        const entryDate = new Date(entry.entryDate);
        const matchesDate = (!fromDate || entryDate >= fromDate) &&
            (!toDate || entryDate);
        return matchesSearch && matchesDate;
    });

    // if (isLoading) {
    //     return (
    //         <SafeAreaView style={styles.loadingContainer}>
    //             <ActivityIndicator size="large" color={COLORS.primary} />
    //         </SafeAreaView>
    //     );
    // }

    return (
        <>
            <SafeAreaView style={styles.container} edges={['top']}>
                <LinearGradient
                    colors={['#ec7d20', '#be2b2c']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={{ paddingTop: 20, paddingBottom: 20 }}
                >
                    <Pressable onPress={() => navigation.goBack()} style={styles.back}>
                        <Image source={BACK} style={styles.backIcon} />
                    </Pressable>
                    <Text style={styles.heading}>Ledger</Text>
                </LinearGradient>
            </SafeAreaView>

            <View style={styles.topbar}>
                <View style={styles.searchbar}>
                    <TextInput
                        style={styles.input}
                        placeholder="Search by account or narration"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    <Feather name="search" color="#ec7e1d" size={24} style={styles.searchIcon} />
                </View>
                <Pressable onPress={() => setShowFilterModal(true)}>
                    <Feather name="filter" color="#ec7e1d" size={20} />
                </Pressable>
            </View>

            <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: 110 }}>
             
                {isLoading ? <Loader/> :  filteredLedgerEntries.length > 0 ? (
                    filteredLedgerEntries.map((entry, index) => (
                        <Pressable key={`${entry.accid}-${index}`}>
                            <View style={styles.whiteCard}>
                                <View style={styles.rowColumn}>
                                    <Text style={styles.valueText}>{formatDate(entry.entryDate)}</Text>
                                    <Text style={[
                                        styles.amountText,
                                        entry.dR_CR === 'Dr' ? styles.debitAmount : styles.creditAmount
                                    ]}>
                                        {entry.dR_CR === 'Dr'
                                            ?
                                            <Text>
                                                <Image
                                                    source={UPARROW}
                                                    style={styles.upArrow}
                                                /> &nbsp;
                                                {formatCurrency(entry.debit)}
                                            </Text>
                                            :
                                            <Text>
                                                <Image
                                                    source={DOWNARROW}
                                                    style={styles.upArrow}
                                                /> &nbsp;
                                                {formatCurrency(entry.credit)}
                                            </Text>
                                        }
                                    </Text>
                                    <Text style={styles.dateText}>{formatCurrency(entry.balance)}</Text>
                                </View>
                                <View style={styles.rowColumn}>
                                    <Text style={styles.dateText}>{(entry.narration)}</Text>
                                </View>
                            </View>
                        </Pressable>
                    ))
                ) : (
                    <View style={styles.whiteCard}>
                        <Text style={styles.narrationText}>No ledger entries found for the selected criteria</Text>
                    </View>
                )}
            </ScrollView>

            {/* Filter Modal */}
            <Modal
                isVisible={showFilterModal}
                onBackdropPress={() => setShowFilterModal(false)}
                style={styles.bottomModal}
            >
                <View style={styles.modalContent}>
                    <View style={styles.gap}>
                        <Text style={styles.label}>From Date</Text>
                        <TouchableOpacity onPress={showFromDatePicker} activeOpacity={0.8}>
                            <TextInput
                                style={styles.input}
                                placeholder="DD/MM/YYYY"
                                value={filterFormatDate(fromDate)}
                                editable={false}
                                pointerEvents="none"
                            />
                        </TouchableOpacity>
                        <DateTimePickerModal
                            isVisible={isFromDatePickerVisible}
                            mode="date"
                            onConfirm={handleFromDateConfirm}
                            onCancel={hideFromDatePicker}
                            maximumDate={toDate || new Date()}
                        />
                    </View>
                    <View style={styles.gap}>
                        <Text style={styles.label}>To Date</Text>
                        <TouchableOpacity onPress={showToDatePicker} activeOpacity={0.8}>
                            <TextInput
                                style={styles.input}
                                placeholder="DD/MM/YYYY"
                                value={filterFormatDate(toDate)}
                                editable={false}
                                pointerEvents="none"
                            />
                        </TouchableOpacity>
                        <DateTimePickerModal
                            isVisible={isToDatePickerVisible}
                            mode="date"
                            onConfirm={handleToDateConfirm}
                            onCancel={hideToDatePicker}
                            minimumDate={fromDate}
                            maximumDate={new Date()}
                        />
                    </View>

                    <View style={styles.gap}>
                        <Text style={styles.label}>Account</Text>
                        <Pressable
                            style={styles.input}
                            onPress={() => setShowAccountDropdown(!showAccountDropdown)}
                        >
                            <Text>{selectedAccount ? selectedAccount.name : 'Select Account'}</Text>
                        </Pressable>

                        {showAccountDropdown && (
                            <View style={styles.dropdown}>
                                <ScrollView style={styles.dropdownScroll}>
                                    {accounts.map(account => (
                                        <Pressable
                                            key={account.accountId}
                                            style={styles.dropdownItem}
                                            onPress={() => {
                                                setSelectedAccount(account);
                                                setShowAccountDropdown(false);
                                            }}
                                        >
                                            <Text>{account.name}</Text>
                                        </Pressable>
                                    ))}
                                </ScrollView>
                            </View>
                        )}
                    </View>

                    <View style={styles.buttonGroup}>
                        <Pressable
                            style={[styles.filterButton, styles.resetButton]}
                            onPress={handleFilterReset}
                        >
                            <Text style={[styles.buttonText, { color: COLORS.primary }]}>Reset</Text>
                        </Pressable>

                        <LinearGradient
                            colors={['#ec7d20', '#be2b2c']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0, y: 1 }}
                            style={[styles.filterButton, { flex: 1 }]}
                        >
                            <Pressable
                                style={styles.addButton}
                                onPress={handleFilterApply}
                            >
                                <Text style={styles.buttonText}>Apply Filter</Text>
                            </Pressable>
                        </LinearGradient>
                    </View>

                    <Feather
                        name="x"
                        color="#000"
                        size={24}
                        style={styles.close}
                        onPress={() => setShowFilterModal(false)}
                    />
                </View>
            </Modal>
        </>
    );
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
        paddingTop: 8,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 24,
    },
    rowColumn: {
        marginBottom: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    topbar: {
        backgroundColor: '#ececec',
        paddingTop: 10,
        paddingLeft: 16,
        paddingRight: 16,
        gap: 16,
        alignItems: 'center',
        flexDirection: 'row',
    },
    searchbar: {
        flex: 1
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
        right: 20,
        zIndex: 3
    },
    headerRow: {
        backgroundColor: COLORS.lightBlue,
        padding: 12,
        marginHorizontal: 16,
        marginTop: 8,
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    headerText: {
        color: COLORS.white,
        fontWeight: '600',
        fontSize: 14,
        flex: 1
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
    valueText: {
        color: COLORS.black,
        fontSize: 13,
        fontWeight: '500',
        flex: 1,
    },
    row: {
        marginBottom: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dateText: {
        color: COLORS.black,
        fontSize: 13,
        fontWeight: '500',
    },
    voucherTypeText: {
        color: COLORS.primary,
        fontSize: 13,
        fontWeight: '500',
        fontStyle: 'italic'
    },
    accountText: {
        color: COLORS.black,
        fontSize: 14,
        fontWeight: '500',
        flex: 2
    },
    amountText: {
        fontSize: 14,
        fontWeight: '600',
        flex: 1,
        textAlign: 'right'
    },
    debitAmount: {
        color: COLORS.error,
        textAlign: 'center'
    },
    creditAmount: {
        color: COLORS.success,
        textAlign: 'center'
    },
    upArrow: {
        width: 8,
        height: 8,
        marginRight: 4,
    },
    narrationText: {
        color: COLORS.black,
        fontSize: 12,
        fontStyle: 'italic',
        width: '100%'
    },
    balanceText: {
        fontSize: 13,
        fontWeight: '600',
        width: '100%',
        textAlign: 'right'
    },
    debitBalance: {
        color: COLORS.error
    },
    creditBalance: {
        color: COLORS.success
    },
    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0
    },
    modalContent: {
        backgroundColor: COLORS.white,
        padding: 20,
        paddingTop: 40,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
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
    close: {
        position: 'absolute',
        zIndex: 3,
        top: 16,
        right: 16
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white
    },
    buttonGroup: {
        flexDirection: 'row',
        gap: 16,
        marginTop: 8
    },
    filterButton: {
        height: 48,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    resetButton: {
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.primary,
        flex: 0.5
    },
    addButton: {
        width: '100%',
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: '500',
    },
    dropdown: {
        maxHeight: 200,
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: '#DFDFDF',
        borderRadius: 8,
        marginTop: 8,
        zIndex: 10,
    },
    dropdownScroll: {
        maxHeight: 200,
    },
    dropdownItem: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#DFDFDF',
    },


});