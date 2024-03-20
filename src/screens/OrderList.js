import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import VirtualizedListComp from "../component/VirtualizedComp";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

const image = "https://img.freepik.com/free-photo/colorful-design-with-spiral-design_188544-9588.jpg?size=626&ext=jpg&ga=GA1.1.2082370165.1710720000&semt=sph";

const OrderList = () => {

    const [list, setList] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    const getOrderList = async () => {
        let res = await AsyncStorage.getItem("orderList");
        if (res) {
            res = JSON.parse(res);
            let amount = 0;
            for (let i in res) {
                amount = amount + ((res[i]?.item?.mrp?.mrp) * res[i].count);
            }
            setTotalAmount(amount);
            setList(res);
        };
    };

    useEffect(() => {
        console.log("test")
        getOrderList();
    }, []);


    useFocusEffect(
        React.useCallback(() => {
            console.log("Calling")
          getOrderList(); // Call the function when the screen is focused
          return () => {
           
          };
        }, [])
      );
    

    return (
        <>
            {list?.length === 0 && <Text style={styles.noText} >No Order</Text>}
            {list?.length !== 0 && <Text style={[styles.noText, {color:"black", marginTop:10}]} >Total Amount : {totalAmount} </Text>}
            <VirtualizedListComp>
                <FlatList
                    data={list}
                    keyExtractor={(item) => item?.index}
                    renderItem={({ item, index }) => {
                        return (<>
                            <OrderCard item={item} />
                        </>)
                    }}
                />
            </VirtualizedListComp>
        </>
    );
};


const OrderCard = ({ item }) => {
    const navigation = useNavigation();
    const data = item?.item;
    return (
        <>
            <TouchableOpacity onPress={() => { navigation.navigate("DetailsScreen", { data: data }) }} style={styles.cardContainer} >
                <Text style={styles.text} >{data?.name?.slice(0, 30)}</Text>
                <Image source={{ uri: image }} style={styles.image} />
                <View style={{
                    flexDirection: "row", justifyContent: "space-between",
                    paddingHorizontal: 10
                }} >
                    <Text style={styles.text} >Count : {item?.count}</Text>
                    <Text style={styles.text} >Price : {data?.mrp?.mrp}</Text>
                </View>
            </TouchableOpacity>
        </>
    )
}


export default OrderList;

const styles = StyleSheet.create({
    noText: {
        color: "gray",
        alignSelf: "center",
        fontWeight: "500",
        fontSize: 18
    },
    cardContainer: {
        width: "95%",
        alignSelf: "center",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginVertical: 10
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
        alignSelf: "center",
        marginTop:10
    },
    text: {
        color: "black",
        fontSize: 15
    }
});