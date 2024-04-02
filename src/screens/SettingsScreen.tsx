import {StyleSheet, Text, TextInput, View} from "react-native";
import {PrimaryTitle} from "../components/texts/PrimaryTitle/style";
import PrimaryButton from "../components/buttons/PrimaryButton";
import React, {useCallback, useEffect, useState} from "react";
import {FormInputStyle} from "../components/inputs/PrimaryInput/style";
import {useFocusEffect} from "@react-navigation/native";
import axios from "axios";
import {changePassword} from "../store/slices/userSlice";

export default function SettingsScreen() {
    const [showPasswordFields, setShowPasswordFields] = useState(false);
    const [oldPassword, setOldPassword] = useState('Albumito1');
    const [newPassword, setPassword] = useState('Albumito1');
    const [statusMessage, setStatusMessage] = useState('');
    const [email, setEmail] = useState('Bebdou@yo.fr');
    const handleChangePasswordClick = () => {
        setShowPasswordFields(true);
    };
    const handlePasswordChange = (text: string) => {
        setPassword(text);
    };
    const handleOldPasswordChange = (text: string) => {
        setOldPassword(text);
    };
    function logout(){
        setStatusMessage("BITATATOS")
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
            const response= changePassword({email,oldPassword,newPassword})
            console.log(`This is my response data : ${response.toString()}`)
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