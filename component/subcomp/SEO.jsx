// import React from 'react';
// import {StyleSheet, Text, View} from 'react-native';
// import {SafeAreaView} from 'react-native-safe-area-context';

// const SEO = () => {
//   return (
//     <>
//       <SafeAreaView style={styles.container2}>
//         <View>
//           <Text>sepo</Text>
//         </View>
//       </SafeAreaView>
//     </>
//   );
// };
// const styles = StyleSheet.create({
//   container2: {
//     height: 500,
//   },
// });
// export default SEO;

import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {setServiceCharge} from '../../redux/action/serviceSlice';
// import {
//   setStoredData,
//   getStoredData,
//   clearLocalStorageOnRefresh,
// } from '../../utils/storageUtils';

import {SafeAreaView} from 'react-native-safe-area-context';
import {Picker} from '@react-native-picker/picker';

import tw from 'twrnc';
const {width, height} = Dimensions.get('window');

const CustomInput = ({value, OnChange}) => {
  const handleDecrement = () => {
    OnChange(value > 0 ? value - 1 : 0);
  };

  const handleIncrement = () => {
    OnChange(value + 1);
  };

  return (
    <View style={styles.inputContainer}>
      <TouchableOpacity onPress={handleDecrement} style={styles.button}>
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={String(value)}
        onChangeText={text => OnChange(Number(text))}
      />
      <TouchableOpacity onPress={handleIncrement} style={styles.button}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const SEO = ({nextService, handleNextService}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const serviceCharges = useSelector(state => state.services.serviceCharges);
  const [isDropdownActive, setIsDropdownActive] = useState(false);

  const chargeNames = [
    'Technical SEO Consulting',
    'Consulting',
    'Meta Data Optimization',
    'App Store Optimization',
    'Local Optimization',
  ];

  const getInitialCharges = () => {
    // const savedCharges = getStoredData('SEO');
    // if (savedCharges) {
    //   return savedCharges;
    // } else {
    return chargeNames.reduce((acc, name) => {
      acc[name] = serviceCharges[name] || 0;
      return acc;
    }, {});
    // }
  };

  const [charges, setCharges] = useState(getInitialCharges);
  const [dropdownValue, setDropdownValue] = useState(0);

  // useEffect(() => {
  //   clearLocalStorageOnRefresh();

  //   const handleRefresh = () => {
  //     setCharges(
  //       chargeNames.reduce((acc, name) => {
  //         acc[name] = 0;
  //         return acc;
  //       }, {}),
  //     );
  //   };

  //   return () => {
  //     handleRefresh();
  //   };
  // }, []);

  // useEffect(() => {
  //   setStoredData('SEO', charges);
  // }, [charges]);

  const handleDropdownChange = value => {
    setDropdownValue(value);

    const updatedCharges = {...charges};

    const chargesToStore = Object.fromEntries(
      Object.entries(updatedCharges).filter(([_, amount]) => amount),
    );

    const serviceTotal = Object.values(updatedCharges).reduce(
      (sum, hours) => sum + hours * 150,
      0,
    );

    setCharges(updatedCharges);
    dispatch(
      setServiceCharge({
        serviceId: '3',
        charges: chargesToStore,
        ServiceName: 'SEO',
        totalCharges: value * 150,
      }),
    );
  };

  const handleChargeChange = (platform, value) => {
    const updatedCharges = {...charges, [platform]: Number(value)};

    const chargesToStore = Object.fromEntries(
      Object.entries(updatedCharges).filter(([_, amount]) => amount),
    );

    const serviceTotal = Object.values(updatedCharges).reduce(
      (sum, hours) => sum + hours * 150,
      0,
    );

    setCharges(updatedCharges);
    dispatch(
      setServiceCharge({
        serviceId: '3',
        charges: chargesToStore,
        ServiceName: 'SEO',
        totalCharges: serviceTotal,
      }),
    );
  };

  const handleNext = () => {
    // if (nextService) {
    //   navigation.navigate('ServiceDetails', {service: nextService});
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
    ? dropdownValue * 150
    : Object.values(charges).reduce(
        (acc, charge) => acc + Number(charge) * 150,
        0,
      );

  return (
    <SafeAreaView style={tw`h-[${height}px] bg-white `}>
      <View style={tw`p-4 bg flex-1 max-w-lg mx-auto`}>
        <Text style={tw`text-2xl font-bold mb-4`}>
          Search Engine Optimization - Add hours
        </Text>

        <View style={tw`flex-row items-center mb-4`}>
          <TouchableOpacity
            onPress={() => setIsDropdownActive(prev => !prev)}
            style={tw`w-10 h-5 rounded-full p-0.5 justify-center ${
              isDropdownActive ? 'bg-[#013958]' : 'bg-gray-400'
            }`}>
            <View
              style={tw`w-4 h-4 rounded-full bg-white ${
                isDropdownActive ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </TouchableOpacity>
          <Text style={tw`ml-2`}>I’m not sure about the hours</Text>
        </View>

        {!isDropdownActive ? (
          <View>
            {chargeNames.map(platform => (
              <View
                key={platform}
                style={tw`flex-row justify-between items-center my-2`}>
                <Text style={tw`text-lg`}>{platform}</Text>
                <CustomInput
                  value={charges[platform]}
                  // onChange={value => handleChargeChange(platform, value)}
                  OnChange={value => handleChargeChange(platform, value)}
                />
              </View>
            ))}
          </View>
        ) : (
          <View style={tw`my-4`}>
            <Text style={tw`text-lg mb-2`}>What’s your website size? *</Text>
            <Picker
              selectedValue={dropdownValue}
              onValueChange={handleDropdownChange}
              style={tw`bg-white rounded-lg`}>
              <Picker.Item label="select pages" value="0" />
              <Picker.Item label="1-50 Pages" value="10" />
              <Picker.Item label="51-1000 pages" value="15" />
              <Picker.Item label="1001-10000 pages" value="20" />
              <Picker.Item label="10001-100000 pages" value="25" />
              <Picker.Item label="100001+" value="30" />
            </Picker>
          </View>
        )}

        <View style={tw`flex-row justify-between my-4`}>
          <Text style={tw`text-lg`}>Total hours required</Text>
          <Text style={tw`text-lg`}>
            {isDropdownActive
              ? dropdownValue
              : Object.values(charges).reduce(
                  (acc, charge) => acc + Number(charge),
                  0,
                )}
          </Text>
        </View>

        <View style={tw`flex-row justify-between my-4`}>
          <Text style={tw`text-xl font-bold`}>Total Cost</Text>
          <Text style={tw`text-xl font-bold`}>
            ${totalCost.toLocaleString()}
          </Text>
        </View>

        <View style={tw`flex-row justify-between mt-4`}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={tw`px-3 py-3 bg-gray-400 rounded-lg`}>
            <Text style={tw`text-gray-800`}>Go back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleNext}
            style={tw`px-3 py-3 bg-[#013958] rounded-lg`}>
            <Text style={tw`text-white`}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SEO;

const styles = StyleSheet.create({
  container2: {
    height: 500,
    backgroundColor: '#fff',
  },
  container3: {
    height: 500,
    backgroundColor: '#fff',
  },
  container: {padding: 16, backgroundColor: '#f9f9f9'},
  title: {fontSize: 24, fontWeight: 'bold', marginBottom: 16},
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  switch: {
    width: 40,
    height: 20,
    borderRadius: 10,
    padding: 2,
    justifyContent: 'center',
  },
  switchCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  switchLabel: {marginLeft: 10},
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  platformText: {fontSize: 16},
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: 100,
  },
  button: {paddingHorizontal: 12, justifyContent: 'center'},
  buttonText: {fontSize: 20, fontWeight: 'bold'},
  input: {flex: 1, padding: 10, textAlign: 'center'},
  dropdownContainer: {marginVertical: 16},
  dropdownLabel: {fontSize: 16, marginBottom: 8},
  picker: {backgroundColor: '#fff', borderRadius: 5},
  costContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  totalText: {fontSize: 18},
  costTitle: {fontSize: 20, fontWeight: 'bold'},
  costAmount: {fontSize: 20, fontWeight: 'bold'},
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  backButton: {padding: 12, backgroundColor: '#ccc', borderRadius: 5},
  backButtonText: {color: '#333'},
  nextButton: {padding: 12, backgroundColor: '#013958', borderRadius: 5},
  nextButtonText: {color: '#fff'},
});
