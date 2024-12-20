import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {setServiceCharge} from '../../redux/action/serviceSlice';
import {SafeAreaView} from 'react-native-safe-area-context';
// import {
//   setStoredData,
//   getStoredData,
//   clearLocalStorageOnRefresh,
// } from '../../utils/storageUtils';

import tw from 'twrnc';
const {width, height} = Dimensions.get('window');

const OrganicSocialMedia = ({nextService, handleNextService}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const serviceCharges = useSelector(state => state.services.serviceCharges);

  const chargeNames = [
    'Facebook',
    'Instagram',
    'TikTok',
    'Reddit',
    'X (Twitter)',
    'Snapchat',
    'LinkedIn',
    'Pinterest',
  ];

  const getInitialCharges = () => {
    // const savedCharges = getStoredData('OrganicSocialMedia');
    // if (savedCharges) {
    //   return savedCharges;
    // } else {
    return chargeNames.reduce((acc, name) => {
      acc[name] = serviceCharges[name] || '';
      return acc;
    }, {});
    // }
  };

  const getInitialCounters = () => {
    // const savedCounters = getStoredData('OrganicSocialMediaCounters');
    // if (savedCounters) {
    //   return savedCounters;
    // } else {
    return chargeNames.reduce((acc, name) => {
      acc[name] = 0;
      return acc;
    }, {});
    // }
  };

  const [charges, setCharges] = useState(getInitialCharges);
  const [counters, setCounters] = useState(getInitialCounters);

  // useEffect(() => {
  //   clearLocalStorageOnRefresh();

  //   const handleRefresh = () => {
  //     setCharges(
  //       chargeNames.reduce((acc, name) => {
  //         acc[name] = '';
  //         return acc;
  //       }, {}),
  //     );
  //     setCounters(
  //       chargeNames.reduce((acc, name) => {
  //         acc[name] = 0;
  //         return acc;
  //       }, {}),
  //     );
  //   };

  //   return () => {
  //     // Equivalent to removing `beforeunload` listener
  //   };
  // }, []);

  // useEffect(() => {
  //   setStoredData('OrganicSocialMedia', charges);
  //   setStoredData('OrganicSocialMediaCounters', counters);
  // }, [charges, counters]);

  const calculatePlatformCost = (platform, postsPerWeek) => {
    const hourlyRate = 150;
    if (!postsPerWeek || postsPerWeek <= 0) return '0.00';

    let hoursPerMonth;
    if (postsPerWeek >= 2) {
      hoursPerMonth =
        platform === 'TikTok' || platform === 'Snapchat'
          ? 3.48 * postsPerWeek
          : 2.61 * postsPerWeek;
    } else {
      hoursPerMonth =
        platform === 'TikTok' || platform === 'Snapchat' ? 5.4375 : 4.35;
    }
    return (hoursPerMonth * hourlyRate).toFixed(2);
  };

  const calculateTotalCounter = () => {
    let totalCost = 0;

    Object.keys(charges).forEach(platform => {
      const postsPerWeek = Number(charges[platform]) || 0;
      const costPerPost = calculatePlatformCost(platform, postsPerWeek);
      totalCost += Number(costPerPost);
    });

    return totalCost.toFixed(2);
  };

  const handleNext = () => {
    // if (nextService) {
    //   navigation.navigate('Service', {service: nextService});
    // } else {
    //   navigation.navigate('Summary');
    // }
    if (nextService) {
      handleNextService();
      // console.log(handleNextService);
      // navigation.navigate('ServiceScreen', {id: nextService});
    } else {
      navigation.navigate('summary'); // Go back if no more services are left
    }
  };

  const handleChargeChange = (platform, value) => {
    const updatedCharges = {...charges, [platform]: value};

    const serviceTotal = Object.keys(updatedCharges).reduce((total, key) => {
      const postsPerWeek = Number(updatedCharges[key]) || 0;
      const platformCost = parseFloat(calculatePlatformCost(key, postsPerWeek));
      return total + platformCost;
    }, 0);

    setCharges(updatedCharges);

    const chargesToStore = Object.fromEntries(
      Object.entries(updatedCharges).filter(
        ([_, amount]) => amount.trim() !== '',
      ),
    );

    dispatch(
      setServiceCharge({
        serviceId: '6',
        charges: chargesToStore,
        ServiceName: 'Organic Social Media',
        totalCharges: serviceTotal.toFixed(2),
      }),
    );
  };

  return (
    <SafeAreaView style={styles.container2}>
      <View style={tw`p-4 bg flex-1 max-w-lg mx-auto`}>
        <Text style={{fontSize: 28, fontWeight: 'bold', marginBottom: 16}}>
          Organic Social Media - Add deliverables
        </Text>
        <FlatList
          data={chargeNames}
          keyExtractor={item => item}
          renderItem={({item: platform}) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 8,
              }}>
              <Text style={{fontSize: 18, flex: 1}}>{platform}</Text>
              <TextInput
                keyboardType="numeric"
                value={charges[platform]}
                onChangeText={value => handleChargeChange(platform, value)}
                style={{
                  borderColor: '#000',
                  borderWidth: 1,
                  borderRadius: 4,
                  paddingHorizontal: 8,
                  width: 100,
                  textAlign: 'center',
                }}
                placeholder="0"
              />
            </View>
          )}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 16,
          }}>
          <Text style={{fontSize: 18}}>Total cost per month</Text>
          <Text style={{fontSize: 24, fontWeight: 'bold'}}>
            ${calculateTotalCounter()}
          </Text>
        </View>
        <View style={{flexDirection: 'row', marginTop: 0, gap: 12}}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              borderWidth: 1,
              borderColor: '#000',
              borderRadius: 8,
              paddingVertical: 8,
              paddingHorizontal: 16,
            }}>
            <Text>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleNext}
            style={{
              backgroundColor: '#000',
              borderRadius: 8,
              paddingVertical: 8,
              paddingHorizontal: 16,
            }}>
            <Text style={{color: '#fff'}}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container2: {
    height: 700,
    backgroundColor: '#fff',
  },
});
export default OrganicSocialMedia;
