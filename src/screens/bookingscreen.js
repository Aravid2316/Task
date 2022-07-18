import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, StatusBar, Dimensions, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';
import Onewayscreen from './onewayscreen';
import Roundtripscreen from './roundtripscreen';
const { height, width } = Dimensions.get('window')
const Bokkingscreen = ({ navigation }) => {
    const [firsttabbuttonstate, setTabstate] = useState(false);
    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#0B655A' }}>
            <StatusBar backgroundColor={"#0B655A"} />
            <View style={styles.mapview}>
                <ImageBackground source={require('../assets/images/mapbackgroundimg.png')}
                    style={styles.imagebackgroundstyle}>
                    <View style={styles.bookyourtriptextview}>
                        <Text style={styles.bookyourtriptext}>Book your{"\n"}Flight</Text>
                    </View>
                    <View style={styles.tanbuttonmainview}>
                        <View style={styles.roundtriptextview}>
                            <TouchableOpacity onPress={() => setTabstate(!firsttabbuttonstate)}
                                style={{ justifyContent: 'center' }}>
                                <Text style={[firsttabbuttonstate ? styles.tabbuttonfocustext : styles.tabbuttonnormaltext]}>Round Trip</Text>
                                <Text style={{ width: height / 25, height: 5, marginTop: 10, borderRadius: 10, backgroundColor: firsttabbuttonstate ? '#FFFFFF' : null, marginLeft: 30, }}></Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setTabstate(!firsttabbuttonstate)}
                                style={{ justifyContent: 'center' }}>
                                <Text style={[!firsttabbuttonstate ? styles.secondtabfocustext : styles.secondtabnormaltext]}>One-Way</Text>
                                <Text style={{ width: height / 25, height: 5, backgroundColor: !firsttabbuttonstate ? '#FFFFFF' : null, marginTop: 10, borderRadius: 50 }}></Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </View>
            <View style={styles.detailsview}>
                {!firsttabbuttonstate ?
                    <Onewayscreen navigation={navigation} /> :
                    <Roundtripscreen />}
            </View>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    mapview: {
        height: height / 100 * 32, justifyContent: 'center', alignItems: 'center',
    },
    detailsview: {
        height: height / 100 * 69, backgroundColor: '#F5F5F5', borderTopLeftRadius: width / 10,
        borderTopRightRadius: width / 10
    },
    imagebackgroundstyle: {
        height: '100%', width: '100%', resizeMode: 'contain'
    },
    bookyourtriptextview: {
        flex: 7, justifyContent: "center", paddingHorizontal: 20
    },
    bookyourtriptext: {
        fontSize: height / 28, color: "#F8F6E7", fontFamily: 'WorkSans-Medium'
    },
    tanbuttonmainview: {
        flex: 3, flexDirection: "row", alignItems: "center"
    },
    roundtriptextview: {
        flex: 0.6, flexDirection: 'row'
    },
    tabbuttonnormaltext: {
        paddingHorizontal: 30, color: '#B2C7C5', fontSize: height / 52,fontFamily: 'WorkSans-SemiBold'
    },
    tabbuttonfocustext: {
        paddingHorizontal: 30, color: '#FFFFFF', fontSize: height / 52,fontFamily: 'WorkSans-SemiBold'
    },
    secondtabnormaltext: {
        color: '#B2C7C5', fontSize: height / 52,fontFamily: 'WorkSans-SemiBold'
    },
    secondtabfocustext: {
        color: '#FFFFFF', fontSize: height / 52,fontFamily: 'WorkSans-SemiBold'
    }
})
export default Bokkingscreen;