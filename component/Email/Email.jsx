import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import tw from 'twrnc';

const {width, height} = Dimensions.get('window');

const Email = () => {
  const navigation = useNavigation();

  const handleSubmit = () => {
    navigation.navigate('Service');
  };

  return (
    <SafeAreaView style={tw`h-[${height}px] bg-gray-100`}>
      <View style={tw`flex-1 justify-start items-center mt-20`}>
        <Text style={tw`text-4xl font-bold text-[#012436] mb-4 text-center`}>
          Get the cost estimate mailed to your email
        </Text>

        <View
          style={tw`w-full max-w-[400px] p-4 bg-white rounded-lg shadow-lg`}>
          <TouchableOpacity
            style={tw`flex-row items-center mb-4`}
            onPress={() => navigation.navigate('Form')}>
            <View style={tw`bg-[#A9DCF7] rounded-full p-2 mr-2`}>
              {/* SVG can be added here */}
            </View>
            <Text style={tw`font-bold text-[#006296]`}>Go back</Text>
          </TouchableOpacity>

          <View style={tw`mb-4`}>
            <Text style={tw`text-sm text-gray-700 mb-2`}>
              Enter your email *
            </Text>
            <TextInput
              style={tw`h-10 border border-gray-300 rounded-md px-3 bg-white`}
              placeholder="Enter your company name"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              required
            />
          </View>

          <TouchableOpacity
            style={tw`bg-[#009FF5] py-3 rounded-lg items-center`}
            onPress={handleSubmit}>
            <Text style={tw`text-white text-lg font-bold`}>
              Continue to the calculator
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = {
  container2: {
    height: height,
    // backgroundColor: '#fff',
    backgroundColor: '#F3F4F6',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    marginTop: -40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#012436',
    marginBottom: 16,
    textAlign: 'center',
  },
  form: {
    width: '100%',
    maxWidth: 400,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    backgroundColor: '#A9DCF7',
    borderRadius: 50,
    padding: 8,
    marginRight: 8,
  },
  linkText: {
    fontWeight: 'bold',
    color: '#006296',
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#009FF5',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
};

export default Email;
