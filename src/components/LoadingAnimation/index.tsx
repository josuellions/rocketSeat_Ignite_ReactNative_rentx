import React from 'react';

import LottieView from 'lottie-react-native';

import loadingCar from '../../assets/loadingCar.json';

import {
 Container
} from './styles';

export function LoadingAnimation(){
 return (
  <Container>
    <LottieView
      source={loadingCar}
      style={{height: 200}}
      resizeMode="contain"
      autoPlay    
      loop
    />
  </Container>
 );
}