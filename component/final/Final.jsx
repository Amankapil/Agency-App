// src/components/Final.js
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
  Linking,
  Dimensions,
} from 'react-native';
import {useSelector} from 'react-redux';
import jsPDF from 'jspdf'; // For PDF generation
import tw from 'twrnc';
import axios from 'axios';
import {SafeAreaView} from 'react-native-safe-area-context';
const {width, height} = Dimensions.get('window');

const Final = () => {
  const serviceCharges = useSelector(state => state.services.serviceCharges);

  const totalCharge = Object.values(serviceCharges).reduce((total, service) => {
    const charges = parseFloat(service.totalCharges);
    return total + (isNaN(charges) ? 0 : charges);
  }, 0);

  const underchargingMin = totalCharge * 0.44;
  const underchargingMax = totalCharge * 0.8333;
  const averagePriceMin = totalCharge * 0.8334;
  const averagePriceMax = totalCharge * 1.1666;
  const overchargingMin = totalCharge * 1.1667;
  const overchargingMax = totalCharge * 1.44;
  const averagePrice = Math.min(
    Math.min(totalCharge, averagePriceMin),
    averagePriceMax,
  );

  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleDownload = async () => {
    const doc = new jsPDF();
    doc.text(`Price Estimation Report:`, 10, 10);
    doc.text(
      `Undercharging Range: $${underchargingMin.toFixed(
        2,
      )} - $${underchargingMax.toFixed(2)}`,
      10,
      20,
    );
    doc.text(`Average Price: $${averagePrice.toFixed(2)}`, 10, 30);
    doc.text(
      `Overcharging Range: $${overchargingMin.toFixed(
        2,
      )} - $${overchargingMax.toFixed(2)}`,
      10,
      40,
    );
    doc.text(`Our Cost: $${totalCharge}`, 10, 50);
    doc.text(`Email: GetStarted@TheDigitalToolKit.com`, 10, 60);

    const pdfBlob = doc.output('blob');
    const formData = new FormData();
    formData.append('pdf', pdfBlob, 'report.pdf');
    formData.append('email', email);

    setIsSending(true);
    try {
      await axios.post('http://localhost:5000/send-email', formData);
      Alert.alert('Success', 'Email sent successfully!');
      setShowModal(false);
    } catch (error) {
      Alert.alert('Error', 'Failed to send email.');
      console.error('Error sending email:', error);
    } finally {
      setIsSending(false);
    }
  };

  const handleDownload2 = () => {
    // Placeholder function for PDF download in React Native
    Alert.alert('Download Report', 'PDF report download initiated.');
  };

  return (
    <SafeAreaView style={tw`h-[${height}px] bg-white `}>
      <View style={tw`p-4`}>
        <Text style={tw`text-2xl font-bold text-center mb-4`}>
          Here's what an agency would charge you.
        </Text>
        <Text style={tw`text-center mb-4`}>
          These are just an estimate. Prices may vary.
        </Text>

        <View
          style={tw`flex-row justify-between items-center space-x-4 w-[40%] p-4 rounded-md`}>
          <View style={tw`bg-white p-4 rounded-md shadow-md w-[50%]`}>
            <Text style={tw`text-gray-600`}>Undercharging</Text>
            <Text style={tw`text-black font-bold text-lg`}>
              ${underchargingMin.toFixed(2)}
            </Text>
          </View>

          <View style={tw`bg-[#009FF5] p-4 rounded-md shadow-md w-full`}>
            <Text style={tw`text-white text-lg`}>Average Price</Text>
            <Text style={tw`text-white font-bold text-xl`}>
              ${averagePrice.toFixed(2)}
            </Text>
          </View>

          <View style={tw`bg-white p-4 rounded-md shadow-md w-full`}>
            <Text style={tw`text-gray-600`}>Overcharging</Text>
            <Text style={tw`text-black font-bold text-lg`}>
              ${overchargingMin.toFixed(2)}
            </Text>
          </View>
        </View>

        <Text style={tw`text-lg mt-10`}>Our Cost</Text>
        <Text style={tw`font-bold text-left text-xl`}>
          ${totalCharge.toFixed(2)}
        </Text>

        <Text style={tw`text-lg mt-4`}>Get a free Audit</Text>
        <Text style={tw`font-bold text-left text-xl`}>
          getstarted@thedigitaltoolkit.com
        </Text>

        <Text style={tw`text-lg mt-4`}>Schedule a Consultation</Text>
        <Text
          style={tw`font-bold text-blue-500 text-xl`}
          onPress={() =>
            Linking.openURL('https://calendly.com/kkanbar/consultation')
          }>
          https://calendly.com/kkanbar/consultation
        </Text>

        <View style={tw`flex-row justify-between mt-10`}>
          <TouchableOpacity
            onPress={() => setShowModal(true)}
            style={tw`bg-[#006296] p-4 rounded`}>
            <Text style={tw`text-white font-bold`}>Share Report</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleDownload2}
            style={tw`bg-[#009FF5] p-4 rounded`}>
            <Text style={tw`text-white font-bold`}>Download Report</Text>
          </TouchableOpacity>
        </View>

        <Modal visible={showModal} transparent={true} animationType="slide">
          <View
            style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}>
            <View style={tw`bg-white p-6 rounded-lg shadow-lg w-80`}>
              <Text style={tw`text-lg font-bold mb-4`}>
                Enter Email to Send Report
              </Text>
              <TextInput
                style={tw`border p-2 w-full mb-4`}
                placeholder="Enter email address"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
              <View style={tw`flex-row justify-end`}>
                <TouchableOpacity
                  onPress={() => setShowModal(false)}
                  style={tw`bg-gray-300 p-2 rounded mr-2`}>
                  <Text style={tw`text-gray-700`}>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleDownload}
                  disabled={!email || isSending}
                  style={tw`bg-blue-500 p-2 rounded ${
                    isSending ? 'opacity-50' : ''
                  }`}>
                  <Text style={tw`text-white`}>
                    {isSending ? 'Sending...' : 'Send'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default Final;
