// import React from 'react'

// const CreativeAndDesign = () => {
//   return (
//     <div>CreativeAndDesign</div>
//   )
// }

// export default CreativeAndDesign

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  Dimensions,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {setServiceCharge} from '../../redux/action/serviceSlice';
import {SafeAreaView} from 'react-native-safe-area-context';
// import {
//   setStoredData,
//   getStoredData,
//   clearLocalStorageOnRefresh,
// } from '../../utils/storageUtils';
import tw from 'twrnc';
const {width, height} = Dimensions.get('window');

const CreativeAndDesign = ({nextService, handleNextService}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const serviceCharges = useSelector(state => state.services.serviceCharges);

  // Define platform-specific costs
  const platformCosts = {
    Graphics: 150,
    Infographics: 400,
    Brochures: 800,
    Videos: 400,
    'Stock Photos': 50,
  };

  const chargeNames = [
    'Graphics',
    'Infographics',
    'Brochures',
    'Videos',
    'Stock Photos',
  ];

  const getInitialCharges = () => {
    // const savedCharges = getStoredData('Creative and Design');
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

  // useEffect(() => {
  //   clearLocalStorageOnRefresh();
  //   return () => {
  //     setCharges(
  //       chargeNames.reduce((acc, name) => {
  //         acc[name] = 0;
  //         return acc;
  //       }, {}),
  //     );
  //   };
  // }, []);

  // useEffect(() => {
  //   setStoredData('Creative and Design', charges);
  // }, [charges]);

  const handleChargeChange = (platform, value) => {
    const updatedCharges = {...charges, [platform]: Number(value) || 0};
    const chargesToStore = Object.fromEntries(
      Object.entries(updatedCharges).filter(([_, amount]) => amount),
    );

    const serviceTotal = Object.keys(updatedCharges).reduce(
      (acc, platform) =>
        acc + (updatedCharges[platform] * platformCosts[platform] || 0),
      0,
    );

    setCharges(updatedCharges);

    dispatch(
      setServiceCharge({
        serviceId: '8',
        charges: chargesToStore,
        ServiceName: 'Creative and Design',
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
      //  console.log(handleNextService);
      // navigation.navigate('ServiceScreen', {id: nextService});
    } else {
      navigation.navigate('summary'); // Go back if no more services are left
    }
  };

  const totalCost = Object.keys(charges).reduce(
    (acc, platform) => acc + (charges[platform] * platformCosts[platform] || 0),
    0,
  );

  const renderPlatformItem = ({item}) => (
    <View style={styles.row}>
      <Text style={styles.platformText}>{item}</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={charges[item].toString()}
        onChangeText={value => handleChargeChange(item, value)}
        placeholder="0"
      />
    </View>
  );

  return (
    <SafeAreaView style={tw`h-[${height - 200}px] bg-white `}>
      <View style={tw`p-4 bg flex-1 max-w-lg mx-auto`}>
        <Text style={styles.title}>Creative and Design - Add Deliverables</Text>
        <FlatList
          data={chargeNames}
          keyExtractor={item => item}
          renderItem={renderPlatformItem}
        />
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total Cost</Text>
          <Text style={styles.totalValue}>${totalCost.toLocaleString()}</Text>
        </View>
        <View style={styles.buttonContainer}>
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
    height: 700,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  platformText: {
    fontSize: 18,
    fontWeight: '600',
    width: '50%',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    width: '40%',
    textAlign: 'center',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  totalLabel: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default CreativeAndDesign;
