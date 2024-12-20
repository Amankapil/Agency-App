import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import tw from 'twrnc';

import {useNavigation} from '@react-navigation/native';
const Navbar2 = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={styles.link}>
          <Svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <Path
              d="M9.91959 11.6889L2.4704 19.1381C1.64756 19.9608 1.64756 21.295 2.4704 22.1177C3.29315 22.9407 4.62722 22.9407 5.45006 22.1177L12.8992 14.6686"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Path
              d="M17.4439 15.0524L21.5296 19.1381C22.3524 19.9609 22.3524 21.295 21.5296 22.1177C20.7068 22.9407 19.3727 22.9407 18.5499 22.1177L12.0095 15.5773"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Path
              d="M6.42452 6.73466L4.1898 7.4795L1.95508 3.75491L3.44486 2.26513L7.16945 4.49984L6.42452 6.73466ZM6.42452 6.73466L9.40614 9.71619"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Path
              d="M9.91961 11.6889C9.03067 9.42078 9.20448 6.44469 11.037 4.61216C12.8695 2.77962 16.2514 2.37744 18.1137 3.49475L14.9104 6.69809L14.6127 9.9755L17.89 9.67775L21.0934 6.4745C22.2108 8.33675 21.8085 11.7187 19.9761 13.5512C18.1435 15.3837 15.1675 15.5576 12.8994 14.6685"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
          <Text style={styles.title}>
            The <Text style={styles.highlight}>Digital</Text> Toolkit
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    paddingVertical: 16,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  link: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  highlight: {
    color: '#006296',
  },
});

export default Navbar2;
