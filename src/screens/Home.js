import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, ScrollView, Text, View, TouchableOpacity } from "react-native";
import Card from "../component/Card";
import axios from "axios";
import VirtualizedListComp from "../component/VirtualizedComp";
import { useNavigation } from "@react-navigation/native";


const Home = () => {

    const navigation = useNavigation();

    const [objectList, setObjectList] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const getList = async () => {
        const URL = `https://catalog-management-system-dev-ak3ogf6zea-uc.a.run.app/cms/products?page=1`;
        try {
            setIsLoading(true);
            let res = await axios.get(URL);
            if (res?.status === 200) {
                const resList = res?.data?.products;
                setObjectList(resList);
                setTotalPage(res?.data?.totalPages);
            } else {
                console.log(res?.status, res?.data);
            }
            setIsLoading(false);
        } catch (error) {
            console.log("ERROR ", error);
        };
    };

    useEffect(() => {
        getList();
    }, []);

    const renderLoader = () => {
        return (
            <>
                {isLoading ?
                    <View style={styles.loaderStyle}>
                        <ActivityIndicator size="large" color="#aaa" />
                    </View> :
                    <></>}
            </>
        );
    };

    const getMoreList = async () => {
        if (page == totalPage) {
            return;
        }
        const URL = `https://catalog-management-system-dev-ak3ogf6zea-uc.a.run.app/cms/products?page=${page + 1}`;
        try {
            setIsLoading(true);
            let res = await axios.get(URL);
            if (res?.status === 200) {
                const list = [...objectList];
                const resList = res?.data?.products;
                const finalList = list.concat(resList);
                setObjectList(finalList);
                console.log(finalList.length, res?.data?.products?.length);
                setPage(page + 1);
            } else {
                console.log(res?.status, res?.data);
            }
            setIsLoading(false);
        } catch (error) {
            console.log("ERROR ", error);
        };
    }

    return (
        <>
            <View style={{ flexDirection: "row", justifyContent: "space-around" }} >

                <TouchableOpacity onPress={() => { navigation.navigate("OrderListScreen") }} style={styles.buttonContainer} >
                    <Text style={{ color: "blue", fontWeight: "900", fontSize: 16 }} >My Order</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate("BarcodeScanner") }} style={styles.buttonContainer} >
                    <Text style={{ color: "blue", fontWeight: "900", fontSize: 16 }} >Scan QR</Text>
                </TouchableOpacity>
            </View>
            <VirtualizedListComp>

                <FlatList
                    data={objectList}
                    keyExtractor={(item) => item?.index}
                    renderItem={({ item, index }) => {
                        return (<>
                            <Card data={item} />
                            {/* <View style={{ height: 100, width: 500 }} >
                                <Text>Name</Text>
                            </View> */}
                        </>)
                    }}
                    ListFooterComponent={renderLoader}
                    onEndReachedThreshold={0}
                    onEndReached={getMoreList}
                />
            </VirtualizedListComp>

        </>
    );
};



export default Home;

const styles = StyleSheet.create({
    loaderStyle: {
        marginVertical: 16,
        alignItems: "center",
        marginTop: 20
    },
    buttonContainer: {
        alignSelf: "flex-end",
        borderWidth: 1,
        width: 100,
        height: 35,
        borderRadius: 10,
        borderColor: "blue",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10
    },
})