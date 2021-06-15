import React, {useEffect, useState} from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { useNavigation, useRoute } from '@react-navigation/native';
import Animated,  { useSharedValue, useAnimatedScrollHandler, useAnimatedStyle, interpolate, Extrapolate } from 'react-native-reanimated';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';
import { useTheme } from 'styled-components';

import { useNetInfo } from '@react-native-community/netinfo';
import { CarDTO } from '../../dtos/CarDTO'; //sem sincornização
import { Car as ModelCar  } from '../../database/model/Car';
import { api } from '../../services/api';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

import {
  Container,
  Header,
  CarImage,
  Details,
  Desctiption,
  Brand,
  Name,
  Rent,
  Period,
  Prince,
  Accessories,
  About,
  Footer,
  OfflineInfo
} from './styles';


interface Params {
  car: ModelCar; //CarDTO;
}

export function CarDetails(){
  const theme = useTheme();
  const route = useRoute();
  const { car } = route.params as Params;
  const navigation = useNavigation();

  const netInfo = useNetInfo();
  const [ carUpdated, setCarUpdated ] = useState<CarDTO>({} as CarDTO);

  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler( e => {
    scrollY.value = e.contentOffset.y;
  });

  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 220],
        [220, 70],
        Extrapolate.CLAMP
      ),
    }
  });

  const sliderCarStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [0, 150],
        [1, 0],
        Extrapolate.CLAMP
      )
    }
  })

  function handleScheduling() {
    navigation.navigate('Scheduling',{ car });
  }

  function handleHome() {
    navigation.goBack(); //Volta para tela anterios
  }

  useEffect(() => {
    async function fetchCarUpdeted() {
      const response = await api.get(`/cars/${car.id}`);
      setCarUpdated(response.data);
    }

    if(netInfo.isConnected === true) {
      fetchCarUpdeted();
    }

  },[netInfo.isConnected])

  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />

      <Animated.View
        style={
          [
            headerStyleAnimation,
            styles.header,
            {backgroundColor: theme.colors.backuground_secundary}
          ]
        }
      >
        <Header>
          <BackButton onPress={handleHome} />
        </Header>
        <Animated.View style={[sliderCarStyleAnimation ]}>
          <CarImage>
            <ImageSlider 
              imagesUrl={
                !!carUpdated.photos ?  carUpdated.photos :
                [{ id: car.thumbnail, photo: car.thumbnail }]
              }
            />
          </CarImage>
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: getStatusBarHeight() + 170,
          alignItems: 'center'
        }}
        showsVerticalScrollIndicator={ false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <Details>
          <Desctiption>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Desctiption>

          <Rent>
            <Period>{car.period}</Period>
            <Prince>R$ {netInfo.isConnected === true ? car.price : '...'}</Prince>
          </Rent>
        </Details>

        {
          carUpdated.accessories &&
            <Accessories>
              { carUpdated.accessories.map((accessory) => 
                  <Accessory 
                    key={accessory.type} 
                    name={accessory.name} 
                    icon={getAccessoryIcon(accessory.type)}
                  />
                )
              }
            </Accessories>
        }

        <About>
          {car.about}
        </About>
    
      </Animated.ScrollView>
      <Footer>
        <Button 
          title={"Escolher período do aluguel"}   
          color={theme.colors.main} 
          onPress={handleScheduling}
          enabled={netInfo.isConnected === true}
        />
        {
          netInfo.isConnected === false &&
          <OfflineInfo>
            Conecte-se a Internet para ver mais detalhes e agendar seu carro
          </OfflineInfo>
        }
      </Footer>
    </Container>
 );
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    overflow: 'hidden',
    zIndex: 1
  },
})