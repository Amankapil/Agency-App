import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {
  setServiceCharge,
  setTotalCharges,
} from '../../redux/action/serviceSlice';
import {SafeAreaView} from 'react-native-safe-area-context';
import tw from 'twrnc';

// import AsyncStorage from '@react-native-async-storage/async-storage';

const PaidSocial = ({nextService, handleNextService}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const serviceCharges = useSelector(state => state.services.serviceCharges);

  const chargeNames = [
    'Meta (FB and/or Insta)',
    'TikTok',
    'Reddit',
    'X (Twitter)',
    'Snapchat',
    'LinkedIn',
  ];

  const getInitialCharges = async () => {
    // const savedCharges = await AsyncStorage.getItem('paidSocialCharges');
    // if (savedCharges) {
    //   return JSON.parse(savedCharges);
    // } else {
    return chargeNames.reduce((acc, name) => {
      acc[name] = serviceCharges[name] || '';
      return acc;
    }, {});
    // }
  };

  const [charges, setCharges] = useState({});
  const [error, setError] = useState(false);

  // useEffect(() => {
  //   (async () => {
  //     const initialCharges = await getInitialCharges();
  //     setCharges(initialCharges);
  //   })();

  //   // const clearStorageOnExit = () => AsyncStorage.clear();
  //   // navigation.addListener('blur', clearStorageOnExit);
  //   // return () => navigation.removeListener('blur', clearStorageOnExit);
  // }, []);

  // useEffect(() => {
  //   AsyncStorage.setItem('paidSocialCharges', JSON.stringify(charges));
  // }, [charges]);

  const totalCharge = Object.values(charges).reduce(
    (acc, charge) => acc + (Number(charge) || 0),
    0,
  );

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

  const rangeDetails = getRangeDetails(totalCharge);
  let overallCost, baseManagementFee, adRunningFeePercentage;

  if (rangeDetails) {
    if (rangeDetails.paidAdsOrSocial !== 'Custom Quote') {
      const percentageFee = totalCharge * rangeDetails.percentage;
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

  const finalPercent = (adRunningFeePercentage / 100) * totalCharge;
  // const handleChargeChange = (platform, value) => {
  //   if (value < 1000) setError(true);
  //   else setError(false);

  //   setCharges(prev => ({...prev, [platform]: value}));
  //   // dispatch(setTotalCharges(overallCost));
  // };
  const [data, setData] = useState();
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

  const tosend = Number(overallCost);
  const handleNext = () => {
    dispatch(
      setServiceCharge({
        serviceId: '1',
        charges: data,
        ServiceName: 'Paid Social',
        totalCharges: tosend,
      }),
    );
    // if (nextService) {
    //   navigation.navigate('ServiceScreen', {service: nextService});
    // } else {
    //   navigation.navigate('summary');
    // }

    if (nextService) {
      handleNextService();
      console.log(handleNextService);
      // navigation.navigate('ServiceScreen', {id: nextService});
    } else {
      navigation.navigate('summary'); // Go back if no more services are left
    }
  };

  const {width, height} = Dimensions.get('window');

  const renderPlatform = ({item: platform}) => (
    <View style={{flexDirection: 'row', marginBottom: 12}}>
      <Text style={{flex: 1, fontSize: 18}}>{platform}</Text>
      <TextInput
        style={{borderWidth: 1, padding: 8, flex: 0.5}}
        placeholder="100"
        value={charges[platform] ? String(charges[platform]) : ''}
        keyboardType="numeric"
        onChangeText={value => handleChargeChange(platform, value)}
      />
    </View>
  );

  return (
    <SafeAreaView style={tw`flex h-[${height}px] pt-20 mx-sm:pt-0 bg-white`}>
      <View style={tw`p-4  max-w-xl mx-auto`}>
        <Text style={tw`text-2xl font-bold mb-4`}>
          Paid Social - Add average monthly budget
        </Text>

        <FlatList
          data={chargeNames}
          renderItem={renderPlatform}
          keyExtractor={item => item}
        />

        {error && (
          <Text style={tw`text-red-600`}>
            Budget should be greater than $1000
          </Text>
        )}

        <View style={tw`flex-row justify-between my-4`}>
          <Text style={tw`text-base`}>Base Management Fee</Text>
          <Text style={tw`text-base`}>
            {baseManagementFee !== 'Custom Quote'
              ? `$${baseManagementFee}`
              : baseManagementFee}
          </Text>
        </View>

        <View style={tw`flex-row justify-between my-4`}>
          <Text style={tw`text-base`}>Ad Running Fee</Text>
          <Text style={tw`text-base`}>${finalPercent.toFixed(2)}</Text>
        </View>

        <View style={tw`flex-row justify-between my-4`}>
          <Text style={tw`text-xl font-bold`}>Total</Text>
          <Text style={tw`text-xl font-bold`}>
            ${(Number(baseManagementFee) + finalPercent).toFixed(2)}
          </Text>
        </View>

        <View style={tw`flex-row justify-between mt-4`}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={tw`bg-white border border-blue-800 px-4 py-3 rounded`}>
            <Text style={tw`text-blue-800`}>Go back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleNext}
            style={tw`bg-blue-600 px-4 py-3 rounded`}>
            <Text style={tw`text-white`}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = {
  container2: {
    height: 1000,
    backgroundColor: '#fff',
  },
  backButton: {
    backgroundColor: '#fff',
    borderColor: '#006296',
    borderWidth: 2,
    padding: 12,
    borderRadius: 5,
  },
  nextButton: {
    backgroundColor: '#009FF5',
    padding: 12,
    borderRadius: 5,
  },
};

export default PaidSocial;
