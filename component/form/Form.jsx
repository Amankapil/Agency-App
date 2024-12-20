import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import tw from 'twrnc';
// import {useNavigation} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const Form = () => {
  //   const navigation = useNavigation();

  const [companyName, setCompanyName] = useState('');
  const [companySize, setCompanySize] = useState('');
  const [industryType, setIndustryType] = useState('');
  const navigation = useNavigation();

  const handleSubmit = () => {
    navigation.navigate('Email'); // Navigate to Email Capture page
  };

  return (
    <SafeAreaView style={styles.container2}>
      <ScrollView
        contentContainerStyle={tw`flex w-full min-hscreen h[100px] items-center p-6 mt-10`}>
        <Text style={tw`text-3xl font-bold text-[#012436] mb-4 text-center`}>
          Tell us about your business
        </Text>
        <View style={tw`w-full max-w-xl p-8 bg-white rounded-lg shadow-lg`}>
          {/* Company Name Input */}
          <View style={tw`mb-4 bg-white p-4 rounded-lg`}>
            <Text style={tw`text-gray-700 text-sm font-bold mb-2`}>
              Enter your company name *
            </Text>
            <TextInput
              style={tw`border rounded w-full py-2 px-3 text-gray-700`}
              placeholder="Enter your company name"
              value={companyName}
              onChangeText={setCompanyName}
              required
            />
          </View>

          <View style={tw`mb-4 bg-white p-2 rounded-lg`}>
            <Text style={tw`text-gray-700 text-sm font-bold mb-2`}>
              Select your business size*
            </Text>
            <Picker
              selectedValue={companySize}
              onValueChange={itemValue => setCompanySize(itemValue)}
              style={tw`border rounded wfull py-0 px-0 h-[100px] text-gray-700`}>
              <Picker.Item label="Select company size" value="" />
              <Picker.Item label="1-10" value="small" />
              <Picker.Item label="11-50" value="medium" />
              <Picker.Item label="51-200" value="large" />
              <Picker.Item label="201-500" value="large" />
              <Picker.Item label="501-1000" value="large" />
              <Picker.Item label="1001-10000" value="large" />
              <Picker.Item label="10001+" value="large" />
            </Picker>
          </View>

          {/* Industry Type Picker */}
          <View style={tw`mb-4 bg-white p-4 rounded-lg`}>
            <Text style={tw`text-gray-700 text-sm font-bold mb-2`}>
              Select your business industry *
            </Text>
            <Picker
              selectedValue={industryType}
              onValueChange={itemValue => setIndustryType(itemValue)}
              style={tw`border rounded w-full h-[100px]  py-2 px-3 text-gray-700`}>
              <Picker.Item label="Select industry type" value="" />
              <Picker.Item label="Technology" value="technology" />
              <Picker.Item label="Finance" value="finance" />
              <Picker.Item label="Healthcare" value="healthcare" />
              <Picker.Item label="Education" value="education" />
              <Picker.Item label="SaaS" value="SaaS" />
              <Picker.Item label="Entertainment" value="entertainment" />
              <Picker.Item label="Manufacturing" value="manufacturing" />
              <Picker.Item label="Hospitality" value="hospitality" />
              <Picker.Item label="IT/ITeS" value="IT/ITeS" />
              <Picker.Item label="Other" value="other" />
            </Picker>
          </View>
          {/* Continue Button */}
          <TouchableOpacity
            style={tw`w-full py-4 bg-[#009FF5] rounded-md items-center`}
            onPress={handleSubmit}>
            <Text style={tw`text-white text-lg font-bold`}>Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container2: {
    height: height,
    backgroundColor: '#F3F4F6',
  },
});
export default Form;
