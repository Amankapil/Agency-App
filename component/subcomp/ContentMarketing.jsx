// import React from 'react'

// const ContentMarketing = () => {
//   return (
//     <div>ContentMarketing</div>
//   )
// }

// export default ContentMarketing

// src/components/services/ContentMarketing.js
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {setServiceCharge} from '../../redux/action/serviceSlice';
import tw from 'twrnc';

// import {
//   setStoredData,
//   getStoredData,
//   clearLocalStorageOnRefresh,
// } from '../../utils/storageUtils';
import {SafeAreaView} from 'react-native-safe-area-context';
const {width, height} = Dimensions.get('window');

const CustomInput = ({value, onChange}) => {
  const handleDecrement = () => {
    onChange(value > 0 ? value - 1 : 0);
  };

  const handleIncrement = () => {
    onChange(value + 1);
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        padding: 5,
        width: 150,
      }}>
      <TouchableOpacity
        onPress={handleDecrement}
        style={{paddingHorizontal: 15}}>
        <Text style={{fontSize: 25}}>-</Text>
      </TouchableOpacity>
      <TextInput
        keyboardType="number-pad"
        style={{textAlign: 'center', width: 50}}
        value={String(value)}
        onChangeText={text => onChange(Number(text))}
      />
      <TouchableOpacity
        onPress={handleIncrement}
        style={{paddingHorizontal: 15}}>
        <Text style={{fontSize: 25}}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const ContentMarketing = ({nextService, handleNextService}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const serviceCharges = useSelector(state => state.services.serviceCharges);
  // const {nextService} = route.params || {};

  const chargeNames = [
    'Blogs',
    'Landing Pages',
    'Product Pages',
    'Category Pages',
    'Local Pages',
    'Other',
  ];

  const getInitialCharges = () => {
    // const savedCharges = getStoredData('ContentMarketing');
    return (
      // savedCharges ||
      chargeNames.reduce((acc, name) => {
        acc[name] = serviceCharges[name] || 0;
        return acc;
      }, {})
    );
  };

  const [charges, setCharges] = useState(getInitialCharges);
  const [isDropdownActive, setIsDropdownActive] = useState(false);

  // useEffect(() => {
  //   clearLocalStorageOnRefresh();
  //   const handleRefresh = () => {
  //     setCharges(chargeNames.reduce((acc, name) => ({...acc, [name]: 0}), {}));
  //   };
  //   navigation.addListener('beforeRemove', handleRefresh);

  //   return () => navigation.removeListener('beforeRemove', handleRefresh);
  // }, [navigation]);

  // useEffect(() => {
  //   setStoredData('ContentMarketing', charges);
  // }, [charges]);

  // const handleChargeChange = (platform, value) => {
  //   const updatedCharges = {...charges, [platform]: value};
  //   const serviceTotal = Object.entries(updatedCharges).reduce(
  //     (acc, [name, amount]) => acc + amount * (name === 'Blogs' ? 400 : 300),
  //     0,
  //   );

  //   setCharges(updatedCharges);
  //   dispatch(
  //     setServiceCharge({
  //       serviceId: '4',
  //       charges: updatedCharges,
  //       ServiceName: 'Content Marketing',
  //       totalCharges: serviceTotal,
  //     }),
  //   );
  // };
  const handleChargeChange = (platform, value) => {
    const updatedValue = isDropdownActive ? value : Number(value);

    const updatedCharges = {...charges, [platform]: updatedValue};

    const chargesToStore = Object.fromEntries(
      Object.entries(updatedCharges).filter(([_, amount]) => amount),
    );

    const serviceTotal = isDropdownActive
      ? Object.entries(updatedCharges).reduce(
          (sum, [name, value]) => sum + Number(value) * 0.33,
          0,
        )
      : Object.entries(updatedCharges).reduce((sum, [name, hours]) => {
          const rate = name === 'Blogs' ? 400 : 300; // Different rate for Blogs
          return sum + hours * rate;
        }, 0);

    setCharges(updatedCharges);
    dispatch(
      setServiceCharge({
        serviceId: '4',
        charges: chargesToStore,
        ServiceName: 'Content Marketing',
        totalCharges: serviceTotal,
      }),
    );
  };
  const handleNext = () => {
    // if (nextService) {
    //   navigation.navigate('ServiceScreen', {service: nextService});
    // } else {
    //   navigation.navigate('Summary');
    // }
    if (nextService) {
      handleNextService();
      console.log(handleNextService);
      // navigation.navigate('ServiceScreen', {id: nextService});
    } else {
      navigation.navigate('summary'); // Go back if no more services are left
    }
  };

  const totalCost = Object.entries(charges).reduce(
    (acc, [platform, charge]) => {
      const rate = platform === 'Blogs' ? 400 : 300;
      return acc + charge * rate;
    },
    0,
  );

  return (
    <SafeAreaView style={tw`h-[${height}px] bg-white `}>
      <View style={tw`p-4 bg flex-1 max-w-xl mx-auto`}>
        <Text style={{fontSize: 28, fontWeight: 'bold', marginBottom: 20}}>
          Content Marketing - Add Deliverables
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 20,
          }}>
          <TouchableOpacity
            onPress={() => setIsDropdownActive(prev => !prev)}
            style={{
              backgroundColor: isDropdownActive ? '#013958' : '#ccc',
              width: 50,
              height: 25,
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: isDropdownActive ? 'flex-end' : 'flex-start',
              padding: 2,
            }}>
            <View
              style={{
                backgroundColor: 'white',
                width: 20,
                height: 20,
                borderRadius: 10,
              }}
            />
          </TouchableOpacity>
          <Text style={{marginLeft: 10}}>
            {isDropdownActive ? 'Word Count' : 'Number of Deliverables'}
          </Text>
        </View>
        {chargeNames.map(platform => (
          <View
            key={platform}
            style={{
              marginBottom: 15,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={{flex: 1, fontSize: 18}}>{platform}</Text>
            <View style={{flex: 1}}>
              {!isDropdownActive ? (
                <CustomInput
                  value={charges[platform]}
                  // onChange={value => handleChargeChange(platform, value)}
                  OnChange={value => handleChargeChange(platform, value)}
                />
              ) : (
                <TextInput
                  keyboardType="number-pad"
                  style={{borderWidth: 1, paddingHorizontal: 10}}
                  value={String(charges[platform])}
                  onChangeText={text =>
                    handleChargeChange(platform, Number(text))
                  }
                />
              )}
            </View>
          </View>
        ))}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 20,
          }}>
          <Text style={{fontSize: 24, fontWeight: 'bold'}}>Total cost</Text>
          <Text style={{fontSize: 24, fontWeight: 'bold'}}>
            ${totalCost.toLocaleString()}
          </Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <Button
            title="Go Back"
            onPress={() => navigation.goBack()}
            color="#006296"
          />
          <Button title="Next" onPress={handleNext} color="#009FF5" />
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container2: {
    height: 500,
    backgroundColor: '#fff',
  },
});
export default ContentMarketing;
