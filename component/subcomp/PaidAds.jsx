// import React from 'react';
// import {StyleSheet} from 'react-native';
// import {SafeAreaView} from 'react-native-safe-area-context';

// const PaidAds = () => {
//   return (
//     <SafeAreaView style={styles.container2}>
//       <div>PaidAds</div>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container2: {
//     height: 500,
//   },
// });
// export default PaidAds;

// src/components/services/PaidAds.js
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {setServiceCharge} from '../../redux/action/serviceSlice';
// import {
//   setStoredData,
//   getStoredData,
//   clearLocalStorageOnRefresh,
// } from '../../utils/storageUtils';
import tw from 'twrnc';

import {SafeAreaView} from 'react-native-safe-area-context';
const {width, height} = Dimensions.get('window');

const PaidAds = ({nextService, handleNextService}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const serviceCharges = useSelector(state => state.services.serviceCharges);

  const chargeNames = [
    'Google Ads',
    'Bing Ads',
    'Facebook Ads',
    'Instagram Ads',
    'LinkedIn Ads',
  ];

  const getInitialCharges = () => {
    // const savedCharges = getStoredData('paidAdsCharges');
    // if (savedCharges) {
    //   return savedCharges;
    // } else {
    return chargeNames.reduce((acc, name) => {
      acc[name] = serviceCharges[name] || '';
      return acc;
    }, {});
    // }
  };

  const [charges, setCharges] = useState(getInitialCharges);
  const [error, setError] = useState(false);

  // useEffect(() => {
  //   // clearLocalStorageOnRefresh();

  //   const handleRefresh = () => {
  //     localStorage.clear();
  //     setCharges(
  //       chargeNames.reduce((acc, name) => {
  //         acc[name] = '';
  //         return acc;
  //       }, {}),
  //     );
  //   };

  //   window.addEventListener('beforeunload', handleRefresh);

  //   return () => {
  //     window.removeEventListener('beforeunload', handleRefresh);
  //   };
  // }, []);

  // useEffect(() => {
  //   setStoredData('paidAdsCharges', charges);
  // }, [charges]);

  const getRangeDetails = total => {
    const ranges = [
      {min: 1, max: 4999, paidAdsOrSocial: 1000, percentage: 0.12},
      {min: 5000, max: 14999, paidAdsOrSocial: 1500, percentage: 0.1},
      {min: 15000, max: 29999, paidAdsOrSocial: 2000, percentage: 0.09},
      {min: 30000, max: 59999, paidAdsOrSocial: 2500, percentage: 0.08},
      {min: 60000, max: 99999, paidAdsOrSocial: 3000, percentage: 0.07},
      {min: 100000, max: 299999, paidAdsOrSocial: 3500, percentage: 0.06},
      {
        min: 300000,
        max: Infinity,
        paidAdsOrSocial: 'Custom Quote',
        percentage: 'Custom Quote',
      },
    ];

    return ranges.find(range => total >= range.min && total <= range.max);
  };

  const totalcosdt = Object.values(charges)
    .reduce((acc, charge) => acc + (Number(charge) || 0), 0)
    .toFixed(2);

  const rangeDetails = getRangeDetails(totalcosdt);

  let overallCost;
  let baseManagementFee;
  let adRunningFeePercentage;

  if (rangeDetails) {
    if (rangeDetails.paidAdsOrSocial !== 'Custom Quote') {
      const percentageFee = totalcosdt * rangeDetails.percentage;
      overallCost = Number(rangeDetails.paidAdsOrSocial) + percentageFee;
      baseManagementFee = rangeDetails.paidAdsOrSocial;
      adRunningFeePercentage = rangeDetails.percentage * 100;
    } else {
      overallCost = 'Custom Quote';
      baseManagementFee = 'Custom Quote';
      adRunningFeePercentage = 'Custom Quote';
    }
  } else {
    overallCost = 0;
    baseManagementFee = 0;
    adRunningFeePercentage = 0;
  }

  const finalpercent = (adRunningFeePercentage / 100).toFixed(2) * totalcosdt;

  const [data, setData] = useState();
  const tosend = Number(overallCost);

  const handleChargeChange = (platform, value) => {
    if (value < 1000) {
      setError(true);
    } else {
      setError(false);
    }
    const updatedCharges = {...charges, [platform]: value};

    const chargesToStore = Object.fromEntries(
      Object.entries(updatedCharges).filter(
        ([_, amount]) => amount.trim() !== '',
      ),
    );
    setData(chargesToStore);

    setCharges(updatedCharges);
  };

  const handleNext = () => {
    dispatch(
      setServiceCharge({
        serviceId: '2',
        charges: data,
        ServiceName: 'Paid Ads',
        totalCharges: tosend,
      }),
    );
    if (nextService) {
      handleNextService();
      console.log(handleNextService);
      // navigation.navigate('ServiceScreen', {id: nextService});
    } else {
      navigation.navigate('summary'); // Go back if no more services are left
    }
  };

  return (
    <SafeAreaView style={tw`h[500px] pt-20 h-[${height}px] bg-white`}>
      <View style={tw`p-4 max-w-lg mx-auto`}>
        <Text style={tw`text-xl font-bold mb-4`}>
          Paid Media - Add average monthly budget test
        </Text>

        {chargeNames.map(platform => (
          <View key={platform} style={tw`flex-row items-center mb-3`}>
            <Text style={tw`flex-1 text-base`}>{platform}</Text>
            <TextInput
              style={tw`w-24 p-2 border border-gray-300 rounded text-center`}
              placeholder="1000"
              keyboardType="numeric"
              value={charges[platform]}
              onChangeText={value => handleChargeChange(platform, value)}
            />
          </View>
        ))}

        <View style={tw`flex-row justify-between mb-2`}>
          <Text style={tw`text-base font-semibold`}>Base Management Fee</Text>
          <Text style={tw`text-base font-semibold`}>
            {baseManagementFee !== 'Custom Quote'
              ? `$${baseManagementFee}`
              : baseManagementFee}
          </Text>
        </View>

        <View style={tw`flex-row justify-between mb-2`}>
          <Text style={tw`text-base font-semibold`}>Ad Running Fee</Text>
          <Text style={tw`text-base font-semibold`}>
            {finalpercent.toLocaleString()}
          </Text>
        </View>

        <View style={tw`flex-row justify-between mt-4 mb-2`}>
          <Text style={tw`text-lg font-bold`}>Total</Text>
          <Text style={tw`text-lg font-bold`}>
            ${Number(baseManagementFee) + Number(finalpercent)}
          </Text>
        </View>

        <View style={tw`flex-row justify-between mt-4`}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={tw`p-3 border border-blue-800 rounded`}>
            <Text style={tw`text-blue-800`}>Go back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleNext}
            style={tw`p-3 bg-blue-600 rounded`}>
            <Text style={tw`text-white`}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PaidAds;
