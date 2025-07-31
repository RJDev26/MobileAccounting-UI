import { useEffect, useState } from "react";
import COLORS from "../../constants/color";
import {
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
    ScrollView,
    Image,
    Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BACK } from "../utils/imagePath";
import { LinearGradient } from "expo-linear-gradient";
import { ActivityIndicator, RadioButton } from "react-native-paper";
import axiosInstance from "../config/axios";
import { useRoute } from "@react-navigation/native";
import { AccountAPIUrls } from "../services/api";
import Loader from "../component/Loader";

type RouteParams = {
    account: {
        accountId: number;
        shortCode: string;
        name: string;
        drcr: string,
        openingBalance: number;
    };
};

export default function EditAccount({ navigation }: any) {
    const route = useRoute();
    const { id } = route.params as { id: number };
    const [loading, setLoading] = useState(true);
    const [value, setValue] = useState("cr");
    const [shortCode, setShortCode] = useState("");
    const [name, setName] = useState("");
    const [openingBalance, setOpeningBalance] = useState("");
    const [isLoading, setIsLoading] = useState(false);


    const updateAccountHandler = async () => {
        if (!shortCode || !name || !openingBalance || !value) {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }
        const balanceValue = parseFloat(openingBalance.replace(/\.00$/, ''));

        if (isNaN(balanceValue)) {
            Alert.alert('Error', 'Please enter a valid opening balance');
            return;
        }


        try {
            setIsLoading(true);
            const res = await axiosInstance.post(AccountAPIUrls.UPDATE, {
                accountId: id,
                shortCode,
                name,
                drcr: value,
                openingBalance: balanceValue,
                createdBy: 1,
                createdAt: new Date().toISOString()
            });


            if (res.data) {
                Alert.alert('Success', 'Account Edited successfully');
                navigation.goBack();
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to Edit account');
        } finally {
            setIsLoading(false)
        }
    };

    const getEditAccount = async () => {

        try {
            setLoading(true);
            const response = await axiosInstance.get(`/api/AccountMaster/list`, {
                params: {
                    accountId: id,
                }
            });

            const accountData = response.data.data[0];
            setShortCode(accountData.shortCode);
            setName(accountData.name);
            const balance = Math.abs(accountData.openingBalance);
            setOpeningBalance(Number.isInteger(balance)
                ? `${balance}.00`
                : balance.toFixed(2));
            setValue(accountData.drcr)
        } catch (error) {
            Alert.alert("Error fetching account:");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getEditAccount();
    }, []);

    return (
        <>

            <SafeAreaView style={styles.container} edges={["top"]}>
                <LinearGradient
                    colors={["#ec7d20", "#be2b2c"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={{ paddingTop: 20, paddingBottom: 20 }}
                >
                    <Pressable onPress={() => navigation.goBack()} style={styles.back}>
                        <Image source={BACK} style={styles.backIcon} />
                    </Pressable>
                    <Text style={styles.heading}>Edit Account</Text>
                </LinearGradient>
                {loading ? <Loader/> : <ScrollView style={styles.scrollView}>
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
                                    onChangeText={(text) => {
                                        // Allow numbers and single decimal point
                                        const cleanValue = text
                                            .replace(/[^0-9.]/g, '') // Remove non-numeric except .
                                            .replace(/(\..*)\./g, '$1') // Allow only one decimal
                                            .replace(/^0+(\d)/, '$1'); // Remove leading zeros

                                        setOpeningBalance(cleanValue);
                                    }}
                                    onBlur={() => {
                                        // Format with .00 when leaving field
                                        if (openingBalance && !openingBalance.includes('.')) {
                                            setOpeningBalance(`${openingBalance}.00`);
                                        } else if (openingBalance.includes('.')) {
                                            // Ensure exactly 2 decimal places
                                            const parts = openingBalance.split('.');
                                            const decimalPart = parts[1]?.slice(0, 2).padEnd(2, '0');
                                            setOpeningBalance(`${parts[0]}.${decimalPart}`);
                                        }
                                    }}
                                    keyboardType="numeric"
                                />
                            </View>
                        </View>
                        <View style={styles.gap}>
                            <RadioButton.Group onValueChange={setValue} value={value}>
                                <View style={styles.radioGroup}>
                                    <View
                                        style={{ flexDirection: "row", alignItems: "center" }}
                                    >
                                        <RadioButton value="cr" color="#ec7d20" />
                                        <Text>Credit</Text>
                                    </View>
                                    <View
                                        style={{ flexDirection: "row", alignItems: "center" }}
                                    >
                                        <RadioButton value="dr" color="#ec7d20" />
                                        <Text>Debit</Text>
                                    </View>
                                </View>
                            </RadioButton.Group>
                        </View>
                        <LinearGradient
                            colors={["#ec7d20", "#be2b2c"]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0, y: 1 }}
                            style={{ borderRadius: 50 }}
                        >
                            <Pressable
                                style={styles.addButton}
                                onPress={updateAccountHandler}
                            // disabled={isLoading}
                            >
                                <View>
                                    <Text style={styles.buttonText}>
                                        {isLoading ? 'Processing...' : 'Submit'}
                                    </Text>
                                </View>
                            </Pressable>
                        </LinearGradient>
                    </View>
                </ScrollView>}

            </SafeAreaView>

        </>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        paddingTop: 0,
    },
    back: {
        width: 30,
        height: 30,
        position: "absolute",
        top: 20,
        left: 12,
        zIndex: 4,
    },
    backIcon: {
        width: 30,
        height: 30,
    },
    heading: {
        color: COLORS.white,
        fontWeight: "500",
        fontSize: 20,
        textAlign: "center",
    },
    scrollView: {
        backgroundColor: COLORS.lightBlue,
        height: "100%",
        paddingTop: 16,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 24,
    },
    whiteCard: {
        backgroundColor: COLORS.white,
        width: "100%",
        paddingTop: 16,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 24,
        borderRadius: 4,
        shadowColor: "#000",
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
        fontWeight: "500",
        fontSize: 14,
        lineHeight: 18,
        marginBottom: 8,
        padding: 0,
    },
    input: {
        height: 48,
        borderWidth: 1,
        borderColor: "#DFDFDF",
        borderRadius: 4,
        paddingLeft: 12,
        paddingRight: 12,
    },
    radioGroup: {
        gap: 16,
        flexDirection: "row",
        display: "flex",
    },
    addButton: {
        width: "100%",
        height: 48,
        color: COLORS.white,
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
    },
    buttonText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: "500",
    },
});
