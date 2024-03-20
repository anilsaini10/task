import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const image = "https://img.freepik.com/free-photo/colorful-design-with-spiral-design_188544-9588.jpg?size=626&ext=jpg&ga=GA1.1.2082370165.1710720000&semt=sph";

const Card = ({ data }) => {

    const navigation = useNavigation();

    const handleAddToCart = async () => {

        let list = await AsyncStorage.getItem("orderList");
        if (list) {
            list = JSON.parse(list);
            let count = 1;
            for (let i in list) {
                if (list[i]?.item == data) {
                    count = list[i].count + 1;
                    break;
                }
            }
            list.push({ item: data, count: count });
        } else {
            list = [];
        }
        list = JSON.stringify(list);
        console.log(list)
        await AsyncStorage.setItem("orderList", list);
    };

    return (
        <>
            <View style={styles.container} >
                <View>
                    <Text style={styles.text} >{data?.name?.slice(0, 30) + (data?.name?.length > 20 ? "..." : "")}</Text>
                </View>

                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(((item, index) => {
                        return (
                            <View style={styles.imageContainer} >
                                <Image source={{ uri: image }} style={styles.image} />
                            </View>
                        )
                    }))}
                </ScrollView>

                <Text style={styles.text} >{data?.description?.slice(0, 60) + (data?.description?.length > 60 ? "..." : "")}</Text>

                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }} >

                    <View>
                        <Text style={styles.priceText2} >Price: <Text style={styles.priceText} >{data?.mrp?.mrp + " " + data?.mrp?.currency}</Text></Text>
                    </View>
                    <View style={{ flexDirection: "row" }} >

                        <TouchableOpacity onPress={() => { handleAddToCart(); }} style={[styles.button, { marginRight: 2, backgroundColor: "green" }]} >
                            <Text style={styles.buttonText} >Add To Cart</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { navigation.navigate("DetailsScreen", { data: data }) }} style={styles.button} >
                            <Text style={styles.buttonText} >Details</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "black",
        paddingHorizontal: 10,
        width: "95%",
        alignSelf: "center",
        marginTop: 10,
        paddingVertical: 10
    },
    imageContainer: {
        marginHorizontal: 5
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
        alignSelf: "center",
        marginVertical: 5
    },
    button: {
        backgroundColor: "blue",
        width: 100,
        height: 38,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10
    },
    buttonText: {
        color: "white",
        fontWeight: "900",
        fontSize: 14
    },
    priceText: {
        fontWeight: "700",
        fontSize: 18,
        color: "black"
    },
    priceText2: {
        color: "gray",
        fontWeight: "700",
    },
    text:{color:"black", fontSize:15, fontWeight:"500"},
});


export default Card;