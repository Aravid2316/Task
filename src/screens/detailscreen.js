import React, { useState, useEffect } from 'react';
import { Text, View, Dimensions, ImageBackground, Image, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import Seatscreen from './seatscreen';
import { useSelector, useDispatch } from 'react-redux';
import { Selectedseats } from '../redux/action';
import Axios from 'axios';
import { fontstyles } from '../utlis/styles';

const { height, width } = Dimensions.get('window')
const Detailscreen = (props) => {
  const dispatch = useDispatch()
  var fromcity = props.route.params.fromvalue;
  var tocity = props.route.params.tovalue;
  var fromcitycapitalletter = fromcity ? fromcity.charAt(0).toUpperCase() + fromcity.slice(1) : ''
  var tocitycapitalletter = tocity ? tocity.charAt(0).toUpperCase() + tocity.slice(1) : ''
  var fromcityshortform = props.route.params.Shortforminfrom;
  var tocityshortform = props.route.params.Shortforminto;
  const [Data, setdata] = useState([]);
  useEffect(() => {
    getdatafunction()
  }, []);
  const getdatafunction = () => {
    Axios.get('https://62d2b72eafb0b03fc5aa4ff8.mockapi.io/seats')
      .then((res) => {
        setdata(res.data)
      })
      .catch(err => console.log(err))
  }
  const selectedseats = useSelector((state) => { return state.value })
  // console.log(selectedseats);
  const handleseatselection = (event) => {
    setdata(
      Data.map((e) => e.id == event.item.id ? ({ ...e, isopen: !e.isopen }) : ({ ...e, isopen: false }))
    )
    dispatch(Selectedseats(event.item.id))
  }
  return (
    <View style={styles.detailscreenstyle}>
      <View style={styles.flightshapeview}>
        <ImageBackground style={{ height: '100%', width: '96%', }} imageStyle={{ tintColor: 'rgba(246, 242, 206,1)' }}
          resizeMode='stretch' source={require('../assets/images/planeshape.png')}>
          <View style={styles.emiretsview}>
            <Image
              style={styles.emiretsimagestyle}
              source={require('../assets/images/flightlogo.png')}
            />
          </View>
          <View style={styles.flighttimeanddateview}>
            <Text style={styles.dateandtimetext}>DES 19, 8.35 AM</Text>
          </View>
          <View style={styles.economyclassview}>
            <Text style={styles.economyclasstext}>Economy Class</Text>
          </View>
          <View style={styles.seatview}>
            {!Data.length == 0 ?
              <FlatList
                style={{ marginTop: height / 35 }}
                horizontal={false}
                numColumns={4}
                data={Data}
                extraData={Data}
                renderItem={(item) => {
                  return (
                    <Seatscreen
                      height={height / 14}
                      width={height / 19.5}
                      borderWidth={2}
                      occupiedborderColor={'#749A93'}
                      normalborderColor={'#F8F6E7'}
                      borderRadius={5}
                      backgroundColor={'#FF8A63'}
                      onpress={() => handleseatselection(item)}
                      item={item}
                      marginTop={10}
                    />
                  )
                }}
                keyExtractor={item => item.id}
              /> :
              <View style={{ justifyContent: 'center', flex: 1 }}>
                <ActivityIndicator size={'large'} color={'white'} />
              </View>
            }
          </View>
        </ImageBackground>
      </View>
      <View style={styles.passangerdetailview}>
        <View style={styles.fromcityview}>
          <Text style={[styles.fromcityshortformtext, fontstyles.large]}>{fromcityshortform.length ? fromcityshortform[0].IATA_code : 'CGK'}</Text>
          <Text style={[styles.fromcitytext, fontstyles.mini]}>{fromcitycapitalletter.length ? fromcitycapitalletter : 'Chennai'}</Text>
        </View>
        <View style={styles.planeview}>
          <Image source={require('../assets/images/detailsflightimage.png')}
            style={styles.planeimage}
          />
        </View>
        <View style={styles.tocityview}>
          <Text style={[styles.tocityshortformtext, fontstyles.large]}>{tocityshortform.length ? tocityshortform[0].IATA_code : 'IXM'}</Text>
          <Text style={[styles.tocitytext, fontstyles.mini]}>{tocitycapitalletter.length ? tocitycapitalletter : 'Madurai'}</Text>
        </View>
        <View style={styles.flightnumberview}>
          <Text style={[styles.flighttext, fontstyles.smini]}>FLIGHT NO</Text>
          <Text style={[styles.flightnumbertext, fontstyles.mini]}>KB767</Text>
        </View>
        <View style={styles.seatnumberview}>
          <Text style={[styles.seattext, fontstyles.medium]}>{selectedseats ? selectedseats : '02'}</Text>
          <Text style={[styles.seatnumbertext, fontstyles.smini]}>SEAT</Text>
        </View>
        <View style={styles.arrowbuttonview}>
          <TouchableOpacity style={styles.buttonstyle}>
            <Icon name='chevron-right' color={'#F8F6E7'} size={height / 40} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  detailscreenstyle: {
    flex: 1, backgroundColor: '#0B655A', flexDirection: 'row',
  },
  flightshapeview: {
    flex: 0.7, justifyContent: 'flex-end', alignItems: 'flex-end', paddingTop: 20
  },
  passangerdetailview: {
    flex: 0.3
  },
  emiretsview: {
    flex: 0.15, justifyContent: 'flex-end', alignItems: 'center'
  },
  flighttimeanddateview: {
    flex: 0.1, justifyContent: 'center', alignItems: 'center'
  },
  economyclassview: {
    flex: 0.05, justifyContent: 'flex-end', alignItems: 'center'
  },
  seatview: {
    flex: 0.7, alignItems: 'center', marginRight: 8
  },
  emiretsimagestyle: {
    height: '45%', width: '45%', resizeMode: 'contain'
  },
  dateandtimetext: {
    color: '#F8F6E7', fontSize: height / 50
  },
  economyclasstext: {
    color: '#F8F6E7', fontSize: height / 50
  },
  fromcityview: {
    flex: 0.2, justifyContent: 'flex-end', alignItems: 'flex-end'
  },
  fromcityshortformtext: {
    color: '#F8F6E7', marginRight: height / 25, marginBottom: 5
  },
  fromcitytext: {
    color: '#F8F6E7', fontSize: height / 50, marginRight: height / 25
  },
  planeview: {
    flex: 0.2, justifyContent: 'center', alignItems: 'flex-end'
  },
  planeimage: {
    height: '40%', width: '40%', resizeMode: 'contain', marginRight: height / 25, tintColor: '#FFFFFF', marginTop: 10
  },
  tocityview: {
    flex: 0.1, justifyContent: 'flex-end', alignItems: 'flex-end'
  },
  tocityshortformtext: {
    color: '#F8F6E7', fontSize: height / 35, marginRight: height / 25, marginBottom: 5
  },
  tocitytext: {
    color: '#F8F6E7', fontSize: height / 50, marginRight: height / 25
  },
  flightnumberview: {
    flex: 0.15, justifyContent: 'flex-end', alignItems: 'flex-end', paddingRight: height / 25
  },
  flighttext: {
    color: '#B2C7C5', marginBottom: 10,
  },
  flightnumbertext: {
    fontSize: height / 50, color: '#F8F6E7'
  },
  seatnumberview: {
    flex: 0.15, justifyContent: 'flex-end', alignItems: 'flex-end'
  },
  seattext: {
    fontSize: height / 30, color: '#F8F6E7', marginRight: height / 25
  },
  seatnumbertext: {
    fontSize: height / 50, color: '#B2C7C5', marginRight: height / 25
  },
  arrowbuttonview: {
    flex: 0.2, justifyContent: 'center', alignItems: 'center'
  },
  buttonstyle: {
    height: height / 14, width: height / 15, backgroundColor: '#FF8A63', marginBottom: height / 20,
    justifyContent: 'center', alignItems: 'center', borderRadius: 12, marginLeft: height / 30
  }
})
export default Detailscreen;