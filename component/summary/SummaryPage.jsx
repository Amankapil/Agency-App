// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   Alert,
// } from 'react-native';
// import {useSelector, useDispatch} from 'react-redux';
// import {useNavigation} from '@react-navigation/native';
// import {removeService} from '../../redux/action/serviceSlice';
// import Svg, {Path} from 'react-native-svg';
// import {SafeAreaView} from 'react-native-safe-area-context';

// const SummaryPage = () => {
//   const navigation = useNavigation();
//   const dispatch = useDispatch();

//   const {serviceCharges, totalCharges} = useSelector(state => state.services);

//   const [expandedService, setExpandedService] = useState(null);

//   const toggleService = serviceId => {
//     setExpandedService(expandedService === serviceId ? null : serviceId);
//   };

//   const handleEdit = serviceId => {
//     // Navigate to the corresponding service page based on the serviceId
//     navigation.navigate('ServiceScreen', {serviceId});
//   };

//   const handleDelete = serviceId => {
//     Alert.alert(
//       'Remove Service',
//       'Are you sure you want to remove this service?',
//       [
//         {text: 'Cancel', style: 'cancel'},
//         {
//           text: 'Remove',
//           style: 'destructive',
//           onPress: () => dispatch(removeService(serviceId)),
//         },
//       ],
//     );
//   };

//   const renderService = ({item}) => {
//     const isExpanded = expandedService === item.serviceId;
//     const totalAmount = Object.values(item.charges).reduce(
//       (sum, amount) => sum + (Number(amount) || 0),
//       0,
//     );

//     return (
//       <SafeAreaView style={styles.container2}>
//         <View>
//           <TouchableOpacity
//             style={styles.serviceRow}
//             onPress={() => toggleService(item.serviceId)}>
//             <View style={styles.iconContainer}>
//               {isExpanded ? (
//                 <Svg width="21" height="12" viewBox="0 0 21 12" fill="none">
//                   <Path
//                     d="M10.9824 0L20.9824 10L19.5824 11.4L10.9824 2.8L2.38242 11.4L0.982422 10L10.9824 0Z"
//                     fill="black"
//                   />
//                 </Svg>
//               ) : (
//                 <Svg width="21" height="12" viewBox="0 0 21 12" fill="none">
//                   <Path
//                     d="M10.9824 11.4L20.9824 1.39999L19.5824 -5.72205e-06L10.9824 8.59999L2.38242 -5.72205e-06L0.982422 1.39999L10.9824 11.4Z"
//                     fill="black"
//                   />
//                 </Svg>
//               )}
//             </View>
//             <View style={styles.serviceInfo}>
//               <Text style={styles.serviceName}>{item.charges.ServiceName}</Text>
//             </View>
//             <View style={styles.amountInfo}>
//               <Text style={styles.amountText}>{`$${totalAmount}`}</Text>
//             </View>
//           </TouchableOpacity>

//           {isExpanded && (
//             <>
//               {Object.entries(item.charges).map(
//                 ([chargeName, amount]) =>
//                   chargeName !== 'ServiceName' && (
//                     <View
//                       key={`${item.serviceId}-${chargeName}`}
//                       style={styles.chargeRow}>
//                       <View style={styles.emptyCell} />
//                       <View style={styles.chargeName}>
//                         <Text style={styles.chargeText}>{chargeName}</Text>
//                       </View>
//                       <View style={styles.chargeAmount}>
//                         <Text style={styles.amountText}>{`$${amount}`}</Text>
//                       </View>
//                     </View>
//                   ),
//               )}

//               <View style={styles.editRow}>
//                 <TouchableOpacity
//                   onPress={() => handleEdit(item.serviceId)}
//                   style={styles.editButton}>
//                   <Text style={styles.editButtonText}>Edit Deliverables</Text>
//                 </TouchableOpacity>
//               </View>
//             </>
//           )}
//         </View>
//       </SafeAreaView>
//     );
//   };

//   return (
//     <SafeAreaView style={styles.container2}>
//       <View style={styles.container}>
//         <Text style={styles.title}>Summary</Text>
//         <FlatList
//           data={Object.entries(serviceCharges).map(([serviceId, charges]) => ({
//             serviceId,
//             charges,
//           }))}
//           keyExtractor={item => item.serviceId}
//           renderItem={renderService}
//           ItemSeparatorComponent={() => <View style={styles.separator} />}
//         />
//         <View style={styles.totalContainer}>
//           <Text style={styles.totalText}>Total Cost</Text>
//           <Text style={styles.totalAmount}>{`$${totalCharges}`}</Text>
//         </View>
//         <View style={styles.buttonContainer}>
//           <View style={styles.leftButtons}>
//             <TouchableOpacity
//               onPress={() => navigation.goBack()}
//               style={styles.removeButton}>
//               <Svg width="17" height="17" viewBox="0 0 17 17" fill="none">
//                 <Path
//                   d="M5.64844 14.5C5.28177 14.5 4.96799 14.3696 4.7071 14.1087C4.44622 13.8478 4.31555 13.5338 4.3151 13.1667V4.5H3.64844V3.16667H6.98177V2.5H10.9818V3.16667H14.3151V4.5H13.6484V13.1667C13.6484 13.5333 13.518 13.8473 13.2571 14.1087C12.9962 14.37 12.6822 14.5004 12.3151 14.5H5.64844ZM12.3151 4.5H5.64844V13.1667H12.3151V4.5ZM6.98177 11.8333H8.3151V5.83333H6.98177V11.8333ZM9.64844 11.8333H10.9818V5.83333H9.64844V11.8333Z"
//                   fill="#C03744"
//                 />
//               </Svg>
//               <Text style={styles.removeButtonText}>Remove service</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               onPress={() => navigation.navigate('Services')}
//               style={styles.addButton}>
//               <Svg width="17" height="17" viewBox="0 0 17 17" fill="none">
//                 <Path
//                   d="M14.8183 8.83588C14.9074 8.7468 14.9574 8.62598 14.9574 8.5C14.9574 8.37402 14.9074 8.2532 14.8183 8.16412C14.7292 8.07504 14.6084 8.025 14.4824 8.025H9.45742V3C9.45742 2.87402 9.40738 2.7532 9.3183 2.66412C9.22922 2.57504 9.1084 2.525 8.98242 2.525C8.85644 2.525 8.73563 2.57504 8.64655 2.66412C8.55747 2.7532 8.50742 2.87402 8.50742 3V8.025H3.48242C3.35644 8.025 3.23563 8.07504 3.14655 8.16412C3.05747 8.2532 3.00742 8.37402 3.00742 8.5C3.00742 8.62598 3.05747 8.7468 3.14655 8.83588C3.23563 8.92496 3.35644 8.975 3.48242 8.975H8.50742V14C8.50742 14.126 8.55747 14.2468 8.64655 14.3359C8.73563 14.425 8.85644 14.475 8.98242 14.475C9.1084 14.475 9.22922 14.425 9.3183 14.3359C9.40738 14.2468 9.45742 14.126 9.45742 14V8.975H14.4824C14.6084 8.975 14.7292 8.92496 14.8183 8.83588Z"
//                   fill="#006296"
//                   stroke="#006296"
//                   strokeWidth="0.2"
//                 />
//               </Svg>
//               <Text style={styles.addButtonText}>Add another service</Text>
//             </TouchableOpacity>
//           </View>
//           <TouchableOpacity
//             onPress={() => navigation.navigate('Final')}
//             style={styles.generateButton}>
//             <Text style={styles.generateButtonText}>Generate agency rate</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default SummaryPage;

// const styles = StyleSheet.create({
//   container2: {
//     height: 500,
//   },
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#FFFFFF',
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   serviceRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 12,
//     backgroundColor: '#FFFFFF',
//   },
//   iconContainer: {
//     width: 50,
//     alignItems: 'center',
//   },
//   serviceInfo: {
//     flex: 2,
//   },
//   serviceName: {
//     fontSize: 18,
//     fontWeight: '600',
//   },
//   amountInfo: {
//     flex: 1,
//     alignItems: 'flex-end',
//   },
//   amountText: {
//     fontSize: 18,
//     fontWeight: '600',
//   },
//   chargeRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderBottomWidth: 1,
//     borderBottomColor: 'rgba(0,0,0,0.2)',
//     paddingVertical: 8,
//   },
//   emptyCell: {
//     width: 50,
//   },
//   chargeName: {
//     flex: 2,
//     paddingLeft: 16,
//   },
//   chargeText: {
//     fontSize: 16,
//   },
//   chargeAmount: {
//     flex: 1,
//     alignItems: 'flex-end',
//     paddingRight: 16,
//   },
//   editRow: {
//     paddingVertical: 8,
//     paddingLeft: 66, // 50 (icon) + 16 (padding)
//   },
//   editButton: {
//     backgroundColor: '#FFFFFF',
//   },
//   editButtonText: {
//     color: '#006296',
//     fontSize: 16,
//   },
//   separator: {
//     height: 1,
//     backgroundColor: '#E0E0E0',
//   },
//   totalContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginVertical: 16,
//   },
//   totalText: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   totalAmount: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   leftButtons: {
//     flexDirection: 'row',
//     gap: 10,
//   },
//   removeButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderColor: '#C03744',
//     borderWidth: 2,
//     paddingVertical: 10,
//     paddingHorizontal: 16,
//     borderRadius: 8,
//     backgroundColor: '#FFFFFF',
//   },
//   removeButtonText: {
//     color: '#C03744',
//     marginLeft: 8,
//     fontSize: 14,
//   },
//   addButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderColor: '#006296',
//     borderWidth: 2,
//     paddingVertical: 10,
//     paddingHorizontal: 16,
//     borderRadius: 8,
//     backgroundColor: '#FFFFFF',
//   },
//   addButtonText: {
//     color: '#006296',
//     marginLeft: 8,
//     fontSize: 14,
//   },
//   generateButton: {
//     backgroundColor: '#009FF5',
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     borderRadius: 8,
//   },
//   generateButtonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     textAlign: 'center',
//   },
// });

import React, {useState} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {removeService} from '../../redux/action/serviceSlice';
import {SafeAreaView} from 'react-native-safe-area-context';

const SummaryPage = () => {
  const navigation = useNavigation();
  const {serviceCharges} = useSelector(state => state.services);

  const totalChargesSum = Object.values(serviceCharges).reduce(
    (total, service) => {
      const charges = parseFloat(service.totalCharges);
      return total + (isNaN(charges) ? 0 : charges);
    },
    0,
  );

  const [expandedService, setExpandedService] = useState(null);
  const dispatch = useDispatch();

  const toggleService = serviceId => {
    setExpandedService(expandedService === serviceId ? null : serviceId);
  };

  const handleEdit = serviceId => {
    navigation.navigate('ServiceScreen', {serviceId});
  };

  const handleDelete = serviceId => {
    dispatch(removeService(serviceId));
  };

  const renderService = ({item: [serviceId, charges]}) => (
    <>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 16,
          backgroundColor: '#fff',
        }}
        onPress={() => toggleService(serviceId)}>
        <Text>{expandedService === serviceId ? '▲' : '▼'}</Text>
        <Text style={{fontSize: 18, fontWeight: '600'}}>
          {charges.ServiceName}
        </Text>
        <Text style={{fontSize: 18, fontWeight: '600'}}>
          ${charges.totalCharges.toLocaleString()}
        </Text>
      </TouchableOpacity>

      {expandedService === serviceId &&
        Object.entries(charges)
          .filter(([key]) => key !== 'ServiceName' && key !== 'totalCharges')
          .map(([chargeName, amount]) => (
            <View
              key={`${serviceId}-${chargeName}`}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderBottomWidth: 1,
                borderColor: '#ccc',
              }}>
              <Text>{chargeName}</Text>
              <Text>${amount}</Text>
            </View>
          ))}

      {expandedService === serviceId && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 16,
          }}>
          <TouchableOpacity onPress={() => handleEdit(serviceId)}>
            <Text style={{color: '#006296'}}>Edit Deliverables</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleDelete(serviceId)}
            style={{
              paddingVertical: 8,
              paddingHorizontal: 16,
              borderColor: '#C03744',
              borderWidth: 2,
              borderRadius: 4,
              alignItems: 'center',
            }}>
            <Text style={{color: '#C03744'}}>Remove service there</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );

  return (
    <SafeAreaView style={styles.container2}>
      <View style={{flex: 1, padding: 16}}>
        <Text style={{fontSize: 28, fontWeight: 'bold', marginBottom: 16}}>
          Summary
        </Text>

        <FlatList
          data={Object.entries(serviceCharges)}
          keyExtractor={item => item[0]}
          renderItem={renderService}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 16,
          }}>
          <Text style={{fontSize: 24, fontWeight: 'bold'}}>Total Cost</Text>
          <Text style={{fontSize: 24, fontWeight: 'bold'}}>
            ${totalChargesSum.toLocaleString()}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 8,
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Services')}
            style={{
              flex: 1,
              paddingVertical: 12,
              borderColor: '#006296',
              borderWidth: 2,
              borderRadius: 4,
              alignItems: 'center',
            }}>
            <Text style={{color: '#006296'}}>Add another service</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Final')}
            style={{
              flex: 1,
              backgroundColor: '#009FF5',
              paddingVertical: 12,
              borderRadius: 4,
              alignItems: 'center',
            }}>
            <Text style={{color: 'white'}}>Generate agency rate</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = {
  container2: {
    height: '500',
    backgroundColor: '#fff',
  },
};

export default SummaryPage;
