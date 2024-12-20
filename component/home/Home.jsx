// // components/Home/Home.js
// import React from 'react';
// import {View, Text, Button} from 'react-native';

// const Home = ({navigation}) => {
//   return (
//     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//       <Text>Welcome to the Home Screen</Text>
//       <Button title="Go to Form" onPress={() => navigation.navigate('Form')} />
//     </View>
//   );
// };

// export default Home;

// import React from 'react';
// import {View, Text, TouchableOpacity} from 'react-native';
// import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
// import tw from 'twrnc';

// const Home = () => {
//   return (
//     <SafeAreaView
//       style={tw`flex-1 bg-gray-100 h-[700px] items-center justify-center p-6`}>
//       <View
//         style={tw`flex-1 bg-gray-100 h-[400px] items-center justify-center p-6`}>
//         <View
//           style={tw`bg-white rounded-lg p-6 w-full max-w-lg items-center shadow-lg`}>
//           <View style={tw`mb-4 py-2 px-3 bg-white rounded-full shadow`}>
//             <Text style={tw`text-sm text-black font-normal`}>
//               Agency Rate Calculator
//             </Text>
//           </View>
//           <Text
//             style={tw`text-4xl max-md:text-3xl font-bold text-[#012436] mb-4 text-center leading-tight`}>
//             Calculate your agency cost for free
//           </Text>
//           <Text style={tw`text-lg text-black mb-8 text-center`}>
//             Estimate the costs of the deliverables within minutes. Learn what
//             service works best for you.
//           </Text>
//           <TouchableOpacity style={tw`px-8 py-2 bg-[#009FF5] rounded-md`}>
//             <Text style={tw`text-white text-lg font-bold`}>Get Started</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default Home;

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import tw from 'twrnc';
const {width, height} = Dimensions.get('window');

const Home = () => {
  const navigation = useNavigation();

  const handleSubmit = () => {
    navigation.navigate('Form');
  };
  return (
    <SafeAreaView style={tw`h-[${height}px] bg-gray-100 pt-20`}>
      <View style={tw`flex-1 bg-gray-100 items-center justify-start p-6`}>
        <View
          style={tw`bg-white rounded-lg p-6 w-full max-w-[640px] items-center shadow-lg`}>
          <View style={tw`mb-4 py-2 px-3 bg-white rounded-full shadow-md`}>
            <Text style={tw`text-sm text-black font-normal`}>
              Agency Rate Calculator
            </Text>
          </View>
          <Text
            style={tw`text-4xl font-bold text-[#012436] mb-4 text-center leading-10`}>
            Calculate your agency cost for free
          </Text>
          <Text style={tw`text-lg text-black mb-8 text-center`}>
            Estimate the costs of the deliverables within minutes. Learn what
            service works best for you.
          </Text>
          <TouchableOpacity
            style={tw`py-2 px-8 bg-[#009FF5] rounded-lg`}
            onPress={handleSubmit}>
            <Text style={tw`text-white text-lg font-bold`}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
