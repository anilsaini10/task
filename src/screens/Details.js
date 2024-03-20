import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const image = "https://img.freepik.com/free-photo/colorful-design-with-spiral-design_188544-9588.jpg?size=626&ext=jpg&ga=GA1.1.2082370165.1710720000&semt=sph";


const Details = (props) => {

    const data = props?.route?.params?.data;

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

            <TouchableOpacity onPress={()=>{ handleAddToCart(); }} style={{
                borderWidth: 1, borderRadius: 10,
                backgroundColor: "blue", justifyContent: "center", alignItems: "center", width: 120, height: 40, alignSelf: "center", marginTop: 5
            }} >
                <Text style={{ color: "white", fontSize: 15, fontWeight: "900" }} >Add To Cart</Text>
            </TouchableOpacity>
            <ScrollView>

                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(((item, index) => {
                        return (
                            <View style={styles.imageContainer} >
                                <Image source={{ uri: image }} style={styles.image} />
                            </View>
                        )
                    }))}
                </ScrollView>

                <View style={styles.mainContainer} >

                    <View style={styles.container} >
                        <View style={styles.leftBox} >
                            <Text style={styles.leftText} >Name</Text>
                        </View>
                        <View style={styles.rightBox} >
                            <Text style={styles.rightText} >{data?.name}</Text>
                        </View>
                    </View>
                    <View style={styles.container} >
                        <View style={styles.leftBox} >
                            <Text style={styles.leftText} >Brand</Text>
                        </View>
                        <View style={styles.rightBox} >
                            <Text style={styles.rightText} >{data?.brand}</Text>
                        </View>
                    </View>
                    <View style={styles.container} >
                        <View style={styles.leftBox} >
                            <Text style={styles.leftText} >Weight</Text>
                        </View>
                        <View style={styles.rightBox} >
                            <Text style={styles.rightText} >{data?.weights_and_measures?.net_weight + data?.weights_and_measures?.measurement_unit}</Text>
                        </View>
                    </View>


                    <View style={styles.container} >

                        <View style={styles.leftBox} >
                            <Text style={styles.leftText} >Price</Text>
                        </View>
                        <View style={styles.rightBox} >
                            <Text style={styles.rightText} >{data?.mrp?.mrp + " " + data?.mrp?.currency}</Text>
                        </View>

                    </View>
                    <View style={styles.container} >

                        <View style={styles.leftBox} >
                            <Text style={styles.leftText} >Description</Text>
                        </View>
                        <View style={styles.rightBox} >
                            <Text style={styles.rightText} >{data?.description}</Text>
                        </View>

                    </View>
                    <View style={styles.container} >

                        <View style={styles.leftBox} >
                            <Text style={styles.leftText} >Nutritional</Text>
                        </View>
                        <View style={styles.rightBox} >
                            <Text style={styles.rightText} >{data?.attributes?.nutritional_information}</Text>
                        </View>

                    </View>
                    <View style={styles.container} >

                        <View style={styles.leftBox} >
                            <Text style={styles.leftText} >Ingredients</Text>
                        </View>
                        <View style={styles.rightBox} >
                            <Text style={styles.rightText} >{data?.attributes?.ingredients}</Text>
                        </View>

                    </View>


                </View>

            </ScrollView>
        </>
    );
};


export default Details;

const styles = StyleSheet.create({
    mainContainer: {
        marginTop: 10
    },
    container: {
        flexDirection: "row",
        // justifyContent:"center",
        width: "100%",
        paddingHorizontal: 10,
        // borderBottomWidth: 1
    },
    leftBox: {
        width: "30%",
        borderWidth: 0.5,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 5
    },
    rightBox: {
        width: "70%",
        paddingLeft: 10,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 5,
        borderWidth: 0.5,
    },
    leftText: {
        color: "gray",
        fontWeight: "400",
        fontSize: 16
    },
    rightText: {
        color: "black",
        fontWeight: "400",
        fontSize: 16
    },
    imageContainer: {
        marginHorizontal: 5
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 10,
        alignSelf: "center",
        marginVertical: 5
    },
})
