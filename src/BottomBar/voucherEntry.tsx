import React, { useCallback, useState } from 'react';
import COLORS from '../../constants/color';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  FlatList
} from 'react-native';
import Modal from 'react-native-modal';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BACK, UPARROW, DOWNARROW } from '../utils/imagePath';
import { LinearGradient } from 'expo-linear-gradient';
import Feather from '@react-native-vector-icons/feather';
import axiosInstance from '../config/axios';
import { useFocusEffect } from '@react-navigation/native';
import { voucherApiUrls } from '../services/api';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Loader from '../component/Loader';

interface Voucher {
  voucherId: number;
  date: string;
  vouType: string;
  drCr: string;
  amount: number;
  drAccount: string;
  crAccount: string;
  confirmed: boolean;
  createdAt: string;
  createdBy: string;
  narration: string;
}

export default function VoucherEntry({ navigation }: any) {
  const [fromDate, setFromDate] = useState<Date | undefined>(undefined);
  const [toDate, setToDate] = useState<Date | undefined>(undefined);
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [isFromDatePickerVisible, setIsFromDatePickerVisible] = useState(false);
  const [isToDatePickerVisible, setIsToDatePickerVisible] = useState(false);

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

  const fetchVouchers = async (filterParams = {}) => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.post(voucherApiUrls.GET_ALL, {
        voucherType: "",
        fromDate: fromDate ? fromDate.toISOString() : null,
        toDate: toDate ? toDate.toISOString() : null,
        createdBy: 0,
        ...filterParams
      });

      if (response.data.success) {
        setVouchers(response.data.data);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load vouchers');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterApply = () => {
    fetchVouchers({
      fromDate: fromDate ? fromDate.toISOString() : null,
      toDate: toDate ? toDate.toISOString() : null
    });
    setShowFilterModal(false);
  };

  const handleFilterReset = () => {
    setFromDate(undefined);
    setToDate(undefined);
    fetchVouchers({
      fromDate: null,
      toDate: null
    });
    setShowFilterModal(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
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

  const handleVoucherPress = (voucher: Voucher) => {
    setSelectedVoucher(voucher);
    setShowActionSheet(true);
  };

  const handleEdit = () => {
    if (selectedVoucher) {
      setShowActionSheet(false);
      navigation.navigate('EditVoucher', { voucherId: selectedVoucher.voucherId });
    }
  };

  const handleDelete = async () => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this voucher?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete', onPress: async () => {
            try {
              setIsLoading(true);
              const response = await axiosInstance.post(voucherApiUrls.DELETE, {
                voucherId: selectedVoucher?.voucherId,
                deletedBy: 1
              });

              if (response.data.success) {
                Alert.alert('Success', 'Voucher deleted successfully');
                fetchVouchers();
              }
            } catch (error) {
              Alert.alert('Error', 'Failed to delete voucher');
            } finally {
              setIsLoading(false);
              setShowActionSheet(false);
            }
          }
        },
      ]
    );
  };

  useFocusEffect(
    useCallback(() => {
      fetchVouchers();
    }, [])
  );

  const filteredVouchers = vouchers.filter(voucher =>
    voucher.drAccount.toLowerCase().includes(searchQuery.toLowerCase()) ||
    voucher.crAccount.toLowerCase().includes(searchQuery.toLowerCase()) ||
    voucher.narration.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // if (isLoading) {
  //   return (
  //     <SafeAreaView style={styles.loadingContainer}>
  //       <ActivityIndicator size="large" color={COLORS.primary} />
  //     </SafeAreaView>
  //   );
  // }


 if (filteredVouchers.length > 0) {
  <View>
    <Text>No Records Found</Text>
  </View>
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
          <Text style={styles.heading}>Vouchers</Text>
          <Pressable
            style={styles.add}
            onPress={() => navigation.navigate("AddVoucher")}
          >
            <Feather name="plus" color="#fff" size={26} />
          </Pressable>
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
        <Pressable
          onPress={() => setShowFilterModal(true)}
        >
          <Feather name="filter" color="#ec7e1d" size={20} />
        </Pressable>        
      </View>      
  
  

      
      {isLoading ? <Loader/> : (

     <FlatList
            data={filteredVouchers}
            keyExtractor={(item) => item.voucherId.toString()}
            renderItem={({ item, index }) => (
              <Pressable
                key={item.voucherId}
                onPress={() => handleVoucherPress(item)}
              >
                <View style={styles.whiteCard}>
                  <View style={styles.rowColumn}>
                    <Text style={styles.valueText}>{item.vouType}</Text>
                    <Text style={[styles.valueText, { textAlign: 'center' }]}>{formatDate(item.date)}</Text>
                    <Text style={[styles.valueText, { textAlign: 'right' }]}>
                      {formatCurrency(item.amount)}
                    </Text>
                  </View>
                  <View style={styles.rowColumn}>
                    <Text style={[styles.valueText, { color: '#db0500' }]}>
                      <Image
                        source={UPARROW}
                        style={styles.upArrow}
                      /> &nbsp;
                      {item.drAccount}
                    </Text>
                    <Text style={[styles.valueText, { color: '#04a029', textAlign: 'right' }]}>
                      <Image
                        source={DOWNARROW}
                        style={styles.upArrow}
                      /> &nbsp;
                      {item.crAccount}
                    </Text>
                  </View>

                  <View style={[styles.rowColumn, { marginBottom: 0 }]}>
                    <Text style={styles.valueText}>{item.narration || '-'}</Text>
                  </View>
                </View>
              </Pressable>
            )}
            initialNumToRender={20} // Only render 20 items initially
            maxToRenderPerBatch={10} // Render 10 more at a time when scrolling
            windowSize={10} // Reduce memory usage
            contentContainerStyle={{ paddingBottom: 110 }}
          />
    
      ) }
   

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
          
          <View style={styles.buttonGroup}>
            <Pressable
              style={[styles.filterButton, styles.resetButton]}
              onPress={handleFilterReset}
            >
              <Text style={[styles.buttonText, {color: COLORS.primary}]}>Reset</Text>
            </Pressable>
            
            <LinearGradient
              colors={['#ec7d20', '#be2b2c']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={[styles.filterButton, {flex: 1}]}
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

      {/* Action Sheet Modal */}
      <Modal
        isVisible={showActionSheet}
        onBackdropPress={() => setShowActionSheet(false)}
        style={styles.bottomModal}
      >
        <View style={styles.modalContent}>
          <View style={{ 
            marginTop: 24,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            display: 'flex' }}
          >
            <View style={{ width: '48%' }}>
              <Pressable
                style={styles.editButton}
                onPress={handleEdit}
              >
                <Feather name="edit-3" color="#fff" size={20} style={{ marginRight: 6 }} />
                <Text style={styles.buttonText}>Edit</Text>
              </Pressable>
            </View>
            <View style={{ width: '48%' }}>
              <Pressable
                style={styles.deleteButton}
                onPress={handleDelete}
              >
                <Feather name="trash" color="#fff" size={20} style={{ marginRight: 6 }} />
                <Text style={styles.buttonText}>Delete</Text>
              </Pressable>
            </View>
          </View>
          <Feather
            name="x"
            color="#000"
            size={24}
            style={styles.close}
            onPress={() => setShowActionSheet(false)}
          />
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
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
  topbar: {
    backgroundColor: '#ececec',
    paddingTop: 10,
    paddingLeft: 16,
    paddingRight: 16,
    gap: 16,
    alignItems: 'center',
    flexDirection: 'row',
    display: 'flex'
  },
  searchbar: {
    flex: 1
  },
  add: {
    position: 'absolute',
    right: 12,
    top: 22,
    zIndex: 4
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
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 24
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: COLORS.white,
    padding: 20,
    paddingTop: 40,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  editButton: {
    backgroundColor: COLORS.primary,
    width: '100%',
    height: 48,
    color: COLORS.white,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex'
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '500',
  },
  deleteButton: {
    backgroundColor: COLORS.red,
    width: '100%',
    height: 48,
    color: COLORS.white,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex'
  },
  close: {
    position: 'absolute',
    zIndex: 3,
    top: 16,
    right: 16
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
  addButton: {
    width: '100%',
    height: 48,
    color: COLORS.white,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex'
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
    display: 'flex'
  },
  resetButton: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primary,
    flex: 0.5
  },
  noRecordsContainer: {
  backgroundColor: COLORS.white,
  padding: 20,
  borderRadius: 8,
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 20,
},
noRecordsText: {
  color: COLORS.black,
  fontSize: 16,
  fontWeight: '500',
},
});