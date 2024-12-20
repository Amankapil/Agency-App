// import React from 'react';
// import {StyleSheet, Text, View} from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

// const DigitalPR = () => {
//   return (
//     <>
//       <SafeAreaView style={styles.container2}>
//         <View>
//           <Text>Digital pr</Text>
//         </View>
//       </SafeAreaView>
//     </>
//   );
// };
// const styles = StyleSheet.create({
//   container2: {
//     height: 900,
//     backgroundColor: '#FFF',
//   },
// });
// export default DigitalPR;

// src/components/services/DigitalPR.js
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {setServiceCharge} from '../../redux/action/serviceSlice';
import {SafeAreaView} from 'react-native-safe-area-context';

import tw from 'twrnc';
const {width, height} = Dimensions.get('window');

const CustomInput = ({value, OnChange}) => {
  const handleIncrement = () => OnChange(value + 1);
  const handleDecrement = () => OnChange(value > 0 ? value - 1 : 0);

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        padding: 5,
      }}>
      <TouchableOpacity
        onPress={handleDecrement}
        style={{padding: 10, borderRightWidth: 1}}>
        <Text style={{fontSize: 20}}>-</Text>
      </TouchableOpacity>
      <TextInput
        style={{flex: 1, textAlign: 'center', fontSize: 16}}
        keyboardType="numeric"
        value={String(value)}
        onChangeText={text => OnChange(Number(text))}
        placeholder="100"
      />
      <TouchableOpacity
        onPress={handleIncrement}
        style={{padding: 10, borderLeftWidth: 1}}>
        <Text style={{fontSize: 20}}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const DigitalPR = ({nextService, handleNextService}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const serviceCharges = useSelector(state => state.services.serviceCharges);
  const [charges, setCharges] = useState({
    Backlinks: serviceCharges['Backlinks'] || 0,
  });
  const [isDropdownActive, setIsDropdownActive] = useState(false);

  const handleChargeChange = (platform, value) => {
    const updatedCharges = {...charges, [platform]: Number(value)};

    const chargesToStore = Object.fromEntries(
      Object.entries(updatedCharges).filter(([_, amount]) => amount),
    );

    const serviceTotal = isDropdownActive
      ? Object.entries(updatedCharges).reduce(
          (sum, [name, value]) => sum + Number(value) * 500,
          0,
        )
      : Object.entries(updatedCharges).reduce(
          (sum, [name, hours]) => sum + hours * 100,
          0,
        );

    setCharges(updatedCharges);
    dispatch(
      setServiceCharge({
        serviceId: '5',
        charges: chargesToStore,
        ServiceName: 'Digital PR',
        totalCharges: serviceTotal,
      }),
    );
  };

  const handleNext = () => {
    // if (nextService) {
    //   navigation.navigate('ServiceDetail', {service: nextService});
    // } else {
    //   navigation.navigate('Summary');
    // }
    if (nextService) {
      handleNextService();
      //  console.log(handleNextService);
      // navigation.navigate('ServiceScreen', {id: nextService});
    } else {
      navigation.navigate('summary'); // Go back if no more services are left
    }
  };

  const totalCost = isDropdownActive
    ? Object.entries(charges).reduce(
        (acc, [platform, charge]) => acc + Number(charge) * 500,
        0,
      )
    : Object.entries(charges).reduce(
        (acc, [platform, charge]) => acc + Number(charge) * 100,
        0,
      );

  return (
    <SafeAreaView style={tw`h-[${height}px] bg-white `}>
      <ScrollView
        style={tw`p-4 bg flex-1 max-w-lg mx-auto`}
        contentContainerStyle={{padding: 20}}>
        <Text style={{fontSize: 24, fontWeight: 'bold', marginBottom: 10}}>
          Digital PR - Add average monthly budget
        </Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 20,
          }}>
          <Text style={{marginRight: 10}}>Calculate by hours spent</Text>
          <TouchableOpacity
            onPress={() => setIsDropdownActive(prev => !prev)}
            style={{
              width: 50,
              height: 25,
              backgroundColor: isDropdownActive ? '#013958' : '#ccc',
              borderRadius: 15,
              padding: 5,
              justifyContent: 'center',
            }}>
            <View
              style={{
                backgroundColor: '#fff',
                width: 20,
                height: 20,
                borderRadius: 10,
                alignSelf: isDropdownActive ? 'flex-end' : 'flex-start',
              }}
            />
          </TouchableOpacity>
        </View>

        <View style={{marginBottom: 20}}>
          <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>
            Platforms
          </Text>
          {Object.keys(charges).map(platform => (
            <View
              key={platform}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 15,
              }}>
              <Text style={{flex: 1, fontSize: 16}}>{platform}</Text>
              {isDropdownActive ? (
                <CustomInput
                  value={charges[platform]}
                  OnChange={value => handleChargeChange(platform, value)}
                />
              ) : (
                <TextInput
                  style={{
                    borderWidth: 1,
                    padding: 8,
                    width: 80,
                    textAlign: 'center',
                    marginLeft: 10,
                  }}
                  keyboardType="numeric"
                  value={String(charges[platform])}
                  onChangeText={text =>
                    handleChargeChange(platform, Number(text))
                  }
                  placeholder="100"
                />
              )}
            </View>
          ))}
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 20,
          }}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>Total cost</Text>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>
            ${totalCost.toLocaleString()}
          </Text>
        </View>

        <View style={{flexDirection: 'row', gap: 10}}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              backgroundColor: '#fff',
              borderColor: '#006296',
              borderWidth: 2,
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 5,
            }}>
            <Text style={{color: '#006296'}}>Go back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleNext}
            style={{
              backgroundColor: '#009FF5',
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 5,
            }}>
            <Text style={{color: '#fff'}}>Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container2: {
    height: 500,
    backgroundColor: '#fff',
  },
});
export default DigitalPR;
