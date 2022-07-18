import React, { useEffect, useState } from 'react';
import { Text, View, Image, Dimensions, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import CityData from '../jsonfile/airports.json'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import PeopleIcon from 'react-native-vector-icons/dist/Ionicons';
import SuitcaseIcon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { fontstyles } from '../utlis/styles';
const { height, width } = Dimensions.get('window')
const Onewayscreen = ({ navigation }) => {
  const [fromvalue, setFrom] = useState();
  const [tovalue, setTO] = useState();
  const [Shortforminfrom, setShort] = useState([]);
  const [Shortforminto, setShortto] = useState([]);
  const [mydate, setDate] = useState('')
  const [mydate2, setDate2] = useState('')
  const [showdatepicker, setDatepicker] = useState(false)
  const [showdatepicker2, setDatepicker2] = useState(false)
  const [tabbutton, setTab] = useState('economy')
  const frominput = (text) => {
    setFrom(text)
    var capital = text.charAt(0).toUpperCase() + text.slice(1)
    if (text.length >= 3) {
      var res = CityData.airports.filter((e) => {
        return e.city_name == capital ? e : null
      })
      setShort(res)
    }
  }
  const toinput = (text) => {
    setTO(text)
    var capital = text.charAt(0).toUpperCase() + text.slice(1)
    if (text.length > 4) {
      var res = CityData.airports.filter((e) => {
        return e.city_name == capital ? e : null
      })
      setShortto(res)
    }
  }
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.fromtotextview}>
        <View style={styles.fromtextview}>
          <Text style={[styles.fromtext, fontstyles.mini]}>FROM</Text>
          <Text style={styles.cityshortformfromtext}>{Shortforminfrom.length ? Shortforminfrom[0].IATA_code : "GCK"}</Text>
        </View>
        <View style={styles.planeiconview}>
          <Image source={require('../assets/images/flightimage.png')}
            style={styles.planestyle}
          />
        </View>
        <View style={styles.totextview}>
          <Text style={[styles.totext, fontstyles.mini]}>TO</Text>
          <Text style={styles.cityshortformtotext}>{Shortforminto.length ? Shortforminto[0].IATA_code : "GCK"}</Text>
        </View>
      </View>
      <View style={styles.fromtotextinputview}>
        <View style={styles.fromtextinputview}>
          <TextInput
            onChangeText={(text) => frominput(text)}
            placeholder='Enter City'
            style={[styles.fromtotextinput, fontstyles.mini, { width: '80%' }]}
          />
        </View>
        <View style={{ flex: 0.2 }}></View>
        <View style={styles.totextinputview}>
          <TextInput
            onChangeText={(text) => toinput(text)}
            placeholder='Enter City'
            style={[styles.fromtotextinput, { width: '80%' }, fontstyles.mini]}
          />
        </View>
      </View>
      <View style={styles.departview}>
        <View style={styles.fromdatepickerview}>
          <Text style={[styles.departtext, fontstyles.mini]}>DEPART</Text>
          <View style={{ flexDirection: 'row', marginBottom: 5 }}>
            <TouchableOpacity onPress={() => setDatepicker(!showdatepicker)}>
              <Icon name="calendar" size={height / 40} color="#2B4240" />
            </TouchableOpacity>
            <Text style={[{ marginLeft: 8, color: '#2B4240' }, fontstyles.mini]}>{mydate == "" ? "Select" : mydate}</Text>
            {showdatepicker && (
              <DateTimePicker
                minimumDate={new Date()}
                testID="dateTimePicker"
                value={new Date()}
                mode={"date"}
                is24Hour={true}
                onChange={(event, selectedDate) => {
                  setDatepicker(false)
                  let formattedDate = selectedDate.getFullYear() + "-" + (selectedDate.getMonth() + 1) + "-" + selectedDate.getDate()
                  const [year, month, day] = formattedDate.split('-');
                  let newDate = `${day}/${month}/${year}`
                  setDate(newDate)
                }
                }
              />
            )}
          </View>
        </View>
        <View style={styles.returndatepickerview}>
          <TouchableOpacity style={{ marginBottom: 5 }}
            onPress={() => setDatepicker2(!showdatepicker2)}>
            <Icon name="calendar" size={height / 40} color={mydate2 ? "#2B4240" : '#B2C7C5'} />
          </TouchableOpacity>
          <Text style={[{ marginLeft: 8, fontSize: height / 52, color: mydate2 ? "#2B4240" : '#B2C7C5', }, fontstyles.mini]}>{mydate2 == "" ? "Return" : mydate2}</Text>
          {showdatepicker2 && (
            <DateTimePicker
              minimumDate={new Date()}
              testID="dateTimePicker"
              value={new Date()}
              mode={"date"}
              is24Hour={true}
              onChange={(event, selectedDate) => {
                setDatepicker2(false)
                let formattedDate = selectedDate.getFullYear() + "-" + (selectedDate.getMonth() + 1) + "-" + selectedDate.getDate()
                const [year, month, day] = formattedDate.split('-');
                let newDate = `${day}/${month}/${year}`
                setDate2(newDate)
              }
              }
            />
          )}
        </View>
      </View>
      <View style={styles.passangerluggageview}>
        <View style={styles.passangerluggagetextview}>
          <Text style={[styles.passangerluggagetext, fontstyles.mini]}>PASSENGER & LUGGAGE</Text>
        </View>
        <View style={styles.passangerandluggageinputview}>
          <View style={styles.passangerview}>
            <View style={{ justifyContent: 'center' }}>
              <PeopleIcon name='people' size={height / 35} style={{ color: '#2B4240' }} />
            </View>
            <TextInput
              style={[{ marginLeft: 10, }, fontstyles.mini]}
              placeholder='1'
              keyboardType='numeric'
              maxLength={2}
            />
          </View>
          <View style={styles.luggageview}>
            <View style={{ justifyContent: 'center' }}>
              <SuitcaseIcon name='bag-suitcase' size={height / 35} style={{ color: '#2B4240' }} />
            </View>
            <TextInput
              style={[{ marginLeft: 10, color: '#2B4240', }, fontstyles.mini]}
              placeholder='1'
              keyboardType='numeric'
              maxLength={3}
            />
            <View style={{ justifyContent: 'center' }}>
              <Text style={[{ color: '#2B4240' }, fontstyles.mini]}>KGs</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.selectclassview}>
        <View style={styles.classtextview}>
          <Text style={[styles.classtext, fontstyles.mini]}>CLASS</Text>
        </View>
        <View style={styles.classtabview}>
          <TouchableOpacity style={styles.economybutton}
            onPress={() => setTab('economy')}>
            <Text style={[tabbutton == 'economy' ? styles.focusbuttontextstyle : styles.normalbuttontextstyle, fontstyles.small]}>Economy</Text>
            {tabbutton == 'economy' ?
              <Text style={styles.bottombarstyle}>
              </Text> :
              <Text style={styles.bottombarnormalstyle}>
              </Text>
            }
          </TouchableOpacity>
          <Text style={styles.centerverticallinestyle}></Text>
          <TouchableOpacity style={styles.bussinessandelitebutton}
            onPress={() => setTab('bussiness')}>
            <Text style={[tabbutton == 'bussiness' ? styles.focusbuttontextstyle : styles.normalbuttontextstyle, fontstyles.small]}>Bussiness</Text>
            {tabbutton == 'bussiness' ?
              <Text style={styles.bottombarstyle}>
              </Text> :
              <Text style={styles.bottombarnormalstyle}>
              </Text>
            }
          </TouchableOpacity>
          <Text style={styles.centerverticallinestyle}></Text>
          <TouchableOpacity style={styles.bussinessandelitebutton}
            onPress={() => setTab('elite')}>
            <Text style={[tabbutton == 'elite' ? styles.focusbuttontextstyle : styles.normalbuttontextstyle, fontstyles.small]}>Elite</Text>
            {tabbutton == 'elite' ?
              <Text style={styles.bottombarstyle}>
              </Text> :
              <Text style={styles.bottombarnormalstyle}>
              </Text>
            }
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.seatselectionbuttonview}>
        <TouchableOpacity onPress={() => navigation.navigate('Detailscreen', { fromvalue, tovalue, Shortforminfrom, Shortforminto })}
          style={styles.seatselectionbuttonstyle}>
          <Text style={[styles.seatselectiontext, fontstyles.small]}>Seat Selection</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  fromtotextview: {
    flex: 0.18,
    alignItems: 'flex-end',

    flexDirection: 'row'
  },
  fromtextview: {
    flex: 0.4,
    justifyContent: 'center'
  },
  planeiconview: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  totextview: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  fromtext: {
    color: '#B2C7C5',
    paddingHorizontal: height / 30,
  },
  cityshortformfromtext: {
    color: '#0B655A',
    paddingHorizontal: height / 32,
    fontSize: height / 30,
    marginTop: 10
  },
  planestyle: {
    height: '50%',
    width: '50%',
    resizeMode: 'contain'
  },
  totext: {
    color: '#B2C7C5',
    fontSize: width / 30,
    marginRight: height / 30
  },
  cityshortformtotext: {
    color: '#0B655A',
    fontSize: height / 30,
    marginTop: 10,
    marginRight: height / 30
  },
  fromtotextinputview: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  fromtextinputview: {
    flex: 0.4,
    paddingHorizontal: height / 30
  },
  totextinputview: {
    alignItems: 'flex-end',
    flex: 0.4,
    paddingRight: height / 30
  },
  fromtotextinput: {
    borderBottomWidth: 1,
    borderColor: '#B2C7C5'
  },
  departview: {
    flex: 0.15,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  },
  fromdatepickerview: {
    borderBottomWidth: 1,
    borderColor: '#B2C7C5',
    marginHorizontal: height / 30
  },
  returndatepickerview: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    marginRight: height / 30,
    borderColor: '#B2C7C5'
  },
  departtext: {
    paddingBottom: height / 45,
    fontSize: height / 58,
    color: '#B2C7C5'
  },
  passangerluggageview: {
    flex: 0.2
  },
  passangerluggagetextview: {
    flex: 0.45, justifyContent: 'flex-end'
  },
  passangerluggagetext: {
    paddingHorizontal: height / 30, color: '#B2C7C5', fontSize: height / 58
  },
  passangerandluggageinputview: {
    flex: 0.55, flexDirection: 'row', alignItems: 'flex-end'
  },
  passangerview: {
    flexDirection: 'row', borderBottomWidth: 1, borderColor: '#B2C7C5', paddingRight: height / 50, marginLeft: height / 30
  },
  luggageview: {
    flexDirection: 'row', borderBottomWidth: 1, borderColor: '#B2C7C5', paddingRight: height / 50, marginLeft: height / 30,

  },
  selectclassview: {
    flex: 0.2
  },
  classtextview: {
    flex: 0.45, justifyContent: 'flex-end'
  },
  classtext: {
    paddingHorizontal: height / 30, color: '#B2C7C5', fontSize: height / 58
  },
  classtabview: {
    flex: 0.55, flexDirection: 'row', alignItems: 'center'
  },
  economybutton: {
    marginLeft: height / 30,
  },
  bussinessandelitebutton: {
    marginLeft: 15,
  },
  centerverticallinestyle: {
    marginLeft: 10, height: 20, width: 1, backgroundColor: '#B2C7C5'
  },
  normalbuttontextstyle: {
    marginBottom: 5, fontSize: height / 52, color: '#B2C7C5'
  },
  focusbuttontextstyle: {
    marginBottom: 5, fontSize: height / 52, color: '#2B4240'
  },
  seatselectionbuttonview: {
    flex: 0.17, justifyContent: 'center', alignItems: 'center'
  },
  seatselectionbuttonstyle: {
    height: height / 15, width: width - height / 13, backgroundColor: '#FF8A63',
    justifyContent: 'center', alignItems: 'center', borderRadius: height / 45
  },
  seatselectiontext: {
    color: '#F8F6E7'
  },
  bottombarstyle: {
    backgroundColor: '#2B4240', height: 4, width: height / 25, borderRadius: 50
  },
  bottombarnormalstyle: {
    height: 4, width: height / 25, borderRadius: 50
  }
})
export default React.memo(Onewayscreen);