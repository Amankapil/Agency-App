import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {setServiceCharge} from '../../redux/action/serviceSlice';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import tw from 'twrnc';
const {width, height} = Dimensions.get('window');

const PaidSocial = ({nextService, handleNextService}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const serviceCharges = useSelector(state => state.services.serviceCharges);

  const [amazonCharges, setAmazonCharges] = useState({
    Paid: serviceCharges['Paid'] || '',
  });
  const [data, setData] = useState();

  const handleAmazonChargeChange = (platform, value) => {
    const updatedCharges = {...amazonCharges, [platform]: value};
    setAmazonCharges(updatedCharges);

    const chargesToStore = Object.fromEntries(
      Object.entries(updatedCharges).filter(
        ([_, amount]) => amount.trim() !== '',
      ),
    );
    setData(chargesToStore);
  };

  const amazonTotal = Object.values(amazonCharges)
    .reduce((acc, charge) => acc + (Number(charge) || 0), 0)
    .toFixed(2);

  const [page, setPage] = useState(0);
  const [cost, setCost] = useState(0);
  const [fee, setFee] = useState(0);
  const [management, setManagement] = useState(0);

  const handlePageChange = value => {
    const pageValue = Number(value);
    setPage(pageValue);

    // Calculate cost based on pages
    setCost(pageValue * 500);

    // Adjust management fee
    if (pageValue <= 5 && pageValue > 0) {
      setFee(500);
      setManagement(500);
    } else if (pageValue >= 6 && pageValue <= 20) {
      setFee(1000);
      setManagement(1000);
    } else if (pageValue > 20) {
      setFee(1500);
      setManagement(1500);
    } else {
      setFee(0);
    }
  };

  const getRangeDetails = total => {
    const ranges = [
      {min: 1, max: 14999, paidAdsOrSocial: 1500, percentage: 0.12},
      {min: 15000, max: 29999, paidAdsOrSocial: 2000, percentage: 0.1},
      {min: 30000, max: 59999, paidAdsOrSocial: 2500, percentage: 0.09},
      {min: 60000, max: 99999, paidAdsOrSocial: 3000, percentage: 0.08},
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

  const totalCost = Object.values(amazonCharges)
    .reduce((acc, charge) => acc + (Number(charge) || 0), 0)
    .toFixed(2);

  const rangeDetails = getRangeDetails(totalCost);
  let overallCost, baseManagementFee, adRunningFeePercentage;

  if (rangeDetails) {
    if (rangeDetails.paidAdsOrSocial !== 'Custom Quote') {
      const percentageFee = totalCost * rangeDetails.percentage;
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

  const finalPercent = (adRunningFeePercentage / 100).toFixed(2) * totalCost;
  const grandTotal = Number(overallCost) + Number(totalCost) + cost + fee;

  const handleNext = () => {
    dispatch(
      setServiceCharge({
        serviceId: '7',
        charges: data,
        ServiceName: 'Amazon Marketing',
        totalCharges: grandTotal,
      }),
    );
    // if (nextService) {
    //   navigation.navigate('Services', {serviceId: nextService});
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

  return (
    <SafeAreaView style={tw`h-[${height}px] pt-20 bg-white `}>
      <View style={tw`p-4 bg flex-1 max-w-xl mx-auto`}>
        <Text style={styles.title}>Amazon Marketing - Add Deliverables</Text>

        {/* Amazon Section */}
        <View style={styles.section}>
          <Text style={styles.subTitle}>Platforms</Text>
          {Object.keys(amazonCharges).map(platform => (
            <View key={platform} style={styles.row}>
              <Text style={styles.platformText}>{platform}</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={amazonCharges[platform]}
                onChangeText={value =>
                  handleAmazonChargeChange(platform, value)
                }
                placeholder="100"
              />
            </View>
          ))}
          <View style={styles.row}>
            <Text style={styles.label}>Base Management Fee</Text>
            <Text style={styles.value}>
              {baseManagementFee !== 'Custom Quote'
                ? `$${baseManagementFee}`
                : baseManagementFee}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Ad Running Fee</Text>
            <Text style={styles.value}>${finalPercent}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Total</Text>
            <Text style={styles.value}>${overallCost}</Text>
          </View>
        </View>

        {/* Organic Section */}
        <View style={styles.section}>
          <Text style={styles.subTitle}>Organic Marketing</Text>
          <View style={styles.row}>
            <Text style={styles.label}>No. of Pages</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={String(page)}
              onChangeText={value => handlePageChange(value)}
              placeholder="Enter page count"
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Organic Total Cost</Text>
            <Text style={styles.value}>
              ${(cost + management).toLocaleString()}
            </Text>
          </View>
        </View>

        {/* Overall Total */}
        <View style={styles.row}>
          <Text style={styles.label}>Overall Total Cost</Text>
          <Text style={styles.value}>${grandTotal}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Text style={styles.backButtonText}>Go back</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
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
  container: {
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  section: {
    marginBottom: 24,
  },
  subTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  platformText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    width: 100,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 12,
    borderColor: '#006296',
    borderWidth: 1,
    borderRadius: 4,
  },
  backButtonText: {
    color: '#006296',
    fontSize: 16,
  },
  nextButton: {
    padding: 12,
    backgroundColor: '#009FF5',
    borderRadius: 4,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default PaidSocial;
