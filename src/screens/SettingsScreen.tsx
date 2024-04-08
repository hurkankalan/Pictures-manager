import {StyleSheet, Text, TextInput, View} from "react-native";
import {PrimaryTitle} from "../components/texts/PrimaryTitle/style";
import PrimaryButton from "../components/buttons/PrimaryButton";
import React, {ReactElement, useCallback, useEffect, useState} from "react";
import {FormInputStyle} from "../components/inputs/PrimaryInput/style";
import {useFocusEffect} from "@react-navigation/native";
import {changePassword} from "../store/slices/userSlice";
import { useDispatch } from 'react-redux';
import { authSlice } from '../store/slices/authSlice';
export default function SettingsScreen({navigation,}: {
    navigation: any;
}): ReactElement {
    const [showPasswordFields, setShowPasswordFields] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setPassword] = useState('');
    const [statusMessage, setStatusMessage] = useState('');
    const handleChangePasswordClick = () => {
        setShowPasswordFields(true);
    };
    const dispatch = useDispatch();

    const handlePasswordChange = (text: string) => {
        setPassword(text);
    };
    const handleOldPasswordChange = (text: string) => {
        setOldPassword(text);
    };

    function logout() {
        dispatch(authSlice.actions.logOut());
        alert("Successfully logged out")
    }

    useFocusEffect(
        useCallback(() => {
            setOldPassword('');
            setPassword('');
            setStatusMessage('');
            setShowPasswordFields(false);
        }, [])
    );
    const submitForm = async () => {
        try {
            // @ts-ignore
            dispatch(changePassword({oldPassword, newPassword}));
            setShowPasswordFields(false);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <View style={styles.container}>
            <PrimaryTitle>Settings </PrimaryTitle>
            {!showPasswordFields ? (
                <PrimaryButton onPress={handleChangePasswordClick} text={"Change Password"}/>
            ) : (
                <>
                    <FormInputStyle
                        onChangeText={handleOldPasswordChange}
                        value={oldPassword}
                        placeholder="Enter your current password"
                        secureTextEntry={true}
                    />
                    <FormInputStyle
                        onChangeText={handlePasswordChange}
                        value={newPassword}
                        placeholder="Enter the new password"
                        secureTextEntry={true}
                    />
                    <PrimaryButton onPress={submitForm} text={"Submit"}/>
                    <Text>{statusMessage}</Text>
                </>

            )}
            <PrimaryButton onPress={logout} text={"Logout"}/>
            <Text>{statusMessage}</Text>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 50,
    },
    link: {
        textAlign: "center",
        color: "blue",
    },
});