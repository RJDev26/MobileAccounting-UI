import React, { useState, useCallback, useMemo } from 'react';
import COLORS from '../../constants/color';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Alert,
  FlatList
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BACK, UPARROW, DOWNARROW } from '../utils/imagePath';
import { LinearGradient } from 'expo-linear-gradient';
import Modal from 'react-native-modal';
import Feather from '@react-native-vector-icons/feather';
import axiosInstance from '../config/axios';
import { useFocusEffect } from '@react-navigation/native';
import { AccountAPIUrls } from '../services/api';
import Loader from '../component/Loader';

type RouteParams = {
  accountId: number;
};

interface Account {
  accountId: number;
  shortCode: string;
  name: string;
  drcr: string; // 'dr' for debit, 'cr' for credit
  openingBalance: number;
  createdAt: string;
}

export default function AccountMaster({ navigation }: any) {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const fetchAccounts = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(AccountAPIUrls.GET_ALL);       
        
      if (response.data.success) {
        setAccounts(response.data.data);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load accounts');
    } finally {
      setLoading(false);
    }
  };

  const deleteAccount = async (id: number) => {
    setIsVisible(false);
    try {
      const res = await axiosInstance.delete(AccountAPIUrls.DELETE(id));
      if (res.data.success) {
        Alert.alert("Success", "Account deleted successfully");
        fetchAccounts();
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to delete account');
    }
  };

  const filteredAccounts = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return accounts.filter(account =>
      account.name.toLowerCase().includes(query) ||
      account.shortCode.toLowerCase().includes(query)
    );
  }, [accounts, searchQuery]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(Math.abs(amount));
  };

  const getInitial = (name: string) => name.charAt(0).toUpperCase();

  const getCircleColor = (index: number) => {
    const colors = ['#d80d9c', 'green', '#0249fe', '#b0361a'];
    return colors[index % colors.length];
  };

  const handleAccountPress = useCallback((account: Account) => {
    setSelectedAccount(account);
    setIsVisible(true);
  }, []);

  const getArrowIcon = (drcr: string) => {
    return drcr === "dr" ? UPARROW : DOWNARROW;
  };

  const getAccountType = (drcr: string) => {
    return drcr === "dr" ? "Debit" : "Credit";
  };

  useFocusEffect(
    useCallback(() => {
      fetchAccounts();
    }, [])
  );

  const renderItem = useCallback(
    ({ item, index }: { item: Account; index: number }) => (
      <Pressable key={item.accountId} onPress={() => handleAccountPress(item)}>
        <View style={styles.whiteCard}>
          <View style={[styles.circle, { backgroundColor: getCircleColor(index) }]}>
            <Text style={styles.alphanumeric}>{getInitial(item.name)}</Text>
          </View>
          <Text style={styles.name}>{item.name}</Text>
          <View style={styles.spaceBetween}>
            <Text style={styles.shortCode}>{item.shortCode}</Text>
            <Text style={styles.amoumt}>
              <Image source={getArrowIcon(item.drcr)} style={styles.upArrow} />
              {' '}{formatCurrency(item.openingBalance)}
            </Text>
          </View>
        </View>
      </Pressable>
    ),
    [handleAccountPress]
  );

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
            onPress={() => navigation.navigate("MobileAccountingTab")}
            style={styles.back}
          >
            <Image source={BACK} style={styles.backIcon} />
          </Pressable>
          <Text style={styles.heading}>Accounts</Text>
          <Pressable
            style={styles.add}
            onPress={() => navigation.navigate("AddAccount")}
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
      </SafeAreaView>

      {loading ? (
        <Loader />
      ) : (
        <FlatList
          data={filteredAccounts}
          keyExtractor={(item) => item.accountId.toString()}
          renderItem={renderItem}
          initialNumToRender={20} // Only render 20 items initially
          maxToRenderPerBatch={10} // Render 10 more at a time when scrolling
          windowSize={10} // Reduce memory usage
          contentContainerStyle={{ paddingBottom: 110 }}
        />
      )}

      {/* Account Detail Modal */}
      <Modal
        isVisible={isVisible}
        onBackdropPress={() => setIsVisible(false)}
        style={styles.bottomModal}
      >
        {selectedAccount && (
          <View style={styles.modalContent}>
            <Text style={styles.h1}>{selectedAccount.name}</Text>
            <View style={styles.rowColumn}>
              <View>
                <Text style={styles.label}>Short Code</Text>
                <Text style={styles.valueText}>{selectedAccount.shortCode}</Text>
              </View>
              <View>
                <Text style={[styles.label, styles.textRight]}>Type</Text>
                <Text style={[styles.valueText, styles.textRight]}>
                  {getAccountType(selectedAccount.drcr)}
                </Text>
              </View>
            </View>

            <View style={[styles.rowColumn, { marginTop: 20 }]}>
              <View>
                <Text style={styles.label}>Balance</Text>
              </View>
              <View>
                <Text style={styles.valueText}>
                  {/* CORRECTED ARROW USAGE */}
                  <Image
                    source={getArrowIcon(selectedAccount.drcr)}
                    style={styles.upArrow}
                  />{' '}
                  {formatCurrency(selectedAccount.openingBalance)}
                </Text>
              </View>
            </View>

            <View style={[styles.rowColumn, { marginTop: 24 }]}>
              <View style={{ width: '48%' }}>
                <Pressable
                  style={styles.editButton}
                  onPress={() => {
                    setIsVisible(false);
                    navigation.navigate('EditAccount', { id: selectedAccount.accountId });
                  }}
                >
                  <Feather name="edit-3" color="#fff" size={20} style={{ marginRight: 6 }} />
                  <Text style={styles.buttonText}>Edit</Text>
                </Pressable>
              </View>
              <View style={{ width: '48%' }}>
                <Pressable
                  style={styles.deleteButton}
                  onPress={() => deleteAccount(selectedAccount.accountId)}
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
              onPress={() => setIsVisible(false)}
            />
          </View>
        )}
      </Modal>
    </>
  );
}


const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    color: COLORS.white,
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
  scrollView: {
    backgroundColor: COLORS.grey,
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
    height: 8,
  },
  add: {
    position: 'absolute',
    right: 12,
    top: 22,
    zIndex: 4
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
    alignItems: 'center',
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgba(255,255,255,0.9)',
    paddingTop: 70
  },
  premiumSpinner: {
    transform: [{ scale: 1.8 }],
    opacity: 0.9,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  }
})