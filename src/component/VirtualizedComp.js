import React from "react";
import { VirtualizedList } from "react-native";


// Pass children and style in props
const VirtualizedListComp = (props) => {
    return (
        <>
            <VirtualizedList
                style={props?.style}
                showsVerticalScrollIndicator={false}
                data={[{}]}
                initialNumToRender={1}
                renderItem={() => <>{props?.children}</>}
                keyExtractor={(item) => item}
                getItemCount={() => 1}
                getItem={() => 1}

            /></>
    );
};

export default VirtualizedListComp;