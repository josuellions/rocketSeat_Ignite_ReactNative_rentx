import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import Animated, 
  {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    interpolate,
    Extrapolate,
    runOnJS
  } from 'react-native-reanimated';

import BrandSvg from '../../assets/brand.svg';
import LogoSvg from '../../assets/logo.svg';

import { Container } from './styles';

export function Splash(){
  const navigation = useNavigation();
  const splashAnimation = useSharedValue(0);

  const brandStyles = useAnimatedStyle(() => {
    return{
      position: 'absolute',
      opacity: interpolate(splashAnimation.value, [0, 25, 50], [1, .5, 0]),
      transform: [
        {
          translateX: interpolate(splashAnimation.value,
            [0, 25, 50],
            [0, 50, 100],
            Extrapolate.CLAMP //para respeitar o valor maximo definido
          )
         }
      ]
    }
  });

  const logoStyles = useAnimatedStyle(() => {
    return{
      position: 'absolute',
      opacity: interpolate(splashAnimation.value, [0, 25, 50], [0, .5, 1]),
      transform: [
        {
          translateX: interpolate(splashAnimation.value,
            [0, 50, 100],
            [-100, 5, 0],
            Extrapolate.CLAMP //para respeitar o valor maximo definido
          )
         }
      ],
    }
  });

  function startApp(){
    navigation.navigate('SignIn');
  }

  useEffect(() => {
    splashAnimation.value = withTiming( 50, { duration: 1000}, () => {
      //integração entre thards
      'worklet' 
      runOnJS(startApp)();
    });
  },[])

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      <Animated.View style={brandStyles}>
        <BrandSvg width={80} height={50} />
      </Animated.View>

      <Animated.View style={logoStyles}>
        <LogoSvg width={180} height={20} />
      </Animated.View>

    </Container>
  );
}
