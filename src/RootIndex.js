import React from "react";
import { useSelector } from "react-redux";
import Home from "./screens/Home";
import OrderList from "./screens/OrderList";
import Details from "./screens/Details";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/Login";
import BarcodeScanner from "./screens/BarCodeScanner";

const Stack = createStackNavigator();

const RootIndex = () => {
    const index = useSelector(state => state.loginSlice.currentLoginButton)

    return (
        <>
            <NavigationContainer>

                {index === 0 ? (
                    <LoginScreen />
                ) : (
                    <Stack.Navigator>
                        <Stack.Screen name="Home" component={Home} />
                        <Stack.Screen name="BarcodeScanner" component={BarcodeScanner} />
                        <Stack.Screen name="OrderListScreen" component={OrderList} />
                        <Stack.Screen name="DetailsScreen" component={Details} />
                    </Stack.Navigator>
                )}


            </NavigationContainer>
        </>
    );
};



export default RootIndex;