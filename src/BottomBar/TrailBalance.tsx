import React, { useCallback, useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { BACK, UPARROW, DOWNARROW } from '../utils/imagePath'
import Feather from '@react-native-vector-icons/feather'
import COLORS from '../../constants/color'
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  ScrollView,
  Alert,
  TouchableOpacity
} from 'react-native'
import axiosInstance from '../config/axios'
import Modal from 'react-native-modal'
import { useFocusEffect } from '@react-navigation/native';
import { AccountAPIUrls, trialBalanceApiUrls } from '../services/api'
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Loader from '../component/Loader'

interface TrailBalanceEntry {
  dr_ShortCode: string,
  dr_Name: string,
  debit: number,
  cr_ShortCode: string,
  cr_Name: string,
  credit: number
}

interface TrailBalanceSummary {
  totalDebit: number,
  totalCredit: number,
  difference: number
}

interface Group {
  groupId: number;
  groupName: string;
}

export default function TrailBalance({ navigation }: any) {
  const [fromDate, setFromDate] = useState<Date | undefined>(undefined)
  const [toDate, setToDate] = useState<Date | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false)
  const [trailBalance, setTrailBalance] = useState<TrailBalanceEntry[]>([])
  const [trailBalanceSummary, setTrailBalanceSummary] = useState<TrailBalanceSummary>()
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [isFromDatePickerVisible, setIsFromDatePickerVisible] = useState(false)
  const [isToDatePickerVisible, setIsToDatePickerVisible] = useState(false)
  const [includeOpBal, setIncludeOpBal] = useState(true);
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [showGroupDropdown, setShowGroupDropdown] = useState(false);

  const getLastWeekDateRange = () => {
    const today = new Date();
    const lastWeek = new Date(today);
    lastWeek.setDate(today.getDate() - 7);
    return { start: lastWeek, end: today };
  }

  const showFromDatePicker = () => setIsFromDatePickerVisible(true)
  const hideFromDatePicker = () => setIsFromDatePickerVisible(false)

  const showToDatePicker = () => setIsToDatePickerVisible(true)
  const hideToDatePicker = () => setIsToDatePickerVisible(false)

  const handleFromDateConfirm = (selectedDate: Date) => {
    setFromDate(selectedDate)
    hideFromDatePicker()
  }

  const handleToDateConfirm = (selectedDate: Date) => {
    setToDate(selectedDate)
    hideToDatePicker()
  }

  const fetchGroupList = async () => {
    try {
      const res = await axiosInstance.get(AccountAPIUrls.GET_ALL_GROUP);
      if (res.data.isSuccess) {
        setGroups(res.data.data);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load groups');
    }
  };


  useEffect(() => {
    const { start, end } = getLastWeekDateRange();
    setFromDate(start);
    setToDate(end);
    fetchGroupList()
  }, [])

  const formatDateForAPI = (date: Date | undefined) => {
    if (!date) return '';
    return date.toISOString();
  }

  const filterFormatDate = (date: Date | undefined) => {
    if (!date) return '';
    return date.toLocaleDateString('en-GB');
  }

  const fetchTrailBalance = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.post(trialBalanceApiUrls.GET_ALL, {
        fromDate: formatDateForAPI(fromDate),
        toDate: formatDateForAPI(toDate),
        includeOpBal: includeOpBal,
        groupId: selectedGroup ? selectedGroup.groupId : 0,
      })

      setTrailBalance(response.data.rows)
      setTrailBalanceSummary(response.data.summary)

    } catch (error) {
      Alert.alert('Error', 'Failed to load Trail Balance')
    } finally {
      setIsLoading(false);
    }
  }

  const handleFilterReset = () => {
    const { start, end } = getLastWeekDateRange()
    setFromDate(start)
    setToDate(end)
    setShowFilterModal(false)
    setIncludeOpBal(true);
    setSelectedGroup(null)
  }

  const handleFilterApply = () => {
    fetchTrailBalance()
    setShowFilterModal(false)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(Math.abs(amount));
  }

  const filteredTrailBalance = trailBalance.filter(entry => {
    const matchesSearch = searchQuery === '' ||
      (entry.dr_Name && entry.dr_Name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (entry.cr_Name && entry.cr_Name.toLowerCase().includes(searchQuery.toLowerCase()))

    return matchesSearch
  })

  useFocusEffect(
    useCallback(() => {
      if (fromDate && toDate) {
        fetchTrailBalance()
      }
    }, [fromDate, toDate, includeOpBal, selectedGroup])
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
          <Pressable onPress={() => navigation.goBack()} style={styles.back}>
            <Image source={BACK} style={styles.backIcon} />
          </Pressable>
          <Text style={styles.heading}>Trail Balance</Text>
        </LinearGradient>
      </SafeAreaView>

      <View style={styles.topbar}>
        <View style={styles.searchbar}>
          <TextInput
            style={styles.input}
            placeholder="Search"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <Feather name="search" color="#ec7e1d" size={24} style={styles.searchIcon} />
        </View>
        <Pressable onPress={() => setShowFilterModal(true)}>
          <Feather name="filter" color="#ec7e1d" size={20} />
        </Pressable>
      </View>

      {isLoading ? <Loader/> : <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: 110 }}> 
        <View style={styles.whiteCard}>
          <View style={styles.rowColumn}>
            <Text style={styles.lightText}>Total Credit</Text>
            <Text style={[styles.lightText, { textAlign: 'right' }]}>Total Debit</Text>
          </View>
          <View style={[styles.rowColumn, { marginBottom: 0 }]}>
            <Text style={styles.valueText}>
              <>
                <Image
                  source={DOWNARROW}
                  style={styles.upArrow}
                /> &nbsp;
                {trailBalanceSummary?.totalDebit !== undefined && (
                  formatCurrency(trailBalanceSummary.totalCredit)
                )}
              </>              
            </Text>
            <Text style={[styles.valueText, { textAlign: 'right' }]}>
              <>
                <Image
                  source={UPARROW}
                  style={styles.upArrow}
                /> &nbsp; 
                {trailBalanceSummary?.totalDebit !== undefined && (
                  formatCurrency(trailBalanceSummary.totalDebit)
                )}
              </>              
            </Text>
          </View>
        </View>
        {filteredTrailBalance.length > 0 ? (
          filteredTrailBalance.map((entry, index) => (
            <View style={styles.whiteCard} key={index}>
              <View style={styles.rowColumn}>
                <Text style={styles.nameText}>{entry.cr_Name}</Text>
                <Text style={[styles.nameText, { textAlign: 'right' }]}>{entry.dr_Name}</Text>
              </View>
              <View style={[styles.rowColumn, { marginBottom: 0 }]}>
                <Text style={styles.valueText}>
                  {entry.credit ?
                    <>
                      <Image
                        source={DOWNARROW}
                        style={styles.upArrow}
                      /> &nbsp; {formatCurrency(entry.credit)}
                    </> : '-'}
                </Text>                  
                <Text style={[styles.valueText, { textAlign: 'right' }]}>
                  {entry.debit ?
                    <>
                      <Image
                        source={UPARROW}
                        style={styles.upArrow}
                      /> &nbsp; {formatCurrency(entry.debit)}
                    </> : '-'}
                </Text>
              </View>
            </View>
          ))
        ) :
          <View style={styles.whiteCard}>
            <Text>No ledger entries found for the selected criteria</Text>
          </View>
        }
      </ScrollView>}

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
            <Text style={styles.label}>Group</Text>
            <Pressable
              style={styles.input}
              onPress={() => setShowGroupDropdown(!showGroupDropdown)}
            >
              <Text>{selectedGroup ? selectedGroup.groupName : 'Select Group'}</Text>
            </Pressable>

            {showGroupDropdown && (
              <View style={styles.dropdown}>
                <ScrollView style={styles.dropdownScroll}>
                  {groups.map(group => (
                    <Pressable
                      key={group.groupId}
                      style={styles.dropdownItem}
                      onPress={() => {
                        setSelectedGroup(group);
                        setShowGroupDropdown(false);
                      }}
                    >
                      <Text>{group.groupName}</Text>
                    </Pressable>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>

          <View style={styles.gap}>
            <View style={styles.checkboxContainer}>
              <Pressable
                style={[styles.checkbox, includeOpBal && styles.checkboxChecked]}
                onPress={() => setIncludeOpBal(!includeOpBal)}
              >
                {includeOpBal && <Feather name="check" size={16} color="white" />}
              </Pressable>
              <Text style={styles.checkboxLabel}>Include Opening Balance</Text>
            </View>
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
        </View>
      </Modal>
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
  scrollView: {
    backgroundColor: COLORS.grey,
    paddingTop: 8,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 24,
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
  valueText: {
    color: COLORS.black,
    fontSize: 13,
    fontWeight: '500',
    flex: 1,
  },
  upArrow: {
    width: 8,
    height: 8,
    marginRight: 4,
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
    borderTopRightRadius: 15,
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checkboxChecked: {
    backgroundColor: COLORS.primary,
  },
  checkboxLabel: {
    color: COLORS.black,
    fontSize: 14,
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
  lightText: {
    color: COLORS.lightGrey,
    fontSize: 11,
    fontWeight: 500,
    flex: 1
  },
  nameText: {
    fontSize: 11,
    fontWeight: 500,
    flex: 1
  }
})