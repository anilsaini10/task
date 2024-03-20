/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { updateLoginIndex } from '../redux/LoginSlice/loginSlice';

const LoginScreen = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        GoogleSignin.configure({
            androidClientId: '512273256441-7s2kb1tsv19rj6j6ia9gbs3lnq4vmngn.apps.googleusercontent.com',
        });
    }, []);
    useEffect(() => {
        const checkLogin = async () => {
            let res = await AsyncStorage.getItem("login");
            if (res) {
                dispatch(updateLoginIndex(1));
            }
        }
        checkLogin();
    }, []);

    const signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log(userInfo);
            await AsyncStorage.setItem("login", "true");
            // dispatch(updateLoginIndex(1));
        } catch (error) {
            console.log('Error: ', error);
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // User cancelled the sign-in flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // Operation (e.g. sign-in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // Play services not available or outdated
            } else {
                // Some other error happened
            }
        }
    };


    return (
        <>
            <View style={{ flex: 1, alignItems: "center", marginTop: 100 }} >

                <GoogleSigninButton
                    style={{ width: 200, height: 48 }}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Light}
                    onPress={signIn}
                // disabled={isSigninInProgress}
                />

            </View>

        </>
    );
}


export default LoginScreen;
