import React from 'react';
import { Pressable, Text, View } from 'react-native';
import Axios from 'axios';
const Seatscreen = ({ height, width, borderWidth, occupiedborderColor, normalborderColor, borderRadius, item, backgroundColor, marginTop,onpress }) => {

    return (
        <Pressable onPress={onpress}
            disabled={!item.item.occupied}
            style={{
                height: height, width: width, borderWidth: borderWidth,
                borderColor: item.item.occupied == false ? occupiedborderColor : normalborderColor,
                borderRadius: borderRadius,
                marginLeft: 10,
                marginRight: item.item.id % 2 == 0 ? 12 : 0,
                marginTop: marginTop,
                backgroundColor: item.item.isopen ? backgroundColor : null
            }}>
        </Pressable>
    );
}

export default React.memo(Seatscreen);