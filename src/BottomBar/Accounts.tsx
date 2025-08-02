import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Feather from '@react-native-vector-icons/feather';
import axiosInstance from '../config/axios';
import COLORS from '../../constants/color';

interface Account {
  accountId: number;
  shortCode: string;
  name: string;
  openingBalance: number;
  drcr: string;
}

export default function Accounts() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await axiosInstance.get('/api/AccountMaster/list', { params: { accountid: 0 } });
        if (res.data.success) {
          setAccounts(res.data.data);
        }
      } catch (e) {
        console.warn(e);
      }
    };

    fetchAccounts();
  }, []);

  const filteredAccounts = accounts.filter((account) =>
    account.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    account.shortCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
    }).format(Math.abs(amount));
  };

  const renderItem = ({ item }: { item: Account }) => (
    <View style={styles.itemContainer}>
      <View>
        <Text style={styles.shortCode}>{item.shortCode}</Text>
        <Text style={styles.name}>{item.name}</Text>
      </View>
      <View style={styles.balanceContainer}>
        <Text style={styles.balance}>{formatCurrency(item.openingBalance)}</Text>
        <Feather
          name={item.drcr.toLowerCase() === 'dr' ? 'arrow-down-right' : 'arrow-up-right'}
          size={16}
          color={item.drcr.toLowerCase() === 'dr' ? COLORS.red : COLORS.success}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <LinearGradient
        colors={['#ec7d20', '#be2b2c']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Accounts</Text>
      </LinearGradient>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.search}
        />
      </View>
      <FlatList
        data={filteredAccounts}
        keyExtractor={(item) => item.accountId.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
  },
  searchContainer: {
    padding: 12,
  },
  search: {
    borderWidth: 1,
    borderColor: '#e1e1e1',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
  },
  shortCode: {
    color: COLORS.lightGrey,
    fontSize: 13,
  },
  name: {
    color: COLORS.black,
    fontSize: 15,
    fontWeight: '600',
    paddingTop: 4,
  },
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  balance: {
    color: COLORS.black,
    fontSize: 13,
    marginRight: 8,
  },
});
