import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  useWindowDimensions,
} from 'react-native';
// import CheckBox from '@react-native-community/checkbox';
import CheckBox from '@react-native-community/checkbox';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {addService} from '../../redux/action/serviceSlice';
import {SafeAreaView} from 'react-native-safe-area-context';
import tw from 'twrnc';

const {width, height} = Dimensions.get('window');

const services = [
  {id: '1', name: 'Paid Social'},
  {id: '2', name: 'Paid Ads'},
  {id: '3', name: 'SEO'},
  {id: '4', name: 'Content Marketing'},
  {id: '5', name: 'Digital PR'},
  {id: '6', name: 'Organic Social Media'},
  {id: '7', name: 'Amazon Marketing'},
  {id: '8', name: 'Creative and Design'},
];

export default function Service() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [selected, setSelected] = useState([]);

  // const handleServiceSelect = service => {
  //   const alreadySelected = selected.includes(service.id);
  //   setSelected(prev =>
  //     alreadySelected
  //       ? prev.filter(id => id !== service.id)
  //       : [...prev, service.id],
  //   );
  //   dispatch(addService(service));
  // };
  const handleServiceSelect = serviceId => {
    const alreadySelected = selected.includes(serviceId);
    setSelected(prev =>
      alreadySelected
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId],
    );
    dispatch(
      addService({
        id: serviceId,
        name: services.find(s => s.id === serviceId).name,
      }),
    );
  };

  // const handleNext = () => {
  //   if (selected.length > 0) {
  //     console.log('closi');
  //     navigation.navigate('ServiceScreen', {serviceId: selected[0]});
  //   }
  // };
  // const handleNext = () => {
  //   if (selected.length > 0) {
  //     navigation.navigate('ServiceScreen', {serviceIds: selected});
  //     console.log({serviceIds: selected});
  //   } else {
  //     alert('Please select at least one service.');
  //   }
  // };

  const handleNext = () => {
    if (selected.length > 0) {
      console.log({serviceIds: selected});
      navigation.navigate('ServiceScreen', {serviceIds: selected});
    } else {
      console.log('Please select at least one service.');
    }
  };

  console.log(selected.length);

  const {width} = useWindowDimensions();

  // Define breakpoints similar to Tailwind CSS
  const isSmallScreen = width < 640; // ~sm breakpoint (less than 640px)
  const isMediumScreen = width >= 640 && width < 768; // ~md breakpoint (640px to 768px)
  const isLargeScreen = width >= 768 && width < 1024; // ~lg breakpoint (768px to 1024px)
  const isXLargeScreen = width >= 1024; // ~xl breakpoint (1024px and up)

  return (
    // <SafeAreaView style={tw`h-[${height}px] bg-gray-100 mt-20`}>
    //   <ScrollView contentContainerStyle={tw`flex-grow p-4 items-center`}>
    //     <View
    //       style={tw`flex-row justify-between items-center w-full max-w-[800px] mb-4`}>
    //       <Text style={tw`text-4xl font-bold text-[#012436]`}>
    //         Select the services you need
    //       </Text>
    //       <TouchableOpacity
    //         style={tw`bg-[#009FF5] py-2 px-4 rounded-lg`}
    //         onPress={handleNext}>
    //         <Text style={tw`text-white text-lg font-bold`}>Next</Text>
    //       </TouchableOpacity>
    //     </View>
    //     <Text style={tw`text-lg text-gray-700 mb-4 text-center`}>
    //       You can add more later
    //     </Text>
    //     <View
    //       style={tw`w-full max-w-[700px] gap-10 flex-row flex-wrap justify-between`}>
    //       {services.map(service => (
    //         <View
    //           key={service.id}
    //           style={tw`flex-row items-center w-[45%] px-4 py-8 mb-2 bg-white rounded-lg shadow-lg`}>
    //           <BouncyCheckbox
    //             size={25}
    //             fillColor="#006296"
    //             unFillColor="#FFFFFF"
    //             iconStyle={{borderColor: '#006296'}}
    //             innerIconStyle={{borderWidth: 2}}
    //             textStyle={{fontFamily: 'JosefinSans-Regular'}}
    //             isChecked={selected.includes(service.id)}
    //             onPress={() => handleServiceSelect(service.id)}
    //           />
    //           <Text
    //             style={tw`-ml-[220px] sm:ml-0 text-lg font-semibold text-black`}>
    //             {service.name}
    //           </Text>
    //         </View>
    //       ))}
    //     </View>
    //   </ScrollView>
    // </SafeAreaView>
    <SafeAreaView
      style={tw`bg-gray-100 h-[600px] ${
        isLargeScreen || isXLargeScreen ? 'h-[600px] mt-20' : 'mt-10'
      }`}>
      <ScrollView contentContainerStyle={tw`flex-grow p-4 items-center`}>
        <View
          style={tw`flex-row justify-between items-center w-full ${
            isLargeScreen
              ? 'max-w-[800px] flex-wrap'
              : isMediumScreen
              ? 'max-w-[600px] flex-wrap'
              : 'max-w-[350px] flex-wrap text-center'
          } mb-4`}>
          <Text
            style={tw`font-bold text-[#012436] ${
              isXLargeScreen
                ? 'text-5xl'
                : isLargeScreen
                ? 'text-4xl'
                : isMediumScreen
                ? 'text-3xl'
                : 'text-2xl'
            }`}>
            Select the services you need
          </Text>
          <TouchableOpacity
            style={tw`bg-[#009FF5] py-2 px-4 rounded-lg text-center flex items-center justify-center `}
            onPress={handleNext}>
            <Text
              style={tw`text-white  ${
                isLargeScreen ? 'text-xl' : 'text-lg'
              } font-bold`}>
              Next
            </Text>
          </TouchableOpacity>
        </View>
        <Text
          style={tw`text-gray-700 mb-4 text-center ${
            isXLargeScreen
              ? 'text-xl'
              : isLargeScreen
              ? 'text-lg'
              : isMediumScreen
              ? 'text-md'
              : 'text-sm'
          }`}>
          You can add more later
        </Text>
        <View
          style={tw`w-full ${
            isLargeScreen || isXLargeScreen
              ? 'max-w-[700px] gap-10 flex-row flex-wrap'
              : 'max-w-[350px] flex-col'
          } justify-between`}>
          {services.map(service => (
            <View
              key={service.id}
              style={tw`flex-row items-center ${
                isLargeScreen ? 'w-[45%]' : 'w-full'
              } px-4 py-8 mb-2 bg-white rounded-lg shadow-lg`}>
              <BouncyCheckbox
                size={25}
                fillColor="#006296"
                unFillColor="#FFFFFF"
                iconStyle={{borderColor: '#006296'}}
                innerIconStyle={{borderWidth: 2}}
                textStyle={{fontFamily: 'JosefinSans-Regular'}}
                isChecked={selected.includes(service.id)}
                onPress={() => handleServiceSelect(service.id)}
              />
              <Text
                style={tw`${
                  isLargeScreen ? '-ml-[220px] sm:ml-0' : '-ml-[260px]'
                } text-lg font-semibold text-black`}>
                {service.name}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container2: {
    height: height,
    backgroundColor: '#F3F4F6',
  },
  container: {
    flexGrow: 1,
    padding: 16,
    alignItems: 'center',
    // backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxWidth: 800,
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#012436',
  },
  button: {
    backgroundColor: '#009FF5',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  servicesContainer: {
    width: '100%',
    maxWidth: 700,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '45%',
    padding: 16,
    marginBottom: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
  },
  serviceText: {
    marginLeft: -250,
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
});
