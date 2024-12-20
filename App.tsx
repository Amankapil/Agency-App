// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */

// import React from 'react';
// // import type {PropsWithChildren} from 'react';
// import {
//   Dimensions,
//   SafeAreaView,
//   StyleSheet,
//   View,
//   // ScrollView,
//   // StatusBar,
//   // StyleSheet,
//   // Text,
//   // useColorScheme,
//   // View,
// } from 'react-native';

// // import {
// //   Colors,
// //   DebugInstructions,
// //   Header,
// //   LearnMoreLinks,
// //   ReloadInstructions,
// // } from 'react-native/Libraries/NewAppScreen';
// import Home from './component/home/Home';
// // import Form from './component/form/Form';
// import Email from './component/Email/Email';
// import Service from './component/service/Service';
// // import Navbar from './component/Navbar/Navbar';
// import Navbar2 from './component/Navbar/Navbar';

// import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// // import {SafeAreaProvider} from 'react-native-safe-area-context';
// // import PaidSocial from './component/subcomp/PaidSocial';
// // import tw from 'twrnc';
// import ServiceScreen from './component/ServiceScreen/ServiceScreen';
// import SummaryPage from './component/summary/SummaryPage';

// const Stack = createNativeStackNavigator();

// function App(): React.JSX.Element {
//   // const {width, height} = Dimensions.get('window');

//   // Check if the device is an iPad (standard iPad resolutions)
//   // const isIpad =
//   // (width >= 768 && height >= 1024) || (width >= 1024 && height >= 768);

//   // if (!isIpad) {
//   //   return <View style={styles.blackScreen} />;
//   // }
//   return (
//     <>
//       <SafeAreaView>
//         <NavigationContainer>
//           <Navbar2 />
//           <Stack.Navigator>
//             <Stack.Screen
//               name="Home"
//               component={Home}
//               options={{title: 'Welcome'}}
//             />
//             <Stack.Screen
//               name="Email"
//               component={Email}
//               options={{title: 'Welcome'}}
//             />
//             <Stack.Screen
//               name="Service"
//               component={Service}
//               options={{title: 'Service'}}
//             />
//             <Stack.Screen
//               name="summary"
//               component={SummaryPage}
//               options={{title: 'Summary'}}
//             />
//             <Stack.Screen name="ServiceScreen" component={ServiceScreen} />
//           </Stack.Navigator>
//         </NavigationContainer>
//       </SafeAreaView>
//       {/* <Home /> */}
//       {/* <Form /> */}
//       {/* <Email /> */}
//       {/* <Service /> */}
//       {/* <PaidSocial /> */}
//     </>
//   );
// }

// // const styles = StyleSheet.create({
// //   blackScreen: {
// //     flex: 2,
// //     backgroundColor: 'red',
// //   },
// //   container: {
// //     flex: 1,
// //     backgroundColor: 'white',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     paddingHorizontal: 20,
// //   },
// //   text: {
// //     fontSize: 24,
// //     color: 'blue',
// //   },
// // });

// export default App;

import React from 'react';
import {Dimensions, SafeAreaView, StyleSheet, View} from 'react-native';
import Home from './component/home/Home';
import Email from './component/Email/Email';
import Service from './component/service/Service';
import Navbar2 from './component/Navbar/Navbar';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ServiceScreen from './component/ServiceScreen/ServiceScreen';
import SummaryPage from './component/summary/SummaryPage';
import Form from './component/form/Form';
import Final from './component/final/Final';

const Stack = createNativeStackNavigator();

function App() {
  // Check if the device is an iPad
  // const {width, height} = Dimensions.get('window');
  // const isIpad =
  //   (width >= 768 && height >= 1024) || (width >= 1024 && height >= 768);

  // If not an iPad, show a black screen
  // if (!isIpad) {
  //   return <View style={styles.blackScreen} />;
  // }

  return (
    <SafeAreaView>
      <NavigationContainer>
        <Navbar2 />
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{title: 'Welcome'}}
          />
          <Stack.Screen
            name="Form"
            component={Form}
            options={{title: 'Form'}}
          />
          <Stack.Screen
            name="Email"
            component={Email}
            options={{title: 'Welcome'}}
          />
          <Stack.Screen
            name="Service"
            component={Service}
            options={{title: 'Service'}}
          />
          <Stack.Screen
            name="summary"
            component={SummaryPage}
            options={{title: 'Summary'}}
          />
          <Stack.Screen
            name="Final"
            component={Final}
            options={{title: 'Final'}}
          />
          <Stack.Screen name="ServiceScreen" component={ServiceScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

// const styles = StyleSheet.create({
//   blackScreen: {
//     flex: 1,
//     backgroundColor: 'red', // Black screen for non-iPad devices
//   },
//   safeArea: {
//     flex: 1,
//     backgroundColor: 'white', // Full screen background for iPads
//   },
// });

export default App;
