// import React, {useState} from 'react';
// import {View, Text, Button} from 'react-native';
// import PaidSocial from '../subcomp/PaidSocial';
// import PaidAds from '../subcomp/PaidAds';
// import SEO from '../subcomp/SEO';
// import ContentMarketing from '../subcomp/ContentMarketing';
// import DigitalPR from '../subcomp/DigitalPR';
// import OrganicSocialMedia from '../subcomp/OrganicSocialMedia';
// import AmazonMarketing from '../subcomp/AmazonMarketing';
// import CreativeAndDesign from '../subcomp/CreativeAndDesign';

// const ServiceScreen = ({route, navigation}) => {
//   const {serviceIds} = route.params;
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const currentServiceId = serviceIds[currentIndex];
//   const nextService =
//     currentIndex < serviceIds.length - 1 ? serviceIds[currentIndex + 1] : null;

//   const renderServiceComponent = () => {
//     switch (currentServiceId) {
//       case '1':
//         return <PaidSocial nextService={nextService} />;
//       case '2':
//         return <PaidAds nextService={nextService} />;
//       case '3':
//         return <SEO nextService={nextService} />;
//       case '4':
//         return <ContentMarketing nextService={nextService} />;
//       case '5':
//         return <DigitalPR nextService={nextService} />;
//       case '6':
//         return <OrganicSocialMedia nextService={nextService} />;
//       case '7':
//         return <AmazonMarketing nextService={nextService} />;
//       case '8':
//         return <CreativeAndDesign nextService={nextService} />;
//       default:
//         return <Text>Service not found</Text>;
//     }
//   };

//   const handleNextService = () => {
//     if (nextService) {
//       setCurrentIndex(currentIndex + 1);
//     } else {
//       navigation.goBack();
//     }
//   };

//   return (
//     <View>
//       {renderServiceComponent()}
//       <Button title="Next" onPress={handleNextService} />
//     </View>
//   );
// };

// export default ServiceScreen;

import React, {useEffect, useState} from 'react';
import {View, Text, Button} from 'react-native';
import PaidSocial from '../subcomp/PaidSocial';
import PaidAds from '../subcomp/PaidAds';
import SEO from '../subcomp/SEO';
import ContentMarketing from '../subcomp/ContentMarketing';
import DigitalPR from '../subcomp/DigitalPR';
import OrganicSocialMedia from '../subcomp/OrganicSocialMedia';
import AmazonMarketing from '../subcomp/AmazonMarketing';
import CreativeAndDesign from '../subcomp/CreativeAndDesign';
import {useRoute} from '@react-navigation/native';

const ServiceScreen = ({navigation}) => {
  const route = useRoute();
  // const {serviceIds = []} = route.params || {}; // Default to empty array if undefined
  const {serviceIds} = route.params || {}; // Deconstruct id safely

  // Log id only if it's available
  useEffect(() => {
    if (serviceIds) {
      console.log(serviceIds); // Log when the id is valid
    }
  }, [serviceIds]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentServiceId = serviceIds[currentIndex];
  const nextService =
    currentIndex < serviceIds.length - 1 ? serviceIds[currentIndex + 1] : null;
  console.log(currentServiceId);
  console.log(nextService);

  const handleNextService = () => {
    if (nextService) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.goBack();
    }
  };

  const renderServiceComponent = () => {
    switch (currentServiceId) {
      case '1':
        return (
          <PaidSocial
            nextService={nextService}
            handleNextService={handleNextService}
          />
        );
      case '2':
        return (
          <PaidAds
            nextService={nextService}
            handleNextService={handleNextService}
          />
        );
      case '3':
        return (
          <SEO
            nextService={nextService}
            handleNextService={handleNextService}
          />
        );
      case '4':
        return (
          <ContentMarketing
            nextService={nextService}
            handleNextService={handleNextService}
          />
        );
      case '5':
        return (
          <DigitalPR
            nextService={nextService}
            handleNextService={handleNextService}
          />
        );
      case '6':
        return (
          <OrganicSocialMedia
            nextService={nextService}
            handleNextService={handleNextService}
          />
        );
      case '7':
        return (
          <AmazonMarketing
            nextService={nextService}
            handleNextService={handleNextService}
          />
        );
      case '8':
        return (
          <CreativeAndDesign
            nextService={nextService}
            handleNextService={handleNextService}
          />
        );
      default:
        return <Text>Service not found</Text>;
    }
  };

  return (
    <View>
      {renderServiceComponent()}
      <Button title="Next" onPress={handleNextService} />
    </View>
  );
};

export default ServiceScreen;
